"use client";

import { useEffect, useRef, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
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

type TooltipEntry = {
  dataKey?: string;
  value?: number | string;
};

export default function StatusTrend({ points }: { points: Point[] }) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    const updateWidth = () => {
      const next = Math.floor(el.getBoundingClientRect().width);
      if (next > 0) setChartWidth(next);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-w-0 rounded-2xl border border-white/15 bg-white/[0.03] p-5">
      <div>
        <div className="text-sm font-semibold">KSI Status Trend</div>
        <div className="mt-1 text-xs text-white/50">PASS / FAIL / PENDING over time</div>
      </div>

      <div ref={frameRef} className="mt-4 h-[260px] w-full min-w-0">
        {chartWidth > 0 ? (
          <LineChart width={chartWidth} height={260} data={points} margin={{ top: 10, right: 18, left: 0, bottom: 0 }}>
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
                const pass = Number((p.find((x) => (x as TooltipEntry).dataKey === "PASS") as TooltipEntry | undefined)?.value ?? 0);
                const fail = Number((p.find((x) => (x as TooltipEntry).dataKey === "FAIL") as TooltipEntry | undefined)?.value ?? 0);
                const pending = Number((p.find((x) => (x as TooltipEntry).dataKey === "PENDING") as TooltipEntry | undefined)?.value ?? 0);

                return (
                  <div className="rounded-xl border border-white/15 bg-white/[0.03] px-3 py-2 text-xs text-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
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
        ) : null}
      </div>
    </div>
  );
}
