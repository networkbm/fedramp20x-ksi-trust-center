import type { CSSProperties } from "react";
import { ConsoleIcon, TrustCenterIcon } from "@/components/ui/SectionIcons";

type Stream = {
  text: string;
  delay: string;
  duration: string;
  offset: string;
};

type Source = {
  id: string;
  name: string;
  category: string;
  x: string;
  y: string;
  accent: string;
  accentSoft: string;
  path: string;
  reversePath: string;
  branch: string;
  branch2?: string;
  streams: Stream[];
};

const sources: Source[] = [
  {
    id: "aws",
    name: "AWS",
    category: "Cloud Runtime",
    x: "82%",
    y: "14%",
    accent: "#f59e0b",
    accentSoft: "rgba(245,158,11,0.24)",
    path: "M 24 50 C 38 28, 54 20, 68 18 S 84 16, 93 14",
    reversePath: "M 93 14 C 84 16, 80 16, 68 18 S 38 28, 24 50",
    branch: "M 58 22 C 66 10, 78 10, 86 12",
    branch2: "M 46 28 C 54 18, 60 16, 66 16",
    streams: [
      { text: "cloudtrail.events=14823", delay: "0s", duration: "8.8s", offset: "12%" },
      { text: "guardduty.findings=0", delay: "1.8s", duration: "9.4s", offset: "38%" }
    ]
  },
  {
    id: "datadog",
    name: "Datadog",
    category: "Observability",
    x: "86%",
    y: "31%",
    accent: "#8b5cf6",
    accentSoft: "rgba(139,92,246,0.24)",
    path: "M 24 50 C 40 46, 56 42, 72 36 S 86 32, 94 31",
    reversePath: "M 94 31 C 86 32, 82 33, 72 36 S 40 46, 24 50",
    branch: "M 60 40 C 68 30, 76 28, 84 28",
    branch2: "M 52 44 C 62 40, 68 38, 74 38",
    streams: [
      { text: "apm.latency_p95=142ms", delay: "0.9s", duration: "8.6s", offset: "20%" },
      { text: "error_budget=91%", delay: "3.1s", duration: "9.1s", offset: "54%" }
    ]
  },
  {
    id: "azure",
    name: "Azure",
    category: "Identity + Infra",
    x: "80%",
    y: "49%",
    accent: "#38bdf8",
    accentSoft: "rgba(56,189,248,0.22)",
    path: "M 24 50 C 40 50, 58 48, 74 48 S 86 49, 92 49",
    reversePath: "M 92 49 C 86 49, 82 48, 74 48 S 40 50, 24 50",
    branch: "M 56 48 C 64 42, 72 42, 82 44",
    branch2: "M 54 52 C 64 56, 72 55, 82 53",
    streams: [
      { text: "entra.signin_risk=low", delay: "1.2s", duration: "8.9s", offset: "14%" },
      { text: "policy.assignments=137", delay: "3.8s", duration: "9.2s", offset: "44%" }
    ]
  },
  {
    id: "trend",
    name: "Trend Micro",
    category: "Endpoint Defense",
    x: "84%",
    y: "66%",
    accent: "#f43f5e",
    accentSoft: "rgba(244,63,94,0.24)",
    path: "M 24 50 C 38 56, 56 62, 74 64 S 86 66, 93 66",
    reversePath: "M 93 66 C 86 66, 82 66, 74 64 S 38 56, 24 50",
    branch: "M 58 60 C 66 68, 74 70, 84 68",
    branch2: "M 52 58 C 60 64, 66 65, 72 65",
    streams: [
      { text: "workload.alerts=2", delay: "0.4s", duration: "8.4s", offset: "18%" },
      { text: "agent.coverage=99.2%", delay: "2.8s", duration: "9.5s", offset: "50%" }
    ]
  },
  {
    id: "github",
    name: "GitHub",
    category: "Supply Chain",
    x: "78%",
    y: "82%",
    accent: "#22c55e",
    accentSoft: "rgba(34,197,94,0.24)",
    path: "M 24 50 C 38 66, 52 76, 66 82 S 78 84, 88 82",
    reversePath: "M 88 82 C 78 84, 74 84, 66 82 S 38 66, 24 50",
    branch: "M 54 74 C 62 82, 70 86, 78 85",
    branch2: "M 46 68 C 54 76, 60 80, 66 82",
    streams: [
      { text: "secret_scans=0", delay: "1.1s", duration: "8.7s", offset: "22%" },
      { text: "dependency.alerts=1", delay: "4.1s", duration: "9.3s", offset: "56%" }
    ]
  }
];

function streamStyle(stream: Stream, source: Source): CSSProperties {
  return {
    top: source.y,
    left: stream.offset,
    animationDelay: stream.delay,
    animationDuration: stream.duration,
    ["--neuron-accent-soft" as string]: source.accentSoft
  };
}

export default function IngestionMap() {
  return (
    <section className="relative overflow-hidden rounded-[30px] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-6 shadow-[0_28px_100px_rgba(3,8,20,0.46)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_6%_48%,rgba(34,211,238,0.16),transparent_20%),radial-gradient(circle_at_62%_16%,rgba(168,85,247,0.14),transparent_22%),radial-gradient(circle_at_86%_76%,rgba(34,197,94,0.10),transparent_18%),linear-gradient(180deg,rgba(7,13,26,0.46),rgba(4,7,15,0.88))]" />
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "38px 38px" }} />

      <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-cyan-100/85">
            <ConsoleIcon className="h-3.5 w-3.5" />
            <span>Demo Injecting Overview</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-8 min-h-[760px] overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(4,9,18,0.98),rgba(6,8,18,0.94)_38%,rgba(4,7,15,0.98))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_50%,rgba(34,211,238,0.14),transparent_18%),radial-gradient(circle_at_72%_20%,rgba(168,85,247,0.12),transparent_16%),radial-gradient(circle_at_78%_80%,rgba(34,197,94,0.08),transparent_18%)]" />

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <filter id="neuronGlow">
              <feGaussianBlur stdDeviation="0.45" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {sources.map((source) => (
            <g key={source.id} filter="url(#neuronGlow)">
              <path id={`neuron-path-${source.id}`} d={source.path} fill="none" />
              <path id={`neuron-path-reverse-${source.id}`} d={source.reversePath} fill="none" />
              <path d={source.path} stroke="rgba(130,230,255,0.24)" strokeWidth="0.34" fill="none" />
              <path d={source.path} stroke={source.accent} strokeOpacity="0.68" strokeWidth="0.14" fill="none" />
              <path d={source.branch} stroke="rgba(255,255,255,0.12)" strokeWidth="0.12" fill="none" />
              {source.branch2 ? <path d={source.branch2} stroke="rgba(255,255,255,0.1)" strokeWidth="0.1" fill="none" /> : null}
              <circle cx="24" cy="50" r="0.72" fill="rgba(103,232,249,0.95)" />
              <circle cx={source.x.replace("%", "")} cy={source.y.replace("%", "")} r="0.72" fill={source.accent} />
              <circle r="0.62" fill="white" opacity="0.95">
                <animateMotion dur="5.4s" repeatCount="indefinite" begin="0s" rotate="auto">
                  <mpath href={`#neuron-path-reverse-${source.id}`} />
                </animateMotion>
              </circle>
              <circle r="0.42" fill={source.accent} opacity="0.95">
                <animateMotion dur="7.1s" repeatCount="indefinite" begin="1.2s" rotate="auto">
                  <mpath href={`#neuron-path-reverse-${source.id}`} />
                </animateMotion>
              </circle>
            </g>
          ))}
        </svg>

        <div className="absolute left-6 top-1/2 z-20 w-[min(28vw,280px)] -translate-y-1/2 md:left-8">
          <div className="absolute inset-[-18%] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.28),rgba(34,211,238,0.03)_58%,transparent_74%)] blur-3xl" />
          <div className="absolute inset-[-8%] rounded-full border border-cyan-300/14 animate-ingest-orbit" style={{ animationDuration: "24s" }} />
          <div className="absolute inset-[-16%] rounded-full border border-fuchsia-300/10 animate-ingest-orbit-reverse" style={{ animationDuration: "22s" }} />
          <div className="relative aspect-square rounded-full border border-cyan-300/26 bg-[radial-gradient(circle_at_34%_28%,rgba(103,232,249,0.3),rgba(7,13,24,0.96)_58%,rgba(3,6,14,1)_74%)] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_100px_rgba(2,8,18,0.72)]">
            <div className="absolute inset-[7%] rounded-full border border-white/10" />
            <div className="absolute inset-[15%] rounded-full border border-cyan-300/10" />
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,rgba(34,211,238,0.14),rgba(244,114,182,0.10),rgba(34,197,94,0.08),rgba(34,211,238,0.14))] opacity-90 animate-ingest-orbit" style={{ animationDuration: "14s" }} />
            <div className="absolute left-1/2 top-1/2 h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.24),transparent_66%)] blur-2xl" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/24 bg-cyan-300/10 text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.18)]">
                <TrustCenterIcon className="h-6 w-6" />
              </div>
              <div className="mt-4 text-[10px] uppercase tracking-[0.32em] text-cyan-100/72">Trust Center</div>
              <div className="mt-2 text-[clamp(1.1rem,1.8vw,1.45rem)] font-semibold leading-tight tracking-[-0.03em] text-white">
                Neural Intake Core
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0">
          {sources.map((source) => (
            <div key={source.id}>
              <div className="absolute z-10 w-[min(24vw,220px)] -translate-x-1/2 -translate-y-1/2" style={{ left: source.x, top: source.y }}>
                <div className="absolute inset-[-12%] rounded-[32px] blur-2xl" style={{ background: source.accentSoft }} />
                <div className="relative overflow-hidden rounded-[24px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-4 py-3 shadow-[0_16px_36px_rgba(0,0,0,0.28)] backdrop-blur-md">
                  <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${source.accent}, transparent)` }} />
                  <div className="text-[10px] uppercase tracking-[0.24em] text-white/44">{source.category}</div>
                  <div className="mt-1 text-base font-semibold text-white">{source.name}</div>
                </div>
              </div>

              {source.streams.map((stream) => (
                <div
                  key={`${source.id}-${stream.text}`}
                  className="absolute z-20 rounded-full border border-white/12 bg-[linear-gradient(180deg,rgba(9,14,24,0.92),rgba(4,7,14,0.88))] px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] text-white/80 shadow-[0_0_24px_var(--neuron-accent-soft)] animate-neuron-packet"
                  style={streamStyle(stream, source)}
                >
                  <span className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,var(--neuron-accent-soft),transparent_68%)] opacity-70" />
                  <span className="relative z-10">{stream.text}</span>
                </div>
              ))}

              <div className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.7)] animate-neuron-spark" style={{ left: source.x, top: source.y, animationDelay: "0.6s" }} />
            </div>
          ))}

          <div className="absolute left-[24%] top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,0.95),0_0_36px_rgba(34,211,238,0.4)] animate-neuron-spark" />
          <div className="absolute left-[41%] top-[31%] h-2.5 w-2.5 rounded-full bg-cyan-100/90 shadow-[0_0_14px_rgba(103,232,249,0.8)] animate-neuron-spark" />
          <div className="absolute left-[48%] top-[63%] h-2.5 w-2.5 rounded-full bg-fuchsia-100/90 shadow-[0_0_14px_rgba(217,70,239,0.8)] animate-neuron-spark" style={{ animationDelay: "1.8s" }} />
          <div className="absolute left-[58%] top-[46%] h-2 w-2 rounded-full bg-white/90 shadow-[0_0_14px_rgba(255,255,255,0.7)] animate-neuron-spark" style={{ animationDelay: "2.4s" }} />
        </div>
      </div>
    </section>
  );
}
