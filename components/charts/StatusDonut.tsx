"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";

type StatusCounts = {
  PASS: number;
  FAIL: number;
  PENDING: number;
  total: number;
};

type DonutDatum = {
  name: "Passed" | "Failed" | "Pending";
  value: number;
  key: "PASS" | "FAIL" | "PENDING";
};

function clampPct(n: number) {
  if (!Number.isFinite(n)) return 0;
  if (n < 0) return 0;
  if (n > 100) return 100;
  return Math.round(n);
}

function pct(value: number, total: number) {
  if (!total) return 0;
  return clampPct((value / total) * 100);
}

export default function StatusDonut({ counts }: { counts: StatusCounts }) {
  const data: DonutDatum[] = [
    { name: "Passed", value: counts.PASS, key: "PASS" },
    { name: "Failed", value: counts.FAIL, key: "FAIL" },
    { name: "Pending", value: counts.PENDING, key: "PENDING" }
  ];

  const colors: Record<DonutDatum["key"], string> = {
    PASS: "#34d399",
    FAIL: "#fb7185",
    PENDING: "#fbbf24"
  };

  const glow: Record<DonutDatum["key"], string> = {
    PASS: "drop-shadow(0 0 14px rgba(52, 211, 153, 0.35))",
    FAIL: "drop-shadow(0 0 14px rgba(251, 113, 133, 0.35))",
    PENDING: "drop-shadow(0 0 14px rgba(251, 191, 36, 0.35))"
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0f1117] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold">KSI Status Breakdown</div>
          <div className="mt-1 text-xs text-white/50">
            Passed / Failed / Pending
          </div>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          Total: {counts.total}
        </div>
      </div>

      <div className="mt-4 h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const p = payload[0] as any;
                const name = String(p?.name ?? "");
                const value = Number(p?.value ?? 0);
                const percent = pct(value, counts.total);

                return (
                  <div className="rounded-xl border border-white/10 bg-[#0b0e14] px-3 py-2 text-xs text-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
                    <div className="font-semibold">{name}</div>
                    <div className="mt-1 text-white/70">
                      {value} ({percent}%)
                    </div>
                  </div>
                );
              }}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={72}
              outerRadius={92}
              paddingAngle={3}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={1}
              isAnimationActive={true}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.key}
                  fill={colors[entry.key]}
                  style={{ filter: glow[entry.key] }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.45)]" />
            <div className="text-xs text-white/60">Passed</div>
          </div>
          <div className="mt-2 text-lg font-semibold text-emerald-300">
            {counts.PASS}
            <span className="ml-2 text-xs font-medium text-white/40">
              {pct(counts.PASS, counts.total)}%
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500 shadow-[0_0_14px_rgba(251,113,133,0.45)]" />
            <div className="text-xs text-white/60">Failed</div>
          </div>
          <div className="mt-2 text-lg font-semibold text-rose-300">
            {counts.FAIL}
            <span className="ml-2 text-xs font-medium text-white/40">
              {pct(counts.FAIL, counts.total)}%
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.45)]" />
            <div className="text-xs text-white/60">Pending</div>
          </div>
          <div className="mt-2 text-lg font-semibold text-amber-300">
            {counts.PENDING}
            <span className="ml-2 text-xs font-medium text-white/40">
              {pct(counts.PENDING, counts.total)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
