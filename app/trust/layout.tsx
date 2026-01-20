import type { Metadata } from "next";
import BackgroundFX from "@/components/ui/BackgroundFX";

export const metadata: Metadata = {
  title: "Trust Center",
  description: "FedRAMP 20x KSI-aligned Trust Center (demo)"
};

export default function TrustLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0b0e14] text-[#e6e8ee]">
      <BackgroundFX />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-start gap-6">
          <aside className="hidden w-64 shrink-0 md:block">
            <div className="sticky top-8 self-start">
              <div className="rounded-2xl border border-white/10 bg-[#0f1117] p-4">
                <div className="mb-4">
                  <div className="text-sm font-semibold tracking-wide text-white/90">Trust Center</div>
                  <div className="text-xs text-white/50">FedRAMP 20x KSI-aligned</div>
                </div>

                <div className="max-h-[55vh] overflow-auto pr-1">
                  <nav className="space-y-1 text-sm">
                    <a
                      href="/trust"
                      className="block rounded-xl px-3 py-2 text-white/80 hover:bg-white/5 hover:text-white"
                    >
                      Overview
                    </a>

                    <a
                      href="/trust/compliance"
                      className="block rounded-xl px-3 py-2 text-white/80 hover:bg-white/5 hover:text-white"
                    >
                      Compliance (KSIs)
                    </a>

                    <a
                      href="/trust/policies"
                      className="block rounded-xl px-3 py-2 text-white/80 hover:bg-white/5 hover:text-white"
                    >
                      Policies
                    </a>

                    <a
                      href="/trust/vulnerability-disclosure"
                      className="block rounded-xl px-3 py-2 text-white/80 hover:bg-white/5 hover:text-white"
                    >
                      Vulnerability Disclosure
                    </a>

                    <a
                      href="/console"
                      className="block rounded-xl px-3 py-2 text-white/80 hover:bg-white/5 hover:text-white"
                    >
                      Console (Demo)
                    </a>
                  </nav>
                </div>

                <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/60">
                  DEMO DATA
                </div>
              </div>
            </div>
          </aside>

          <main className="min-w-0 flex-1 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#0f1117] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold">Trust Center</div>
                  <div className="text-sm text-white/60">Security & compliance posture</div>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  Night mode · Neon
                </div>
              </div>
            </div>

            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
