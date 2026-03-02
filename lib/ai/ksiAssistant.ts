import { computeStatusCounts } from "@/lib/scoring/computeSummary";
import { KsiHistoryPoint } from "@/lib/data/loadHistory";
import { KsiViewItem } from "@/lib/data/mergeKsiView";
import { AiAssistantResponse, AiChart, AiMatchedKsi } from "@/types/ai";
import { ValidationRecord } from "@/types/validation";

type OllamaJson = {
  message?: {
    content?: string;
  };
};

type ParsedModelResponse = {
  answer?: string;
  focusKsiIds?: string[];
};

type EnrichedKsiItem = KsiViewItem & {
  validation?: ValidationRecord;
};

function normalizeValidationRecords(records: ValidationRecord[]) {
  const map = new Map<string, ValidationRecord>();
  for (const record of records) {
    if (!record?.ksi_id) continue;
    map.set(record.ksi_id.trim(), record);
  }
  return map;
}

function enrichItems(items: KsiViewItem[], validations: ValidationRecord[]): EnrichedKsiItem[] {
  const validationMap = normalizeValidationRecords(validations);
  return items.map((item) => ({
    ...item,
    validation: validationMap.get(item.id)
  }));
}

function wantsValidatedOnly(prompt: string) {
  const lower = prompt.toLowerCase();
  return /(validated|validation|assessor|assessed|3pao|attestation)/.test(lower);
}

function wantsUnvalidatedOnly(prompt: string) {
  const lower = prompt.toLowerCase();
  return /(not validated|unvalidated|without validation|missing validation)/.test(lower);
}

function tokenize(value: string) {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length >= 2);
}

function scoreKsiMatch(prompt: string, item: EnrichedKsiItem) {
  const promptTokens = new Set(tokenize(prompt));
  if (promptTokens.size === 0) return 0;

  const fields = [
    item.id,
    item.name,
    item.group ?? "",
    item.description,
    item.summary ?? "",
    item.validation?.assessor_name ?? "",
    item.validation?.three_pao ?? "",
    item.validation ? "validated assessor 3pao attestation" : "not validated"
  ]
    .join(" ")
    .toLowerCase();

  let score = 0;
  for (const token of promptTokens) {
    if (fields.includes(token)) score += 1;
  }

  if (wantsValidatedOnly(prompt) && item.validation) score += 5;
  if (wantsUnvalidatedOnly(prompt) && !item.validation) score += 5;

  return score;
}

export function findMatchedKsis(prompt: string, items: KsiViewItem[], validations: ValidationRecord[], limit = 6): AiMatchedKsi[] {
  const enriched = enrichItems(items, validations);
  const filteredPool = wantsValidatedOnly(prompt)
    ? enriched.filter((item) => item.validation)
    : wantsUnvalidatedOnly(prompt)
      ? enriched.filter((item) => !item.validation)
      : enriched;

  const ranked = filteredPool
    .map((item) => ({ item, score: scoreKsiMatch(prompt, item) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.item.id.localeCompare(b.item.id))
    .slice(0, limit)
    .map(({ item }) => ({
      id: item.id,
      name: item.name,
      status: item.status,
      summary: item.summary,
      validated: Boolean(item.validation),
      assessorName: item.validation?.assessor_name,
      threePao: item.validation?.three_pao
    }));

  if (ranked.length > 0) return ranked;

  return filteredPool.slice(0, Math.min(limit, filteredPool.length)).map((item) => ({
    id: item.id,
    name: item.name,
    status: item.status,
    summary: item.summary,
    validated: Boolean(item.validation),
    assessorName: item.validation?.assessor_name,
    threePao: item.validation?.three_pao
  }));
}

function buildGroupBreakdown(items: KsiViewItem[]) {
  const counts = new Map<string, number>();
  for (const item of items) {
    const key = item.group?.trim() || "Ungrouped";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 8)
    .map(([label, value]) => ({ label, total: value }));
}

export function buildChartFromPrompt(prompt: string, items: KsiViewItem[], history: KsiHistoryPoint[]): AiChart | null {
  const normalized = prompt.toLowerCase();
  const wantsChart = /(chart|graph|plot|visual|visualize|trend|breakdown|bar|line)/.test(normalized);
  if (!wantsChart) return null;

  if (/(trend|over time|history|timeline|over the last)/.test(normalized)) {
    return {
      type: "line",
      title: "KSI Status Trend",
      description: "Historical PASS, FAIL, and PENDING counts over time.",
      xKey: "label",
      data: history.map((point) => ({
        label: point.date,
        PASS: point.PASS,
        FAIL: point.FAIL,
        PENDING: point.PENDING
      })),
      series: [
        { key: "PASS", label: "Passed", color: "#34d399" },
        { key: "FAIL", label: "Failed", color: "#fb7185" },
        { key: "PENDING", label: "Pending", color: "#fbbf24" }
      ]
    };
  }

  if (/(group|domain|family|category)/.test(normalized)) {
    return {
      type: "bar",
      title: "KSIs by Group",
      description: "Top KSI groups based on the current dataset.",
      xKey: "label",
      data: buildGroupBreakdown(items),
      series: [{ key: "total", label: "KSIs", color: "#60a5fa" }]
    };
  }

  const counts = computeStatusCounts(items);
  return {
    type: "bar",
    title: "KSI Status Breakdown",
    description: "Current KSI counts by status.",
    xKey: "label",
    data: [
      { label: "Passed", total: counts.PASS },
      { label: "Failed", total: counts.FAIL },
      { label: "Pending", total: counts.PENDING }
    ],
    series: [{ key: "total", label: "KSIs", color: "#22d3ee" }]
  };
}

function buildFallbackAnswer(prompt: string, items: KsiViewItem[], validations: ValidationRecord[]) {
  const counts = computeStatusCounts(items);
  const lower = prompt.toLowerCase();
  const validatedItems = findMatchedKsis(prompt, items, validations, items.length).filter((item) => item.validated);

  if (/(how many|count|number of)/.test(lower) && /ksi/.test(lower)) {
    if (wantsValidatedOnly(lower)) {
      return `There ${validatedItems.length === 1 ? "is" : "are"} ${validatedItems.length} validated ${validatedItems.length === 1 ? "KSI" : "KSIs"} in the current browser session.`;
    }
    return `There are ${counts.total} KSIs in the current dataset: ${counts.PASS} passed, ${counts.FAIL} failed, and ${counts.PENDING} pending.`;
  }

  if (wantsValidatedOnly(lower)) {
    if (validatedItems.length === 0) {
      return "No KSIs in the current browser session have assessor validation records yet.";
    }

    if (validatedItems.length === 1) {
      const item = validatedItems[0];
      return `${item.id} is the only KSI currently validated by an assessor${item.assessorName ? ` (${item.assessorName})` : ""}.`;
    }

    return `${validatedItems.length} KSIs currently have assessor validation records in this browser session.`;
  }

  if (/fail|failed/.test(lower)) {
    return `There are ${counts.FAIL} failed KSIs in the current dataset.`;
  }

  if (/pass|passed/.test(lower)) {
    return `There are ${counts.PASS} passed KSIs in the current dataset.`;
  }

  if (/pending/.test(lower)) {
    return `There are ${counts.PENDING} pending KSIs in the current dataset.`;
  }

  return `The current dataset contains ${counts.total} KSIs. Ask for counts, matching KSIs, or a graph of status trends or group breakdowns.`;
}

function buildModelPrompt(prompt: string, items: KsiViewItem[], matched: AiMatchedKsi[], history: KsiHistoryPoint[], validations: ValidationRecord[]) {
  const counts = computeStatusCounts(items);
  const groupBreakdown = buildGroupBreakdown(items);

  return {
    system: [
      "You answer questions about a FedRAMP 20x KSI dataset.",
      "Use only the supplied dataset context.",
      "Do not invent KSI IDs, counts, or statuses.",
      "Validation records come from the browser session and matter for prompts about assessor validation.",
      "Respond as JSON with keys: answer (string), focusKsiIds (string[]).",
      "If the user asks for counts, use exact numbers from the context.",
      "If the user asks for matching KSIs, include the most relevant KSI IDs in focusKsiIds."
    ].join(" "),
    user: JSON.stringify({
      question: prompt,
      counts,
      matchedKsis: matched,
      validationCount: validations.length,
      groupBreakdown,
      recentHistory: history,
      totalKsis: items.length
    })
  };
}

export async function queryOllamaForKsis({
  prompt,
  items,
  history,
  validations
}: {
  prompt: string;
  items: KsiViewItem[];
  history: KsiHistoryPoint[];
  validations: ValidationRecord[];
}): Promise<AiAssistantResponse> {
  const matchedKsis = findMatchedKsis(prompt, items, validations);
  const chart = buildChartFromPrompt(prompt, items, history);
  const model = process.env.OLLAMA_MODEL || "llama3.1:8b";
  const baseUrl = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";
  const { system, user } = buildModelPrompt(prompt, items, matchedKsis, history, validations);

  try {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        stream: false,
        format: "json",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user }
        ]
      }),
      signal: AbortSignal.timeout(20_000)
    });

    if (!response.ok) {
      throw new Error(`Ollama request failed with status ${response.status}`);
    }

    const payload = (await response.json()) as OllamaJson;
    const rawContent = payload.message?.content?.trim() || "";
    const parsed = (rawContent ? JSON.parse(rawContent) : {}) as ParsedModelResponse;
    const focusIds = new Set(parsed.focusKsiIds ?? []);
    const selected = matchedKsis.filter((item) => focusIds.size === 0 || focusIds.has(item.id));

    return {
      answer: parsed.answer?.trim() || buildFallbackAnswer(prompt, items),
      prompt,
      matchedKsis: selected.length > 0 ? selected : matchedKsis,
      chart,
      source: "ollama",
      model
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Ollama error";
    return {
      answer: buildFallbackAnswer(prompt, items, validations),
      prompt,
      matchedKsis,
      chart,
      source: "fallback",
      model,
      error: message
    };
  }
}
