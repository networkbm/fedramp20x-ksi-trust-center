import StatusDonut from "@/components/charts/StatusDonut";
import StatusTrend from "@/components/charts/StatusTrend";
import { loadKsis } from "@/lib/data/loadKsis";
import { loadStatuses } from "@/lib/data/loadStatuses";
import { loadHistory } from "@/lib/data/loadHistory";
import { mergeKsiView } from "@/lib/data/mergeKsiView";
import { computeStatusCounts } from "@/lib/scoring/computeSummary";
import { ComplianceIcon, TrustCenterIcon } from "@/components/ui/SectionIcons";

export default async function ConsoleHome() {
  const ksis = await loadKsis();
  const statuses = await loadStatuses();
  const history = await loadHistory();
  const view = mergeKsiView(ksis, statuses);
  const counts = computeStatusCounts(view.items);

  const topRisk = view.items.filter((x) => x.status === "FAIL").slice(0, 5);
  const pending = view.items.filter((x) => x.status === "PENDING").slice(0, 5);
  const recent = view.items
    .filter((x) => x.last_verified)
    .sort((a, b) => String(b.last_verified).localeCompare(String(a.last_verified)))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-3">
        <StatusDonut counts={counts} />
        <div className="lg:col-span-2">
          <StatusTrend points={history.points} />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <a
          href="/trust/compliance"
          className="rounded-2xl border border-white/10 bg-[#0b1016]/78 p-5 transition hover:-translate-y-[1px] hover:bg-white/[0.04]"
        >
          <div className="text-xs text-white/60">Quick Action</div>
          <div className="mt-2 flex items-center gap-2 text-sm font-semibold">
            <ComplianceIcon />
            <span>Review KSIs</span>
          </div>
          <div className="mt-2 text-sm text-white/60">Open the KSI list with filters and search.</div>
        </a>

        <a
          href="/trust/compliance"
          className="rounded-2xl border border-white/10 bg-[#0b1016]/78 p-5 transition hover:-translate-y-[1px] hover:bg-white/[0.04]"
        >
          <div className="text-xs text-white/60">Quick Action</div>
          <div className="mt-2 text-sm font-semibold">Demo Data</div>
          <div className="mt-2 text-sm text-white/60">Placeholder for CSV/PDF export workflow.</div>
        </a>

        <a
          href="/trust"
          className="rounded-2xl border border-white/10 bg-[#0b1016]/78 p-5 transition hover:-translate-y-[1px] hover:bg-white/[0.04]"
        >
          <div className="text-xs text-white/60">Quick Action</div>
          <div className="mt-2 flex items-center gap-2 text-sm font-semibold">
            <TrustCenterIcon />
            <span>View Trust Center</span>
          </div>
          <div className="mt-2 text-sm text-white/60">See what a public user sees.</div>
        </a>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#0b1016]/78">
          <div className="border-b border-white/10 px-5 py-4">
            <div className="text-sm font-semibold">Failed KSIs</div>
            <div className="text-xs text-white/50">Prioritize remediation</div>
          </div>
          <div className="divide-y divide-white/10">
            {topRisk.length > 0 ? (
              topRisk.map((k) => (
                <a
                  key={k.id}
                  href={`/trust/ksis/${encodeURIComponent(k.id)}`}
                  className="block px-5 py-3 text-sm text-white/70 transition hover:bg-white/[0.04] hover:text-white"
                >
                  {k.id} — {k.name}
                </a>
              ))
            ) : (
              <div className="px-5 py-6 text-sm text-white/50">Demo Data</div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1016]/78">
          <div className="border-b border-white/10 px-5 py-4">
            <div className="text-sm font-semibold">Pending KSIs</div>
            <div className="text-xs text-white/50">Next up for evidence mapping</div>
          </div>
          <div className="divide-y divide-white/10">
            {pending.map((k) => (
              <a
                key={k.id}
                href={`/trust/ksis/${encodeURIComponent(k.id)}`}
                className="block px-5 py-3 text-sm text-white/70 transition hover:bg-white/[0.04] hover:text-white"
              >
                {k.id} — {k.name}
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1016]/78">
          <div className="border-b border-white/10 px-5 py-4">
            <div className="text-sm font-semibold">Recently Verified</div>
            <div className="text-xs text-white/50">Latest status updates</div>
          </div>
          <div className="divide-y divide-white/10">
            {recent.length > 0 ? (
              recent.map((k) => (
                <a
                  key={k.id}
                  href={`/trust/ksis/${encodeURIComponent(k.id)}`}
                  className="block px-5 py-3 text-sm text-white/70 transition hover:bg-white/[0.04] hover:text-white"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="min-w-0 truncate">
                      {k.id} — {k.name}
                    </span>
                    <span className="shrink-0 text-xs text-white/40">{String(k.last_verified)}</span>
                  </div>
                </a>
              ))
            ) : (
              <div className="px-5 py-6 text-sm text-white/50">No verified items found.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
