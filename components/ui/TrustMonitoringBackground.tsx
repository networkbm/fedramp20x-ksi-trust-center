export default function TrustMonitoringBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(16,185,129,0.10),transparent_28%),radial-gradient(circle_at_84%_24%,rgba(148,163,184,0.08),transparent_25%),linear-gradient(180deg,rgba(9,9,11,0),#09090b_86%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,rgba(255,255,255,0.65)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="absolute bottom-[-120px] right-[-80px] h-80 w-80 rounded-full border border-slate-300/10 animate-monitor-orbit" />
      <div className="absolute bottom-[-70px] right-[-30px] h-56 w-56 rounded-full border border-emerald-400/10 animate-monitor-orbit-reverse" />
    </div>
  );
}
