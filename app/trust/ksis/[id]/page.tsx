import { loadKsis } from "@/lib/data/loadKsis";
import { loadStatuses } from "@/lib/data/loadStatuses";
import { mergeKsiView } from "@/lib/data/mergeKsiView";

function ballClass(status: "PASS" | "FAIL" | "PENDING") {
  if (status === "PASS") return "bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.45)]";
  if (status === "FAIL") return "bg-rose-500 shadow-[0_0_18px_rgba(244,63,94,0.45)]";
  return "bg-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.45)]";
}

export default async function KsiDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ksis = await loadKsis();
  const statuses = await loadStatuses();
  const view = mergeKsiView(ksis, statuses);

  const decodedId = decodeURIComponent(id).trim();

  const ksi =
    view.items.find((k) => k.id.trim() === decodedId) ??
    view.items.find((k) => k.id.trim().toLowerCase() === decodedId.toLowerCase());

  if (!ksi) {
    return (
      <div className="space-y-6">
        <section className="rounded-2xl border border-white/10 bg-[#0f1117] p-6">
          <div className="text-sm text-white/60">Not found</div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">KSI not found</h1>
          <div className="mt-3 text-sm text-white/70">
            Requested ID: <span className="font-semibold text-white/90">{decodedId}</span>
          </div>
          <div className="mt-4">
            <a
              href="/trust/compliance"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
            >
              Back to KSIs
            </a>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#0f1117] p-6">
          <div className="text-sm font-semibold">Debug (first 10 KSI IDs)</div>
          <div className="mt-3 grid gap-2 text-sm text-white/70">
            {view.items.slice(0, 10).map((k) => (
              <div key={k.id} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2">
                {k.id}
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-white/10 bg-[#0f1117] p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm text-white/60">Key Security Indicator</div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              {ksi.id} — {ksi.name}
            </h1>
            {ksi.group ? (
              <div className="mt-2 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                {ksi.group}
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-3">
            <div className={`h-4 w-4 rounded-full ${ballClass(ksi.status)}`} />
            <div className="text-sm font-semibold">{ksi.status}</div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#0f1117] p-6">
        <div className="text-sm font-semibold">Description</div>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">{ksi.description}</p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#0f1117] p-6">
          <div className="text-sm font-semibold">Status Summary</div>
          {ksi.summary ? (
            <p className="mt-3 text-sm leading-6 text-white/70">{ksi.summary}</p>
          ) : (
            <p className="mt-3 text-sm text-white/50">No status summary provided.</p>
          )}

          {ksi.last_verified ? (
            <div className="mt-4 text-xs text-white/50">Last verified: {ksi.last_verified}</div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0f1117] p-6">
          <div className="text-sm font-semibold">Evidence</div>

          {ksi.evidence && ksi.evidence.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm">
              {ksi.evidence.map((e) => (
                <li
                  key={e}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2"
                >
                  <span className="min-w-0 truncate text-white/70">{e}</span>
                  <a
                    href={`/evidence/demo/${encodeURIComponent(e)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 hover:bg-white/10"
                  >
                    View
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-3 text-sm text-white/50">No evidence artifacts attached.</div>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/50">
        This page presents demonstration-only status data and does not represent an official FedRAMP assessment or authorization.
      </section>
    </div>
  );
}
