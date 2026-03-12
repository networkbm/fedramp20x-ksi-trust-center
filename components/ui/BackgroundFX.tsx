"use client";

import { useState } from "react";
import DataWebFX from "@/components/ui/DataWebFX";

type ThemePreset = {
  id: string;
  label: string;
  base: string;
  drift: string;
  grid: string;
  pulse: string;
  topLine: string;
  scan: string;
  extra?: string;
  lineColor: string;
  nodeColor: string;
  webOpacityClass: string;
  density: number;
  maxLinkDist: number;
  velocity: number;
  lineAlpha: number;
  gridOpacity: number;
  gridSize: string;
  driftDuration: string;
  scanDuration: string;
  pulseDuration: string;
};

const presets: ThemePreset[] = [
  {
    id: "ice",
    label: "Ice Glass",
    base: "#060a12",
    drift:
      "radial-gradient(920px 560px at 14% 14%, rgba(125,211,252,0.16), transparent 60%), radial-gradient(980px 600px at 86% 8%, rgba(56,189,248,0.13), transparent 58%), radial-gradient(760px 420px at 50% 112%, rgba(15,23,42,0.58), transparent 66%)",
    grid:
      "linear-gradient(to right, rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.10) 1px, transparent 1px)",
    pulse: "radial-gradient(900px 500px at 50% -10%, rgba(125,211,252,0.13), transparent 64%)",
    topLine: "linear-gradient(to right, transparent, rgba(224,242,254,0.35), transparent)",
    scan:
      "linear-gradient(180deg, transparent 0%, rgba(125,211,252,0.06) 47%, rgba(125,211,252,0.12) 50%, rgba(125,211,252,0.06) 53%, transparent 100%)",
    lineColor: "rgba(186,230,253,0.11)",
    nodeColor: "rgba(186,230,253,0.18)",
    webOpacityClass: "opacity-[0.38]",
    density: 0.00007,
    maxLinkDist: 164,
    velocity: 0.24,
    lineAlpha: 0.11,
    gridOpacity: 0.09,
    gridSize: "76px 76px",
    driftDuration: "18s",
    scanDuration: "6.5s",
    pulseDuration: "4.2s"
  },
  {
    id: "neon",
    label: "Neon Core",
    base: "#080312",
    drift:
      "radial-gradient(920px 560px at 12% 14%, rgba(217,70,239,0.24), transparent 58%), radial-gradient(980px 620px at 86% 8%, rgba(34,211,238,0.22), transparent 56%), radial-gradient(760px 420px at 50% 112%, rgba(30,27,75,0.74), transparent 66%)",
    grid:
      "linear-gradient(45deg, rgba(217,70,239,0.16) 1px, transparent 1px), linear-gradient(-45deg, rgba(34,211,238,0.12) 1px, transparent 1px)",
    pulse: "radial-gradient(900px 520px at 50% -10%, rgba(196,181,253,0.24), transparent 64%)",
    topLine: "linear-gradient(to right, transparent, rgba(236,72,153,0.55), transparent)",
    scan:
      "linear-gradient(180deg, transparent 0%, rgba(217,70,239,0.10) 47%, rgba(34,211,238,0.18) 50%, rgba(217,70,239,0.10) 53%, transparent 100%)",
    extra:
      "conic-gradient(from 90deg at 50% 50%, rgba(236,72,153,0.08), rgba(34,211,238,0.10), rgba(168,85,247,0.08), rgba(236,72,153,0.08))",
    lineColor: "rgba(196,181,253,0.20)",
    nodeColor: "rgba(244,114,182,0.24)",
    webOpacityClass: "opacity-[0.58]",
    density: 0.0001,
    maxLinkDist: 196,
    velocity: 0.34,
    lineAlpha: 0.18,
    gridOpacity: 0.18,
    gridSize: "58px 58px",
    driftDuration: "12s",
    scanDuration: "3.2s",
    pulseDuration: "2.2s"
  },
  {
    id: "terminal",
    label: "Terminal",
    base: "#050806",
    drift:
      "radial-gradient(920px 560px at 14% 14%, rgba(34,197,94,0.16), transparent 60%), radial-gradient(980px 600px at 86% 8%, rgba(22,163,74,0.13), transparent 58%), radial-gradient(760px 420px at 50% 112%, rgba(6,20,11,0.64), transparent 66%)",
    grid:
      "linear-gradient(to right, rgba(74,222,128,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,197,94,0.10) 1px, transparent 1px)",
    pulse: "radial-gradient(900px 500px at 50% -10%, rgba(74,222,128,0.13), transparent 64%)",
    topLine: "linear-gradient(to right, transparent, rgba(187,247,208,0.35), transparent)",
    scan:
      "linear-gradient(180deg, transparent 0%, rgba(74,222,128,0.06) 47%, rgba(74,222,128,0.12) 50%, rgba(74,222,128,0.06) 53%, transparent 100%)",
    extra:
      "repeating-linear-gradient(180deg, rgba(74,222,128,0.04) 0px, rgba(74,222,128,0.04) 1px, transparent 1px, transparent 3px)",
    lineColor: "rgba(74,222,128,0.12)",
    nodeColor: "rgba(187,247,208,0.19)",
    webOpacityClass: "opacity-[0.45]",
    density: 0.00008,
    maxLinkDist: 158,
    velocity: 0.2,
    lineAlpha: 0.12,
    gridOpacity: 0.12,
    gridSize: "72px 72px",
    driftDuration: "20s",
    scanDuration: "5.5s",
    pulseDuration: "4.8s"
  },
  {
    id: "inferno",
    label: "Inferno Pulse",
    base: "#120603",
    drift:
      "radial-gradient(920px 560px at 14% 14%, rgba(251,113,133,0.24), transparent 58%), radial-gradient(980px 600px at 86% 8%, rgba(249,115,22,0.22), transparent 56%), radial-gradient(760px 420px at 50% 112%, rgba(69,10,10,0.72), transparent 66%)",
    grid:
      "linear-gradient(45deg, rgba(251,113,133,0.22) 1px, transparent 1px), linear-gradient(-45deg, rgba(251,146,60,0.18) 1px, transparent 1px)",
    pulse: "radial-gradient(900px 500px at 50% -10%, rgba(251,113,133,0.24), transparent 62%)",
    topLine: "linear-gradient(to right, transparent, rgba(254,205,211,0.55), transparent)",
    scan:
      "linear-gradient(180deg, transparent 0%, rgba(251,113,133,0.12) 46%, rgba(251,146,60,0.2) 50%, rgba(251,113,133,0.12) 54%, transparent 100%)",
    extra:
      "conic-gradient(from 140deg at 48% 46%, rgba(251,113,133,0.14), rgba(251,146,60,0.16), rgba(239,68,68,0.14), rgba(251,113,133,0.14))",
    lineColor: "rgba(254,205,211,0.22)",
    nodeColor: "rgba(253,186,116,0.24)",
    webOpacityClass: "opacity-[0.62]",
    density: 0.00011,
    maxLinkDist: 208,
    velocity: 0.36,
    lineAlpha: 0.2,
    gridOpacity: 0.22,
    gridSize: "54px 54px",
    driftDuration: "10.5s",
    scanDuration: "2.8s",
    pulseDuration: "2s"
  },
  {
    id: "void",
    label: "Void Mist",
    base: "#05060a",
    drift:
      "radial-gradient(900px 520px at 18% 16%, rgba(99,102,241,0.14), transparent 62%), radial-gradient(960px 560px at 84% 10%, rgba(59,130,246,0.10), transparent 58%), radial-gradient(720px 440px at 50% 108%, rgba(15,23,42,0.70), transparent 66%)",
    grid:
      "linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,116,139,0.06) 1px, transparent 1px)",
    pulse: "radial-gradient(900px 500px at 50% -10%, rgba(129,140,248,0.10), transparent 66%)",
    topLine: "linear-gradient(to right, transparent, rgba(191,219,254,0.25), transparent)",
    scan:
      "linear-gradient(180deg, transparent 0%, rgba(129,140,248,0.04) 47%, rgba(129,140,248,0.08) 50%, rgba(129,140,248,0.04) 53%, transparent 100%)",
    lineColor: "rgba(191,219,254,0.09)",
    nodeColor: "rgba(191,219,254,0.13)",
    webOpacityClass: "opacity-[0.26]",
    density: 0.000045,
    maxLinkDist: 140,
    velocity: 0.14,
    lineAlpha: 0.08,
    gridOpacity: 0.08,
    gridSize: "94px 94px",
    driftDuration: "28s",
    scanDuration: "10s",
    pulseDuration: "6s"
  }
];

export default function BackgroundFX() {
  const [themeId, setThemeId] = useState(() => {
    if (typeof window === "undefined") return "ice";
    const saved = window.localStorage.getItem("bg-theme");
    return saved && presets.some((preset) => preset.id === saved) ? saved : "ice";
  });
  const [open, setOpen] = useState(false);
  const theme = presets.find((preset) => preset.id === themeId) ?? presets[0];

  function updateTheme(id: string) {
    setThemeId(id);
    window.localStorage.setItem("bg-theme", id);
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0" style={{ background: theme.base }} />
        <DataWebFX
          lineColor={theme.lineColor}
          nodeColor={theme.nodeColor}
          opacityClass={theme.webOpacityClass}
          density={theme.density}
          maxLinkDist={theme.maxLinkDist}
          velocity={theme.velocity}
          lineAlpha={theme.lineAlpha}
        />
        <div
          className="absolute -inset-[12%] animate-cyber-drift"
          style={{ background: theme.drift, animationDuration: theme.driftDuration }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: theme.grid, opacity: theme.gridOpacity, backgroundSize: theme.gridSize }}
        />
        <div className="absolute inset-0 animate-hue-pulse" style={{ background: theme.pulse, animationDuration: theme.pulseDuration }} />
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: theme.topLine }} />
        <div className="absolute inset-0 animate-scan-sweep" style={{ background: theme.scan, animationDuration: theme.scanDuration }} />
        {theme.extra ? <div className="absolute inset-0" style={{ background: theme.extra, opacity: 0.22 }} /> : null}
      </div>

      <div className="pointer-events-none fixed right-3 top-2 z-40 w-[min(88vw,420px)] md:right-4 md:top-3">
        <div className="pointer-events-auto flex justify-end">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-full border border-white/25 bg-white/[0.08] px-3 py-1 text-[11px] text-white/90 shadow-[0_8px_28px_rgba(0,0,0,0.25)] backdrop-blur-md transition hover:bg-white/[0.14]"
          >
            Theme Options
          </button>
        </div>

        {open ? (
          <div className="pointer-events-auto mt-1 flex justify-end">
            <div className="no-scrollbar flex max-h-44 w-44 flex-col gap-1.5 overflow-y-auto overflow-x-hidden rounded-xl border border-white/15 bg-white/[0.08] p-2 backdrop-blur-md shadow-[0_12px_34px_rgba(0,0,0,0.3)]">
              {presets.map((preset) => {
                const active = preset.id === theme.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => updateTheme(preset.id)}
                    className={`w-full rounded-full border px-3 py-1 text-[11px] transition ${
                      active
                        ? "border-white/40 bg-white/[0.16] text-white"
                        : "border-white/15 bg-white/[0.03] text-white/70 hover:bg-white/[0.08]"
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
