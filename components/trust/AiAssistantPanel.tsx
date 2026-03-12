"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { AiAssistantResponse } from "@/types/ai";
import { ComplianceIcon } from "@/components/ui/SectionIcons";
import { ValidationRecord } from "@/types/validation";

type Props = {
  totalKsis: number;
};

const suggestions = [
  "How many KSIs are there?",
  "Show me the KSIs related to incident response.",
  "Create a graph of KSI status trends over time.",
  "Show a graph of KSIs by group."
];

function statusClass(status: "PASS" | "FAIL" | "PENDING") {
  if (status === "PASS") return "text-emerald-300 border-emerald-400/20 bg-emerald-400/10";
  if (status === "FAIL") return "text-rose-300 border-rose-400/20 bg-rose-400/10";
  return "text-amber-300 border-amber-400/20 bg-amber-400/10";
}

function ChartView({ result }: { result: AiAssistantResponse }) {
  const chart = result.chart;
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const element = frameRef.current;
    if (!element) return;

    const updateWidth = () => {
      const next = Math.max(Math.floor(element.getBoundingClientRect().width) - 24, 0);
      if (next > 0) setChartWidth(next);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  if (!chart) return null;

  return (
    <div className="mt-5 rounded-2xl border border-white/15 bg-white/[0.03] p-4">
      <div className="text-sm font-semibold text-white/90">{chart.title}</div>
      <div className="mt-1 text-xs text-white/50">{chart.description}</div>

      <div ref={frameRef} className="mt-4 h-[280px] w-full rounded-xl border border-white/15 bg-white/[0.03] p-3">
        {chartWidth > 0 && chart.type === "bar" ? (
          <BarChart width={chartWidth} height={240} data={chart.data} margin={{ top: 8, right: 12, left: 0, bottom: 16 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey={chart.xKey} tick={{ fill: "rgba(230,232,238,0.55)", fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: "rgba(230,232,238,0.55)", fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip />
            <Legend wrapperStyle={{ color: "rgba(230,232,238,0.70)", fontSize: 12 }} />
            {chart.series.map((series) => (
              <Bar key={series.key} dataKey={series.key} name={series.label} fill={series.color} radius={[8, 8, 0, 0]} />
            ))}
          </BarChart>
        ) : null}
        {chartWidth > 0 && chart.type === "line" ? (
          <LineChart width={chartWidth} height={240} data={chart.data} margin={{ top: 8, right: 12, left: 0, bottom: 16 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey={chart.xKey} tick={{ fill: "rgba(230,232,238,0.55)", fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: "rgba(230,232,238,0.55)", fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip />
            <Legend wrapperStyle={{ color: "rgba(230,232,238,0.70)", fontSize: 12 }} />
            {chart.series.map((series) => (
              <Line key={series.key} type="monotone" dataKey={series.key} name={series.label} stroke={series.color} strokeWidth={2} dot={false} />
            ))}
          </LineChart>
        ) : null}
      </div>
    </div>
  );
}

export default function AiAssistantPanel({ totalKsis }: Props) {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<AiAssistantResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validations, setValidations] = useState<ValidationRecord[]>([]);

  useEffect(() => {
    try {
      const records: ValidationRecord[] = [];
      for (let i = 0; i < localStorage.length; i += 1) {
        const key = localStorage.key(i);
        if (!key || !key.startsWith("ksi_validation:")) continue;
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        records.push(JSON.parse(raw) as ValidationRecord);
      }
      setValidations(records);
    } catch {
      setValidations([]);
    }
  }, []);

  const canSubmit = useMemo(() => prompt.trim().length > 0 && !loading, [prompt, loading]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/ksi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim(), validations })
      });

      const payload = (await response.json()) as AiAssistantResponse | { error?: string };
      if (!response.ok || !("answer" in payload)) {
        throw new Error((payload as { error?: string }).error || "AI request failed.");
      }

      setResult(payload);
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "AI request failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-white/15 bg-white/[0.03] p-4 md:p-5">
      <div className="flex items-center gap-2 text-sm text-white/60">
        <ComplianceIcon className="h-3.5 w-3.5" />
        <span>AI Assistant</span>
      </div>
      <h2 className="mt-1.5 text-lg font-semibold tracking-tight md:text-xl">Ask Ollama about KSIs</h2>
      <p className="mt-2 max-w-2xl text-xs leading-5 text-white/70 md:text-sm">
        Ask for counts, matching KSIs, or a graph. The assistant uses the current dataset of {totalKsis} KSIs.
      </p>

      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <label className="block">
          <span className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-white/40">Prompt</span>
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Example: Show me KSIs related to logging and create a graph of their status breakdown."
            className="min-h-[88px] w-full rounded-xl border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-white/85 outline-none placeholder:text-white/30 focus:border-white/20 focus:bg-white/[0.06]"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setPrompt(suggestion)}
              className="rounded-full border border-white/15 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/65 transition hover:bg-white/[0.05] hover:text-white"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/15 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Ask AI"}
          </button>
        </div>
      </form>

      {error ? (
        <div className="mt-4 rounded-xl border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-sm text-rose-200">{error}</div>
      ) : null}

      {result ? (
        <div className="mt-5 rounded-2xl border border-white/15 bg-white/[0.03] p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-white/90">AI Answer</div>
              <div className="mt-1 text-xs text-white/45">
                Source: {result.source} · Model: {result.model}
              </div>
            </div>
            {result.error ? (
              <div className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs text-amber-200">
                Ollama fallback used
              </div>
            ) : null}
          </div>

          <div className="mt-3 text-sm leading-6 text-white/80">{result.answer}</div>

          {result.matchedKsis.length > 0 ? (
            <div className="mt-4">
              <div className="text-sm font-semibold text-white/90">Relevant KSIs</div>
              <div className="mt-2.5 grid gap-2.5 md:grid-cols-2">
                {result.matchedKsis.map((ksi) => (
                  <a
                    key={ksi.id}
                    href={`/trust/ksis/${encodeURIComponent(ksi.id)}`}
                    className="rounded-xl border border-white/15 bg-white/[0.03] p-3 transition hover:bg-white/[0.06]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-white/90">{ksi.id}</div>
                        <div className="mt-1 text-sm text-white/70">{ksi.name}</div>
                      </div>
                      <div className={`rounded-full border px-2.5 py-1 text-[11px] ${statusClass(ksi.status)}`}>{ksi.status}</div>
                    </div>
                    {ksi.validated ? (
                      <div className="mt-2 text-[11px] text-cyan-200/85">
                        Validated{ksi.assessorName ? ` by ${ksi.assessorName}` : ""}{ksi.threePao ? ` · ${ksi.threePao}` : ""}
                      </div>
                    ) : null}
                    {ksi.summary ? <div className="mt-3 text-xs leading-5 text-white/55">{ksi.summary}</div> : null}
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          <ChartView result={result} />
        </div>
      ) : null}
    </section>
  );
}
