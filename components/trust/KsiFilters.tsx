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
    "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white";

  const pillActive =
    "border-white/20 bg-white/10 text-white shadow-[0_0_22px_rgba(99,102,241,0.15)]";

  const badgeBase =
    "rounded-full border border-white/10 bg-[#0b0e14] px-2 py-0.5 text-[11px] text-white/60";

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
