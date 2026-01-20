import fs from "node:fs/promises";
import path from "node:path";

type PolicyItem = {
  id: string;
  title: string;
  summary: string;
  status: "PUBLISHED" | "DRAFT";
  updated: string;
};

async function loadPolicies(file: string): Promise<PolicyItem[]> {
  const p = path.join(process.cwd(), "data", "policies", file);
  const raw = await fs.readFile(p, "utf-8");
  const parsed = JSON.parse(raw) as { items: PolicyItem[] };
  return parsed.items ?? [];
}

function badge(status: PolicyItem["status"]) {
  if (status === "PUBLISHED") return "text-emerald-300 border-emerald-400/20 bg-emerald-400/10";
  return "text-amber-300 border-amber-400/20 bg-amber-400/10";
}

export default async function PoliciesPage() {
  const publicPolicies = await loadPolicies("public-policies.json");
  const gatedPolicies = await loadPolicies("gated-policies.json");

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-white/10 bg-[#0f1117] p-6">
        <div className="text-sm text-white/60">Policies</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Security & Compliance Policies</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">
          This page lists example policy artifacts for a portfolio Trust Center. Some policies may be published publicly,
          while others are gated (available upon request).
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f1117]">
          <div className="border-b border-white/10 px-6 py-4">
            <div className="text-sm font-semibold">Public Policies</div>
            <div className="text-xs text-white/50">Available to all visitors</div>
          </div>

          <div className="divide-y divide-white/10">
            {publicPolicies.length > 0 ? (
              publicPolicies.map((p) => (
                <div key={p.id} className="px-6 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white/90">{p.title}</div>
                      <div className="mt-1 text-xs text-white/50">{p.id}</div>
                    </div>
                    <div className={`rounded-full border px-3 py-1 text-xs ${badge(p.status)}`}>{p.status}</div>
                  </div>
                  <div className="mt-2 text-sm text-white/70">{p.summary}</div>
                  <div className="mt-2 text-xs text-white/40">Updated: {p.updated}</div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-sm text-white/50">No items yet. Add policies in data/policies.</div>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f1117]">
          <div className="border-b border-white/10 px-6 py-4">
            <div className="text-sm font-semibold">Gated Policies</div>
            <div className="text-xs text-white/50">Available upon request / NDA</div>
          </div>

          <div className="divide-y divide-white/10">
            {gatedPolicies.length > 0 ? (
              gatedPolicies.map((p) => (
                <div key={p.id} className="px-6 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white/90">{p.title}</div>
                      <div className="mt-1 text-xs text-white/50">{p.id}</div>
                    </div>
                    <div className={`rounded-full border px-3 py-1 text-xs ${badge(p.status)}`}>{p.status}</div>
                  </div>
                  <div className="mt-2 text-sm text-white/70">{p.summary}</div>
                  <div className="mt-2 text-xs text-white/40">Updated: {p.updated}</div>
                  <div className="mt-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60">
                    Request access: demo@example.com
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-sm text-white/50">No items yet. Add policies in data/policies.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
