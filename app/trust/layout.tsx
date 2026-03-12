import type { Metadata } from "next";
import {
  ComplianceIcon,
  ConsoleIcon,
  OverviewIcon,
  PoliciesIcon,
  TrustCenterIcon,
  VulnerabilityIcon
} from "@/components/ui/SectionIcons";

export const metadata: Metadata = {
  title: "Trust Center",
  description: "FedRAMP 20x KSI-aligned Trust Center"
};

export default function TrustLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-[#e6e8ee]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-start gap-6">
          <aside className="hidden w-64 shrink-0 md:block">
            <div className="sticky top-8 self-start">
              <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-4 backdrop-blur-[2px]">
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-white/90">
                    <TrustCenterIcon className="text-cyan-300" />
                    <span>Trust Center</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-white/50">
                    <ComplianceIcon className="h-3.5 w-3.5" />
                    <span>FedRAMP 20x KSI-aligned</span>
                  </div>
                </div>

                <div className="max-h-[55vh] overflow-auto pr-1">
                  <nav className="space-y-1 text-sm">
                    <a
                      href="/trust"
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-white/80 hover:bg-white/[0.05] hover:text-white"
                    >
                      <OverviewIcon />
                      <span>Overview</span>
                    </a>

                    <a
                      href="/trust/compliance"
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-white/80 hover:bg-white/[0.05] hover:text-white"
                    >
                      <ComplianceIcon />
                      <span>Compliance (KSIs)</span>
                    </a>

                    <a
                      href="/trust/policies"
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-white/80 hover:bg-white/[0.05] hover:text-white"
                    >
                      <PoliciesIcon />
                      <span>Policies</span>
                    </a>

                    <a
                      href="/trust/vulnerability-disclosure"
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-white/80 hover:bg-white/[0.05] hover:text-white"
                    >
                      <VulnerabilityIcon />
                      <span>Vulnerability Disclosure</span>
                    </a>

                    <a
                      href="/console"
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-white/80 hover:bg-white/[0.05] hover:text-white"
                    >
                      <ConsoleIcon />
                      <span>Console</span>
                    </a>
                  </nav>
                </div>

                <div className="mt-4 rounded-xl border border-white/15 bg-white/[0.03] p-3 text-xs text-white/60">Demo Data</div>
              </div>
            </div>
          </aside>

          <main className="min-w-0 flex-1 space-y-6">
            <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-4 backdrop-blur-[2px]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <TrustCenterIcon />
                    <span>Trust Center</span>
                  </div>
                  <div className="text-sm text-white/60">Security & compliance posture</div>
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
