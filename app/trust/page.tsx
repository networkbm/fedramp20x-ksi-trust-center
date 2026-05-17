import Link from "next/link";
import { AiIcon, ComplianceIcon, ConsoleIcon, PoliciesIcon, TrustCenterIcon, VulnerabilityIcon } from "@/components/ui/SectionIcons";
import { loadKsis } from "@/lib/data/loadKsis";
import { loadStatuses } from "@/lib/data/loadStatuses";
import { mergeKsiView } from "@/lib/data/mergeKsiView";
import { computeStatusCounts } from "@/lib/scoring/computeSummary";

function formatDate(value: unknown) {
  if (!value) return "Current snapshot";
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function TrustHome() {
  const [ksis, statuses] = await Promise.all([loadKsis(), loadStatuses()]);
  const view = mergeKsiView(ksis, statuses);
  const counts = computeStatusCounts(view.items);
  const passRate = counts.total > 0 ? Math.round((counts.PASS / counts.total) * 100) : 0;
  const lastUpdated = formatDate(view.meta.last_updated);
  const statusLabel = counts.FAIL > 0 ? "Degraded" : "Operational";
  const statusClasses =
    counts.FAIL > 0
      ? "border-amber-500/20 bg-amber-500/10 text-amber-400"
      : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";

  const metrics = [
    { label: "Pass Rate", value: `${passRate}%`, detail: `${counts.PASS} passing controls`, tone: "text-emerald-400" },
    { label: "KSI Coverage", value: counts.total, detail: "Mapped indicators", tone: "text-white" },
    { label: "Pending", value: counts.PENDING, detail: "Awaiting validation", tone: "text-amber-400" },
    { label: "Exceptions", value: counts.FAIL, detail: "Requires review", tone: counts.FAIL > 0 ? "text-rose-400" : "text-slate-300" }
  ];

  const cards = [
    {
      href: "/trust/compliance",
      title: "KSI Control Status",
      label: "FedRAMP 20x",
      body: "Browse control-by-control status, validation notes, and evidence mappings.",
      icon: ComplianceIcon,
      accent: "text-blue-400"
    },
    {
      href: "/trust/policies",
      title: "Policy Library",
      label: "Organization",
      body: "Review public compliance policies and gated documentation availability.",
      icon: PoliciesIcon,
      accent: "text-indigo-400"
    },
    {
      href: "/trust/vulnerability-disclosure",
      title: "Vulnerability Disclosure",
      label: "Security",
      body: "See disclosure expectations, reporting paths, and response handling.",
      icon: VulnerabilityIcon,
      accent: "text-rose-400"
    }
  ];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-xl border border-white/10 bg-[#121217] shadow-md">
        <div className={`h-1 w-full ${counts.FAIL > 0 ? "bg-amber-500" : "bg-emerald-500"} opacity-80`} />
        <div className="relative z-10 grid gap-6 p-6 lg:grid-cols-[1fr_360px] lg:p-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-blue-400">
              <TrustCenterIcon className="h-3.5 w-3.5" />
              Public Trust Center
            </div>
            <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Security, compliance, and authorization posture
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-400">
              Explore NBM&apos;s FedRAMP 20x KSI alignment, public policy set, validation status, and evidence pathways from
              one concise trust center.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/trust/compliance"
                className="inline-flex items-center gap-2 rounded-md border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-400 transition hover:bg-blue-500/20"
              >
                <ComplianceIcon />
                View KSIs
              </Link>
              <Link
                href="/console"
                className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <ConsoleIcon />
                Console
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#09090b] p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">Global Status</div>
                <div className="mt-1 text-xl font-bold tracking-tight text-white">{statusLabel}</div>
              </div>
              <div className={`rounded-md border px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider ${statusClasses}`}>
                Moderate
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-white/5 bg-white/[0.03] p-3">
                <div className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-600">Pass Rate</div>
                <div className="mt-1 font-mono text-2xl font-bold tabular-nums text-white">{passRate}%</div>
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.03] p-3">
                <div className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-600">Control Status</div>
                <div className="mt-1 flex items-baseline gap-1 font-mono text-2xl font-bold tabular-nums">
                  <span className="text-emerald-400">{counts.PASS}</span>
                  <span className="text-lg text-slate-600">/</span>
                  <span className="text-lg text-slate-400">{counts.total}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4 text-[10px]">
              <span className="font-mono uppercase tracking-wider text-slate-600">Last validated</span>
              <span className="font-mono text-slate-300">{lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-xl border border-white/10 bg-[#121217] p-5 shadow-sm transition hover:border-white/20">
            <div className="mb-1 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">{metric.label}</div>
            <div className={`mb-2 font-mono text-2xl font-bold tabular-nums tracking-tight ${metric.tone}`}>{metric.value}</div>
            <div className="text-[10px] leading-snug text-slate-500">{metric.detail}</div>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-white/10 bg-[#121217] shadow-md">
        <div className="border-b border-white/5 p-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white">Continuous Validation Pipeline</h2>
              <p className="mt-1 font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Automated testing against FedRAMP 20x KSI baselines
              </p>
            </div>
            <div className="rounded-md border border-white/5 bg-[#09090b] px-3 py-2 font-mono text-[10px] text-slate-400">
              Dataset updated <span className="text-slate-200">{lastUpdated}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-px bg-white/5 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.href} href={card.href} className="group bg-[#121217] p-5 transition hover:bg-white/[0.03]">
                <div className="mb-4 flex items-center justify-between">
                  <div className={`rounded-lg border border-white/5 bg-white/5 p-2 ${card.accent}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded border border-white/5 bg-white/5 px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider text-slate-500">
                    {card.label}
                  </span>
                </div>
                <div className="text-sm font-semibold text-white transition group-hover:text-blue-300">{card.title}</div>
                <p className="mt-2 text-xs leading-5 text-slate-500">{card.body}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-xl border border-white/10 bg-[#121217] p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <ComplianceIcon className="text-emerald-400" />
            Evidence Summary
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ["Source", "KSI JSON"],
              ["Evidence", "Mapped artifacts"],
              ["Status", "Live snapshot"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/5 bg-[#09090b] p-4">
                <div className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-600">{label}</div>
                <div className="mt-2 text-sm font-semibold text-slate-200">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#121217] p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <AiIcon className="text-blue-400" />
            Assisted Review
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-500">
            Use the console to ask control questions, compare KSI status, and generate lightweight compliance views from
            the loaded evidence model.
          </p>
          <Link
            href="/console"
            className="mt-5 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <ConsoleIcon />
            Open Console
          </Link>
        </div>
      </section>
    </div>
  );
}
