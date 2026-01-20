"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

type Point = {
  date: string;
  PASS: number;
  FAIL: number;
  PENDING: number;
};

export default function StatusTrend({ points }: { points: Point[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0f1117] p-5">
      <div>
        <div className="text-sm font-semibold">KSI Status Trend</div>
        <div className="mt-1 text-xs text-white/50">PASS / FAIL / PENDING over time</div>
      </div>

      <div className="mt-4 h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={points} margin={{ top: 10, right: 18, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: "rgba(230,232,238,0.55)", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.10)" }}
              minTickGap={18}
            />
            <YAxis
              tick={{ fill: "rgba(230,232,238,0.55)", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.10)" }}
              width={34}
              allowDecimals={false}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active) return null;
                const p = payload ?? [];
                const pass = Number(p.find((x: any) => x.dataKey === "PASS")?.value ?? 0);
                const fail = Number(p.find((x: any) => x.dataKey === "FAIL")?.value ?? 0);
                const pending = Number(p.find((x: any) => x.dataKey === "PENDING")?.value ?? 0);

                return (
                  <div className="rounded-xl border border-white/10 bg-[#0b0e14] px-3 py-2 text-xs text-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
                    <div className="font-semibold">{String(label)}</div>
                    <div className="mt-1 space-y-1 text-white/70">
                      <div>Passed: {pass}</div>
                      <div>Failed: {fail}</div>
                      <div>Pending: {pending}</div>
                    </div>
                  </div>
                );
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ color: "rgba(230,232,238,0.70)", fontSize: 12 }}
            />
            <Line
              type="monotone"
              dataKey="PASS"
              stroke="#34d399"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="FAIL"
              stroke="#fb7185"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="PENDING"
              stroke="#fbbf24"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
