"use client";

import { useMemo, useState } from "react";
import KsiFilters from "@/components/trust/KsiFilters";
import KsiSearch from "@/components/trust/KsiSearch";

type Status = "PASS" | "FAIL" | "PENDING";

type KsiRow = {
  id: string;
  name: string;
  description: string;
  group?: string;
  status: Status;
  summary?: string;
};

function ballClass(status: Status) {
  if (status === "PASS") return "bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.45)]";
  if (status === "FAIL") return "bg-rose-500 shadow-[0_0_18px_rgba(244,63,94,0.45)]";
  return "bg-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.45)]";
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
      x.description,
      x.summary ?? ""
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });
}, [items, filter, query]);


  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f1117]">
      <div className="border-b border-white/10 px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold">All KSIs</div>
            <div className="text-xs text-white/50">
              Loaded: {String(meta.ksi_source_count)} · Status mapped: {String(meta.status_source_count)}
            </div>
          </div>

          <KsiFilters value={filter} onChange={setFilter} counts={counts} />
        <div className="w-full">
          <KsiSearch value={query} onChange={setQuery} />
          </div>
        <div className="text-xs text-white/50">
            Showing {filtered.length} of {items.length}
        </div>

        </div>
      </div>

      <div className="divide-y divide-white/10">
        {filtered.map((k) => (
          <a
            key={k.id}
            href={`/trust/ksis/${encodeURIComponent(k.id)}`}
            className="group relative block px-6 py-4 transition will-change-transform hover:-translate-y-[1px] hover:bg-white/[0.04]"
          >
            <div className="flex items-start gap-4">
              <div className={`mt-1 h-3 w-3 shrink-0 rounded-full ${ballClass(k.status)}`} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <div className="text-sm font-semibold text-white/90">{k.id}</div>
                  <div className="text-sm text-white/70">{k.name}</div>
                  {k.group ? (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60">
                      {k.group}
                    </span>
                  ) : null}
                </div>
                <div className="mt-1 line-clamp-2 text-sm text-white/60">{k.description}</div>
                {k.summary ? (
                  <div className="mt-2 text-xs text-white/60">
                    <span className="text-white/40">Status note:</span> {k.summary}
                  </div>
                ) : null}
              </div>
              <div className="shrink-0 text-xs text-white/40 group-hover:text-white/60">View</div>
            </div>
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <div className="absolute inset-0 rounded-none shadow-[inset_0_0_0_1px_rgba(99,102,241,0.18)]" />
              <div className="absolute -inset-px blur-md shadow-[0_0_22px_rgba(34,211,238,0.12)]" />
            </div>
          </a>
        ))}

        {filtered.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-white/60">No KSIs match this filter.</div>
        ) : null}
      </div>
    </section>
  );
}
