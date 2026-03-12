"use client";

import DataWebFX from "@/components/ui/DataWebFX";

export default function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#060a12]" />
      <DataWebFX />
      <div className="absolute -inset-[12%] animate-cyber-drift bg-[radial-gradient(920px_560px_at_14%_14%,rgba(125,211,252,0.16),transparent_60%),radial-gradient(980px_600px_at_86%_8%,rgba(56,189,248,0.13),transparent_58%),radial-gradient(760px_420px_at_50%_112%,rgba(15,23,42,0.58),transparent_66%)]" />
      <div className="absolute inset-0 opacity-[0.09] [background-image:linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.10)_1px,transparent_1px)] [background-size:76px_76px]" />
      <div className="absolute inset-0 animate-hue-pulse bg-[radial-gradient(900px_500px_at_50%_-10%,rgba(125,211,252,0.13),transparent_64%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-100/30 to-transparent" />
      <div className="absolute inset-0 animate-scan-sweep bg-[linear-gradient(180deg,transparent_0%,rgba(125,211,252,0.06)_47%,rgba(125,211,252,0.12)_50%,rgba(125,211,252,0.06)_53%,transparent_100%)]" />
    </div>
  );
}
