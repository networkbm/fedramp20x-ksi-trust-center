import Link from "next/link";
import { AiIcon, ComplianceIcon, ConsoleIcon, TrustCenterIcon } from "@/components/ui/SectionIcons";
import LiveTelemetryCard from "@/components/trust/LiveTelemetryCard";
import { loadKsis } from "@/lib/data/loadKsis";
import { loadStatuses } from "@/lib/data/loadStatuses";
import { mergeKsiView } from "@/lib/data/mergeKsiView";
import { computeStatusCounts } from "@/lib/scoring/computeSummary";

export default async function TrustHome() {
  const [ksis, statuses] = await Promise.all([loadKsis(), loadStatuses()]);
  const view = mergeKsiView(ksis, statuses);
  const counts = computeStatusCounts(view.items);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-white/15 bg-white/[0.03] p-6">
        <div className="flex items-center gap-2 text-sm text-white/60">
          <TrustCenterIcon className="h-3.5 w-3.5" />
          <span>Trust Center</span>
        </div>
        <h1 className="mt-2 flex items-center gap-2 text-2xl font-semibold tracking-tight">
          <ComplianceIcon />
          <span>Security & Compliance</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
          Demo Data. Explore KSIs, review status trends, and use Ollama-powered AI to answer questions, find matching
          indicators, and generate graphs from natural-language prompts.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/trust/compliance"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/80 hover:bg-white/[0.05]"
          >
            <ComplianceIcon />
            View KSIs
          </Link>
          <Link
            href="/console"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/80 hover:bg-white/[0.05]"
          >
            <ConsoleIcon />
            Open Console
          </Link>
        </div>
      </section>

      <LiveTelemetryCard compact counts={counts} lastUpdated={String(view.meta.last_updated ?? "")} />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-5">
          <div className="text-xs text-white/60">Content</div>
          <div className="mt-2 text-sm text-white/80">FedRAMP 20x KSIs are loaded from source JSON and mapped to demo evidence.</div>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-5">
          <div className="text-xs text-white/60">Status</div>
          <div className="mt-2 text-sm text-white/80">Continuous snapshots simulate live validation ingest and status progression.</div>
        </div>
        <div className="rounded-2xl border border-cyan-400/15 bg-white/[0.03] p-5">
          <div className="flex items-center gap-2 text-xs text-cyan-200/80">
            <AiIcon className="h-3.5 w-3.5" />
            <span>AI</span>
          </div>
          <div className="mt-2 text-sm text-white/80">Ask Ollama for KSI answers, matches, and graphs.</div>
        </div>
      </section>
    </div>
  );
}
