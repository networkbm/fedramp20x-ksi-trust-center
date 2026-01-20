"use client";

export default function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#070a12]" />

      <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_15%_15%,rgba(34,211,238,0.18),transparent_60%),radial-gradient(900px_700px_at_85%_25%,rgba(99,102,241,0.18),transparent_60%),radial-gradient(1000px_700px_at_55%_90%,rgba(59,130,246,0.12),transparent_60%)]" />

      <div className="absolute inset-0 opacity-[0.16] mix-blend-screen [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgba(34,211,238,0.35)_1px,transparent_1px)] [background-size:42px_42px] bg-[position:0_0] animate-bg-dots" />

      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-cyan-400/25 blur-3xl animate-blob-1" />
      <div className="absolute top-24 -right-48 h-[560px] w-[560px] rounded-full bg-indigo-500/20 blur-3xl animate-blob-2" />
      <div className="absolute -bottom-56 left-1/3 h-[620px] w-[620px] rounded-full bg-blue-500/18 blur-3xl animate-blob-3" />

      <div className="absolute inset-0 opacity-[0.10] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(34,211,238,0.30),rgba(99,102,241,0.20),rgba(59,130,246,0.10),rgba(34,211,238,0.30))] animate-sheen" />

      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_0%,rgba(255,255,255,0.06),transparent_65%)]" />
    </div>
  );
}
