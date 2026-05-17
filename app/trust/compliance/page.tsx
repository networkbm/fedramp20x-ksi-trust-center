import { loadKsis } from "@/lib/data/loadKsis";
import { loadStatuses } from "@/lib/data/loadStatuses";
import { mergeKsiView } from "@/lib/data/mergeKsiView";
import { computeStatusCounts } from "@/lib/scoring/computeSummary";
import StatusDonut from "@/components/charts/StatusDonut";
import StatusTrend from "@/components/charts/StatusTrend";
import { loadHistory } from "@/lib/data/loadHistory";
import KsiListClient from "@/components/trust/KsiListClient";
import AiAssistantPanel from "@/components/trust/AiAssistantPanel";
import { ComplianceIcon, OverviewIcon } from "@/components/ui/SectionIcons";

export default async function TrustCompliancePage() {
  const ksis = await loadKsis();
  const statuses = await loadStatuses();
  const view = mergeKsiView(ksis, statuses);
  const counts = computeStatusCounts(view.items);
  const passRate = counts.total > 0 ? Math.round((counts.PASS / counts.total) * 100) : 0;
  const history = await loadHistory();
  const historyPoints =
    history.points.length > 0
      ? history.points.map((point, index) =>
          index === history.points.length - 1
            ? {
                ...point,
                PASS: counts.PASS,
                FAIL: counts.FAIL,
                PENDING: counts.PENDING
              }
            : point
        )
      : history.points;

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-xl border border-white/10 bg-[#121217] shadow-md">
        <div className="h-1 w-full bg-emerald-500/80" />
        <div className="grid gap-6 p-6 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-400">
              <ComplianceIcon className="h-3.5 w-3.5" />
              Compliance Status
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">FedRAMP 20x Key Security Indicators</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              KSI families are grouped by FedRAMP theme with current automated validation results and mapped evidence
              notes.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#09090b] p-5">
            <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">Validation Snapshot</div>
            <div className="mt-3 flex items-end justify-between gap-4">
              <div>
                <div className="font-mono text-4xl font-bold tabular-nums text-white">{passRate}%</div>
                <div className="mt-1 text-xs text-slate-500">Pass coverage</div>
              </div>
              <div className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                Mostly Passing
              </div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.04]">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-300 to-slate-200" style={{ width: `${passRate}%` }} />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.25fr]">
        <div>
          <StatusDonut counts={counts} />
        </div>

        <div>
          <div className="rounded-xl border border-white/10 bg-[#121217] p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <OverviewIcon className="h-4 w-4 text-emerald-400" />
              <span>Overview</span>
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-slate-500">Counts based on KSI status mapping</div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/5 bg-[#09090b] p-4">
                <div className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-600">Total</div>
                <div className="mt-1 font-mono text-xl font-bold text-white">{counts.total}</div>
              </div>
              <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.06] p-4">
                <div className="font-mono text-[9px] font-bold uppercase tracking-wider text-emerald-500/80">Passed</div>
                <div className="mt-1 font-mono text-xl font-bold text-emerald-300">{counts.PASS}</div>
              </div>
              <div className="rounded-xl border border-rose-500/15 bg-rose-500/[0.06] p-4">
                <div className="font-mono text-[9px] font-bold uppercase tracking-wider text-rose-500/80">Failed</div>
                <div className="mt-1 font-mono text-xl font-bold text-rose-300">{counts.FAIL}</div>
              </div>
              <div className="rounded-xl border border-amber-500/15 bg-amber-500/[0.06] p-4">
                <div className="font-mono text-[9px] font-bold uppercase tracking-wider text-amber-500/80">Pending</div>
                <div className="mt-1 font-mono text-xl font-bold text-amber-300">{counts.PENDING}</div>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-white/5 bg-[#09090b] p-4 text-xs leading-5 text-slate-500">
              Validation is intentionally displayed by family first, then by individual KSI, so reviewers can scan
              progress and exceptions without losing the FedRAMP source structure.
            </div>
          </div>
        </div>
      </section>
      <div className="grid gap-4 lg:grid-cols-1">
        <StatusTrend points={historyPoints} />
      </div>
      <AiAssistantPanel totalKsis={counts.total} />
      <section className="overflow-hidden rounded-xl border border-white/10 bg-[#121217] shadow-md">
        <div className="flex flex-col gap-5 border-b border-white/5 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">Continuous Monitoring</div>
            <div className="mt-2 flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                Pipeline Active
              </h2>
            </div>
          </div>

          <div className="grid gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:grid-cols-3">
            <span className="rounded-md border border-white/5 bg-[#09090b] px-3 py-2 text-emerald-400">{counts.PASS} Pass</span>
            <span className="rounded-md border border-white/5 bg-[#09090b] px-3 py-2 text-rose-400">{counts.FAIL} Fail</span>
            <span className="rounded-md border border-white/5 bg-[#09090b] px-3 py-2 text-slate-300">{passRate}% Coverage</span>
          </div>
        </div>

        <div className="p-5">
          <div className="relative h-2 overflow-hidden rounded-full bg-white/[0.04]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500/70 via-teal-300/65 to-slate-200/50"
              style={{ width: `${passRate}%` }}
            />
            <div className="absolute inset-y-[-6px] w-20 rounded-full bg-white/55 blur-md animate-monitor-scan" />
            <div className="absolute inset-0 opacity-70 [background-image:repeating-linear-gradient(90deg,transparent_0,transparent_16px,rgba(255,255,255,0.28)_17px,transparent_18px)]" />
          </div>
          <div className="mt-4 grid gap-3 text-xs text-slate-500 md:grid-cols-3">
            <div className="rounded-lg border border-white/5 bg-[#09090b] px-4 py-3">IAM, VDR, MAS, SCN, and CCM signals are feeding the validation model.</div>
            <div className="rounded-lg border border-white/5 bg-[#09090b] px-4 py-3">Evidence mappings are checked against the current KSI status snapshot.</div>
            <div className="rounded-lg border border-white/5 bg-[#09090b] px-4 py-3">Exceptions and pending items stay visible in the family-level review below.</div>
          </div>
        </div>
      </section>
      <KsiListClient items={view.items} meta={view.meta} />
    </div>
  );
}
