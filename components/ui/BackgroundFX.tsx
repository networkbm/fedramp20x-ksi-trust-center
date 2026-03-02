"use client";

import DataWebFX from "@/components/ui/DataWebFX";

export default function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#05070b]" />
      <DataWebFX />
      <div className="absolute inset-0 bg-[radial-gradient(1100px_640px_at_12%_6%,rgba(125,211,252,0.10),transparent_58%),radial-gradient(900px_520px_at_85%_12%,rgba(96,165,250,0.08),transparent_54%),radial-gradient(700px_420px_at_50%_100%,rgba(30,41,59,0.22),transparent_65%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.14)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_0%,rgba(255,255,255,0.05),transparent_64%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent" />
    </div>
  );
}
