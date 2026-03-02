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
  const history = await loadHistory();


  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-white/10 bg-[#0b1016]/78 p-6">
        <div className="flex items-center gap-2 text-sm text-white/60">
          <ComplianceIcon className="h-3.5 w-3.5" />
          <span>Compliance</span>
        </div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">FedRAMP 20x Key Security Indicators</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">Demo Data</p>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
  <div className="lg:col-span-1">
    <StatusDonut counts={counts} />
  </div>

  <div className="lg:col-span-2">
    <div className="rounded-2xl border border-white/10 bg-[#0b1016]/78 p-5">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <OverviewIcon className="h-4 w-4" />
        <span>Overview</span>
      </div>
      <div className="mt-1 text-xs text-white/50">Counts based on KSI status mapping</div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs text-white/60">Total</div>
          <div className="mt-1 text-xl font-semibold">{counts.total}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs text-white/60">Passed</div>
          <div className="mt-1 text-xl font-semibold text-emerald-300">{counts.PASS}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs text-white/60">Failed</div>
          <div className="mt-1 text-xl font-semibold text-rose-300">{counts.FAIL}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs text-white/60">Pending</div>
          <div className="mt-1 text-xl font-semibold text-amber-300">{counts.PENDING}</div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/60">
        Hover the chart to see counts and percentages. Use the AI panel below to query KSIs in natural language and
        generate graphs from prompts.
      </div>
    </div>
  </div>
</div>
      </section>
      <div className="grid gap-4 lg:grid-cols-1">
  <StatusTrend points={history.points} />
</div>
      <AiAssistantPanel totalKsis={counts.total} />
      <KsiListClient items={view.items} meta={view.meta} />
    </div>
  );
}
