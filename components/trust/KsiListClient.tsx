"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import KsiFilters from "@/components/trust/KsiFilters";
import KsiSearch from "@/components/trust/KsiSearch";

type Status = "PASS" | "FAIL" | "PENDING";

type KsiRow = {
  id: string;
  name: string;
  description: string;
  group?: string;
  groupId?: string;
  groupName?: string;
  groupTheme?: string;
  status: Status;
  summary?: string;
};

function ballClass(status: Status) {
  if (status === "PASS") return "bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.45)]";
  if (status === "FAIL") return "bg-rose-500 shadow-[0_0_18px_rgba(244,63,94,0.45)]";
  return "bg-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.45)]";
}

function statusPillClass(status: Status) {
  if (status === "PASS") return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";
  if (status === "FAIL") return "border-rose-500/20 bg-rose-500/10 text-rose-400";
  return "border-amber-500/20 bg-amber-500/10 text-amber-400";
}

function groupKey(item: KsiRow) {
  return item.groupId ?? item.group ?? item.id.split("-").slice(0, 2).join("-");
}

export default function KsiListClient({
  items,
  meta
}: {
  items: KsiRow[];
  meta: { ksi_source_count: unknown; status_source_count: unknown };
}) {
  const [filter, setFilter] = useState<"ALL" | "PASS" | "FAIL" | "PENDING">("ALL");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    let pass = 0;
    let fail = 0;
    let pending = 0;
    for (const it of items) {
      if (it.status === "PASS") pass += 1;
      else if (it.status === "FAIL") fail += 1;
      else pending += 1;
    }
    return { PASS: pass, FAIL: fail, PENDING: pending, total: items.length };
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const statusFiltered = filter === "ALL" ? items : items.filter((x) => x.status === filter);

    if (!q) return statusFiltered;

    return statusFiltered.filter((x) => {
      const haystack = [
        x.id,
        x.name,
        x.group ?? "",
        x.groupName ?? "",
        x.groupTheme ?? "",
        x.description,
        x.summary ?? ""
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [items, filter, query]);

  const grouped = useMemo(() => {
    const map = new Map<
      string,
      {
        key: string;
        id: string;
        name: string;
        theme?: string;
        items: KsiRow[];
        counts: { PASS: number; FAIL: number; PENDING: number; total: number };
      }
    >();

    for (const item of filtered) {
      const key = groupKey(item);
      const existing =
        map.get(key) ??
        {
          key,
          id: item.groupId ?? key,
          name: item.groupName ?? item.group ?? key,
          theme: item.groupTheme,
          items: [],
          counts: { PASS: 0, FAIL: 0, PENDING: 0, total: 0 }
        };

      existing.items.push(item);
      existing.counts[item.status] += 1;
      existing.counts.total += 1;
      map.set(key, existing);
    }

    return Array.from(map.values()).sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: "base" }));
  }, [filtered]);

  return (
    <section className="overflow-hidden rounded-xl border border-white/10 bg-[#121217] shadow-md">
      <div className="border-b border-white/5 px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-white">Key Security Indicator Families</div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-slate-500">
              Loaded: {String(meta.ksi_source_count)} · Status mapped: {String(meta.status_source_count)}
            </div>
          </div>

          <KsiFilters value={filter} onChange={setFilter} counts={counts} />
          <div className="w-full">
            <KsiSearch value={query} onChange={setQuery} />
          </div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
            Showing {filtered.length} of {items.length} indicators across {grouped.length} families
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4">
        {grouped.map((group) => {
          const passRate = group.counts.total > 0 ? Math.round((group.counts.PASS / group.counts.total) * 100) : 0;

          return (
            <section key={group.key} className="overflow-hidden rounded-xl border border-white/10 bg-[#0f1014]">
              <div className="border-b border-white/5 bg-[#09090b] p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        {group.id}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-slate-600">
                        {group.items.length} indicators
                      </span>
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-white">{group.name}</h3>
                    {group.theme ? <p className="mt-2 max-w-5xl text-xs leading-5 text-slate-500">{group.theme}</p> : null}
                  </div>

                  <div className="grid min-w-[260px] grid-cols-4 gap-2">
                    {[
                      ["Pass", group.counts.PASS, "text-emerald-400"],
                      ["Fail", group.counts.FAIL, "text-rose-400"],
                      ["Pending", group.counts.PENDING, "text-amber-400"],
                      ["Rate", `${passRate}%`, "text-white"]
                    ].map(([label, value, tone]) => (
                      <div key={label} className="rounded-lg border border-white/5 bg-white/[0.03] p-2 text-center">
                        <div className="font-mono text-[8px] font-bold uppercase tracking-wider text-slate-600">{label}</div>
                        <div className={`mt-1 font-mono text-sm font-bold tabular-nums ${tone}`}>{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="divide-y divide-white/5">
                {group.items.map((k) => (
                  <Link
                    key={k.id}
                    href={`/trust/ksis/${encodeURIComponent(k.id)}`}
                    className="group relative block px-5 py-4 transition hover:bg-white/[0.03]"
                  >
                    <div className="grid gap-3 md:grid-cols-[140px_1fr_auto] md:items-start">
                      <div className="flex items-center gap-3">
                        <div className={`h-2.5 w-2.5 shrink-0 rounded-full ${ballClass(k.status)}`} />
                        <div className="font-mono text-xs font-bold text-slate-300">{k.id}</div>
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-white/90">{k.name}</div>
                        <div className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{k.description}</div>
                        {k.summary ? (
                          <div className="mt-2 text-[11px] leading-5 text-slate-500">
                            <span className="font-mono uppercase tracking-wider text-slate-600">Status note:</span> {k.summary}
                          </div>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-3 md:justify-end">
                        <span className={`rounded-md border px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider ${statusPillClass(k.status)}`}>
                          {k.status}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-600 transition group-hover:text-slate-300">
                          View
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-[#0f1014] px-6 py-10 text-center">
            <div className="text-sm font-semibold text-slate-300">No KSIs match this filter.</div>
            <div className="mt-1 text-xs text-slate-500">Adjust the search query or status filter.</div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
