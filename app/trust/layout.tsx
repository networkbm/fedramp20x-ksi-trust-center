import type { Metadata } from "next";
import Link from "next/link";
import {
  ComplianceIcon,
  ConsoleIcon,
  OverviewIcon,
  PoliciesIcon,
  TrustCenterIcon,
  VulnerabilityIcon
} from "@/components/ui/SectionIcons";
import TrustMonitoringBackground from "@/components/ui/TrustMonitoringBackground";

export const metadata: Metadata = {
  title: "Trust Center",
  description: "FedRAMP 20x KSI-aligned Trust Center"
};

export default function TrustLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { href: "/trust", label: "Overview", icon: OverviewIcon, section: "Platform" },
    { href: "/trust/compliance", label: "Trust Center", icon: ComplianceIcon, section: "Platform" },
    { href: "/trust/policies", label: "Policies", icon: PoliciesIcon, section: "Organization" },
    { href: "/trust/vulnerability-disclosure", label: "Vulnerability Disclosure", icon: VulnerabilityIcon, section: "Organization" },
    { href: "/console", label: "Console", icon: ConsoleIcon, section: "User" }
  ];
  const sections = ["Platform", "Organization", "User"];

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-300">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-white/5 bg-[#0c0c10] lg:flex lg:flex-col">
        <div className="flex h-16 items-center gap-3 border-b border-white/5 px-5">
          <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/5 text-blue-400">
            <TrustCenterIcon className="relative z-10 h-5 w-5" />
            <div className="absolute inset-0 bg-blue-500/10 blur-lg" />
          </div>
          <div>
            <div className="text-sm font-bold leading-none tracking-tight text-white">NBM</div>
            <div className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-slate-500">Trust Center</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6">
          {sections.map((section) => (
            <div key={section} className="mb-6">
              <div className="px-5 pb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-600">
                {section}
              </div>
              <div className="space-y-1">
                {navItems
                  .filter((item) => item.section === section)
                  .map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group mx-2 flex items-center rounded-md border border-transparent px-3 py-3 text-sm font-medium tracking-wide text-slate-400 transition hover:border-white/5 hover:bg-white/[0.03] hover:text-slate-200"
                      >
                        <Icon className="mr-3 h-4 w-4 text-slate-500 transition group-hover:text-slate-300" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/5 bg-[#09090b] p-4">
          <div className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-400">
            Public View
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/5 bg-[#0c0c10]/90 px-4 backdrop-blur-md lg:px-6">
          <div className="flex items-center gap-3">
            <Link href="/trust" className="flex items-center gap-3 lg:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-blue-400">
                <TrustCenterIcon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold leading-none text-white">NBM</div>
                <div className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-slate-500">Trust Center</div>
              </div>
            </Link>
            <div className="hidden items-center px-2 py-1 sm:flex">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Platform / Trust Center
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right md:block">
              <div className="text-xs font-bold text-white">Public User</div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-slate-500">Limited View</div>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-gradient-to-tr from-slate-800 to-slate-700 text-xs font-bold text-white shadow-inner ring-1 ring-white/5">
              P
            </div>
          </div>
        </header>

        <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#09090b]">
          <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full bg-blue-600/5 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-indigo-600/5 blur-[120px]" />
          <TrustMonitoringBackground />
          <div className="relative z-10 mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
