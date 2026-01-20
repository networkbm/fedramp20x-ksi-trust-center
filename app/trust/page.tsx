export default function TrustHome() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-white/10 bg-[#0f1117] p-6">
        <div className="text-sm text-white/60">Trust Center</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Security & Compliance</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
          This Trust Center is a portfolio demonstration of a FedRAMP 20x Key Security Indicator (KSI)-aligned
          security posture view. KSI definitions are sourced from FedRAMP documentation. PASS/FAIL/PENDING statuses
          are demonstration-only.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="/trust/compliance"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            View KSIs
          </a>
          <a
            href="/console"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            Open Console
          </a>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#0f1117] p-5">
          <div className="text-xs text-white/60">Design</div>
          <div className="mt-2 text-sm text-white/80">Modern night-mode UI with neon interaction states.</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0f1117] p-5">
          <div className="text-xs text-white/60">Content</div>
          <div className="mt-2 text-sm text-white/80">All KSIs loaded from the official FedRAMP JSON file.</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0f1117] p-5">
          <div className="text-xs text-white/60">Status</div>
          <div className="mt-2 text-sm text-white/80">PASS/FAIL/PENDING statuses driven by repo JSON.</div>
        </div>
      </section>
    </div>
  );
}
