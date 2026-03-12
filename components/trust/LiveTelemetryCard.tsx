"use client";

import { startTransition, useEffect, useState } from "react";

type TelemetryCounts = {
  PASS: number;
  FAIL: number;
  PENDING: number;
  total: number;
};

type FeedEvent = {
  id: number;
  title: string;
  detail: string;
  createdAt: number;
};

type Props = {
  counts: TelemetryCounts;
  lastUpdated?: string;
  compact?: boolean;
};

function formatAgo(timestamp: number, now: number) {
  const diffSeconds = Math.max(1, Math.floor((now - timestamp) / 1000));
  if (diffSeconds < 60) return `${diffSeconds}s ago`;
  const diffMinutes = Math.floor(diffSeconds / 60);
  return `${diffMinutes}m ago`;
}

export default function LiveTelemetryCard({ counts, lastUpdated, compact = false }: Props) {
  const [now, setNow] = useState(() => Date.now());
  const [cursor, setCursor] = useState(0);
  const [latestEvent, setLatestEvent] = useState<FeedEvent>(() => {
    const current = Date.now();
    return {
      id: current,
      title: "KSI ingest cycle started",
      detail: "Validation batches are flowing through the telemetry pipeline.",
      createdAt: current
    };
  });
  const segmentCount = compact ? 24 : 42;
  const trailSize = compact ? 4 : 6;

  useEffect(() => {
    const clock = window.setInterval(() => {
      startTransition(() => setNow(Date.now()));
    }, 1000);

    const stream = window.setInterval(() => {
      const eventTime = Date.now();
      startTransition(() => {
        setCursor((value) => (value + 1) % segmentCount);
        setLatestEvent({
          id: eventTime,
          title: "KSI ingest cycle advanced",
          detail: `Pipeline heartbeat confirmed. PASS ${counts.PASS} of ${counts.total} controls in the latest snapshot.`,
          createdAt: eventTime
        });
        setNow(eventTime);
      });
    }, compact ? 180 : 120);

    return () => {
      window.clearInterval(clock);
      window.clearInterval(stream);
    };
  }, [compact, counts.PASS, counts.total, segmentCount]);

  const batches = 128 + cursor * 3;
  const lastSync = formatAgo(latestEvent.createdAt, now);
  const coverage = counts.total > 0 ? Math.round((counts.PASS / counts.total) * 100) : 0;

  return (
    <section className="rounded-2xl border border-white/18 bg-white/[0.03] p-4 md:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
            <span className="relative inline-flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300/45" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300" />
            </span>
            <span>{compact ? "Live Stream" : "Live Telemetry"}</span>
          </div>
          <div className="mt-1 text-xs text-white/50">
            {compact ? "Continuous status activity" : "Simulated near-real-time compliance ingest"}
          </div>
        </div>

        <div className="rounded-full border border-white/20 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-cyan-100/80">
          Stream active
        </div>
      </div>

      <div className={`mt-4 grid gap-3 ${compact ? "grid-cols-3" : "sm:grid-cols-3"}`}>
        <div className="rounded-xl border border-white/15 bg-white/[0.03] p-3">
          <div className="text-[11px] uppercase tracking-[0.14em] text-white/35">Last Sync</div>
          <div className="mt-1 text-sm font-medium text-white/88">{lastSync}</div>
        </div>
        <div className="rounded-xl border border-white/15 bg-white/[0.03] p-3">
          <div className="text-[11px] uppercase tracking-[0.14em] text-white/35">Pass Coverage</div>
          <div className="mt-1 text-sm font-medium text-white/88">{coverage}%</div>
        </div>
        <div className="rounded-xl border border-white/15 bg-white/[0.03] p-3">
          <div className="text-[11px] uppercase tracking-[0.14em] text-white/35">Batches</div>
          <div className="mt-1 text-sm font-medium text-white/88">{batches}</div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-white/15 bg-white/[0.03] p-3">
        <div className="mb-2.5">
          <div className="text-xs uppercase tracking-[0.14em] text-white/40">Near Real Time</div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="grid flex-1 gap-1.5 sm:gap-2"
            style={{ gridTemplateColumns: `repeat(${segmentCount}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: segmentCount }).map((_, index) => {
              const distance = (index - cursor + segmentCount) % segmentCount;
              const isTrail = distance <= trailSize;
              const opacity = isTrail ? 0.95 - distance * 0.16 : 0.18;
              return (
                <span
                  key={index}
                  className="h-1.5 rounded-full bg-cyan-300 transition-all duration-75"
                  style={{
                    opacity,
                    transform: isTrail ? "scaleY(1.15)" : "scaleY(1)",
                    boxShadow: isTrail ? "0 0 16px rgba(125,211,252,0.45)" : "none"
                  }}
                />
              );
            })}
          </div>
          <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2 py-0.5 text-[10px] font-semibold tracking-[0.08em] text-cyan-100">
            100%
          </div>
        </div>
        {!compact ? (
          <div className="mt-3 text-xs leading-5 text-white/55">
            {latestEvent.title}. {latestEvent.detail}
          </div>
        ) : null}
      </div>

      {lastUpdated ? (
        <div className="mt-4 text-[11px] text-white/38">Dataset last updated: {lastUpdated}</div>
      ) : null}
    </section>
  );
}
