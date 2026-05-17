import fs from "node:fs/promises";
import path from "node:path";
import { KsiCatalog, KsiItem } from "@/types/ksi";

type AnyObj = Record<string, unknown>;

function isObj(v: unknown): v is AnyObj {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function pickString(obj: AnyObj, keys: string[]): string | undefined {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.trim().length > 0) return v.trim();
  }
  return undefined;
}

function pickIndicatorDescription(obj: AnyObj): string | undefined {
  const direct = pickString(obj, ["statement", "description", "text", "summary"]);
  if (direct) return direct;

  const variesByLevel = obj.varies_by_level;
  if (!isObj(variesByLevel)) return undefined;

  for (const level of ["moderate", "low", "high"]) {
    const levelDetails = variesByLevel[level];
    if (isObj(levelDetails)) {
      const statement = pickString(levelDetails, ["statement", "description", "text", "summary"]);
      if (statement) return statement.replace(/^\*\*Optional:\*\*\s*/, "Optional: ");
    }
  }

  return undefined;
}

function walkCollect(root: unknown): KsiItem[] {
  const out: KsiItem[] = [];
  const seen = new Set<string>();

  const stack: unknown[] = [root];

  while (stack.length) {
    const cur = stack.pop();

    if (Array.isArray(cur)) {
      for (const it of cur) stack.push(it);
      continue;
    }

    if (!isObj(cur)) continue;

    for (const v of Object.values(cur)) stack.push(v);

    const id = pickString(cur, ["id", "ksi_id", "ksiId", "identifier", "key"]);
    const name = pickString(cur, ["name", "title"]);
    const description = pickString(cur, ["description", "statement", "text", "summary"]);
    const group = pickString(cur, ["group", "category", "domain", "family"]);

    if (!id || !name || !description) continue;

    if (seen.has(id)) continue;
    seen.add(id);

    out.push({
      id,
      name,
      description,
      group
    });
  }

  return out;
}

function collectFedrampKsis(root: unknown): KsiItem[] {
  if (!isObj(root) || !isObj(root.KSI)) return [];

  const out: KsiItem[] = [];
  const ksiFamilies = Object.entries(root.KSI);

  for (const [key, value] of ksiFamilies) {
    if (!isObj(value)) continue;

    const rawIndicators = value.indicators;
    const indicators = Array.isArray(rawIndicators)
      ? rawIndicators
      : isObj(rawIndicators)
        ? Object.entries(rawIndicators).map(([id, indicator]) => (isObj(indicator) ? { id, ...indicator } : indicator))
        : [];

    if (indicators.length === 0) continue;

    const groupId = pickString(value, ["id"]) ?? `KSI-${key}`;
    const groupName = pickString(value, ["name"]) ?? key;
    const groupTheme = pickString(value, ["theme"]);
    const group = `${groupId} — ${groupName}`;

    for (const indicator of indicators) {
      if (!isObj(indicator)) continue;

      const id = pickString(indicator, ["id", "ksi_id", "ksiId", "identifier", "key"]);
      const name = pickString(indicator, ["name", "title"]);
      const description = pickIndicatorDescription(indicator);

      if (!id || !name || !description) continue;

      out.push({
        id,
        name,
        description,
        group,
        groupId,
        groupName,
        groupTheme
      });
    }
  }

  return out;
}

function normalize(items: KsiItem[]): KsiItem[] {
  const cleaned = items
    .map((k) => ({
      ...k,
      id: k.id.trim(),
      name: k.name.trim(),
      description: k.description.trim(),
      group: k.group?.trim(),
      groupId: k.groupId?.trim(),
      groupName: k.groupName?.trim(),
      groupTheme: k.groupTheme?.trim()
    }))
    .filter((k) => k.id.length > 0 && k.name.length > 0 && k.description.length > 0);

  cleaned.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: "base" }));

  return cleaned;
}

export async function loadKsis(): Promise<KsiCatalog> {
  const filePath = path.join(process.cwd(), "data", "fedramp", "ksis.json");
  const raw = await fs.readFile(filePath, "utf-8");
  const parsed: unknown = JSON.parse(raw);

  const fedrampItems = collectFedrampKsis(parsed);
  const items = normalize(fedrampItems.length > 0 ? fedrampItems : walkCollect(parsed));

  return {
    meta: {
      source: "data/fedramp/ksis.json",
      count: items.length
    },
    items
  };
}
