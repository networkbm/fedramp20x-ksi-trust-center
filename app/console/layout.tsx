import type { Metadata } from "next";
import BackgroundFX from "@/components/ui/BackgroundFX";
import { ConsoleIcon, OverviewIcon, TrustCenterIcon } from "@/components/ui/SectionIcons";

export const metadata: Metadata = {
  title: "Console",
  description: "Internal console for KSI tracking"
};

export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-[#e6e8ee]">
      <BackgroundFX />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-start gap-6">
          <aside className="hidden w-64 shrink-0 md:block">
            <div className="sticky top-8 self-start">
              <div className="rounded-2xl border border-white/10 bg-[#0b1016]/78 p-4">
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-white/90">
                    <ConsoleIcon className="text-cyan-300" />
                    <span>Console</span>
                  </div>
                  <div className="text-xs text-white/50">Demo Data</div>
                </div>

                <div className="max-h-[55vh] overflow-auto pr-1">
                  <nav className="space-y-1 text-sm">
                    <a
                      href="/console"
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-white/80 hover:bg-white/5 hover:text-white"
                    >
                      <OverviewIcon />
                      <span>Dashboard</span>
                    </a>

                    <a
                      href="/trust"
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-white/80 hover:bg-white/5 hover:text-white"
                    >
                      <TrustCenterIcon />
                      <span>Trust (Public)</span>
                    </a>
                  </nav>
                </div>

                <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/60">Demo Data</div>
              </div>
            </div>
          </aside>

          <main className="min-w-0 flex-1 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#0b1016]/78 px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <ConsoleIcon />
                    <span>Console</span>
                  </div>
                  <div className="text-sm text-white/60">Operational view of KSI status</div>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">Demo Data</div>
              </div>
            </div>

            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
