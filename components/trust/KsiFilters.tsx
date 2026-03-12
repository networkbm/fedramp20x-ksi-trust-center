"use client";

type Status = "ALL" | "PASS" | "FAIL" | "PENDING";

export default function KsiFilters({
  value,
  onChange,
  counts
}: {
  value: Status;
  onChange: (v: Status) => void;
  counts: { PASS: number; FAIL: number; PENDING: number; total: number };
}) {
  const items: Array<{ key: Status; label: string; count: number }> = [
    { key: "ALL", label: "All", count: counts.total },
    { key: "PASS", label: "Passed", count: counts.PASS },
    { key: "FAIL", label: "Failed", count: counts.FAIL },
    { key: "PENDING", label: "Pending", count: counts.PENDING }
  ];

  const pillBase =
    "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition";

  const pillInactive =
    "border-white/15 bg-white/[0.03] text-white/70 hover:bg-white/[0.05] hover:text-white";

  const pillActive =
    "border-slate-300/20 bg-slate-200/[0.08] text-white shadow-[0_0_22px_rgba(125,211,252,0.08)]";

  const badgeBase =
    "rounded-full border border-white/15 bg-white/[0.03] px-2 py-0.5 text-[11px] text-white/60";

  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((it) => (
        <button
          key={it.key}
          type="button"
          onClick={() => onChange(it.key)}
          className={`${pillBase} ${value === it.key ? pillActive : pillInactive}`}
        >
          <span>{it.label}</span>
          <span className={badgeBase}>{it.count}</span>
        </button>
      ))}
    </div>
  );
}
