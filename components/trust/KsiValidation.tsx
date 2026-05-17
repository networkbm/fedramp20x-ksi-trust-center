"use client";

import { useEffect, useMemo, useState } from "react";
import { ValidationRecord } from "@/types/validation";

function keyFor(id: string) {
  return `ksi_validation:${id}`;
}

export default function KsiValidation({ ksiId }: { ksiId: string }) {
  const storageKey = useMemo(() => keyFor(ksiId), [ksiId]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [record, setRecord] = useState<ValidationRecord | null>(null);

  const [threePao, setThreePao] = useState("");
  const [assessorName, setAssessorName] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as ValidationRecord;
        setRecord(parsed);
      }
    } catch {
      setRecord(null);
    } finally {
      setLoaded(true);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!open) return;
    if (record) {
      setThreePao(record.three_pao);
      setAssessorName(record.assessor_name);
    } else {
      setThreePao("");
      setAssessorName("");
    }
  }, [open, record]);

  function save() {
    const tp = threePao.trim();
    const an = assessorName.trim();
    if (!tp || !an) return;

    const next: ValidationRecord = {
      ksi_id: ksiId,
      three_pao: tp,
      assessor_name: an,
      validated_at: new Date().toISOString()
    };

    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {}

    setRecord(next);
    setOpen(false);
  }

  function clear() {
    try {
      localStorage.removeItem(storageKey);
    } catch {}
    setRecord(null);
    setOpen(false);
  }

  const canSave = threePao.trim().length > 0 && assessorName.trim().length > 0;

  return (
    <div className="rounded-xl border border-white/10 bg-[#121217] p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-sm font-bold text-white">Validation</div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-slate-500">Assessor attestation for this KSI</div>
        </div>

        <div className="flex items-center gap-2">
          {loaded && record ? (
            <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              Validated
            </span>
          ) : (
            <span className="rounded-md border border-white/10 bg-[#09090b] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Not validated
            </span>
          )}

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-300 transition hover:bg-emerald-500/15"
          >
            {record ? "Edit" : "Validate KSI"}
          </button>
        </div>
      </div>

      {loaded && record ? (
        <div className="mt-4 rounded-xl border border-white/10 bg-[#09090b] p-4">
          <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Validated by</div>
          <div className="mt-1 text-sm font-semibold text-white">{record.three_pao}</div>
          <div className="mt-2 text-sm text-slate-400">
            {record.assessor_name}
            <span className="text-slate-600"> · </span>
            {new Date(record.validated_at).toLocaleString()}
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-white/10 bg-[#09090b] p-4 text-sm text-slate-400">
          No validation recorded yet. Click <span className="font-semibold text-slate-200">Validate KSI</span> to add it.
        </div>
      )}

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-[#121217] shadow-[0_20px_80px_rgba(0,0,0,0.72)]">
            <div className="border-b border-white/10 bg-[#09090b] px-5 py-4">
              <div className="text-sm font-bold text-white">Validate KSI</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-slate-500">{ksiId}</div>
            </div>

            <div className="space-y-4 px-5 py-5">
              <div className="space-y-2">
                <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">3PAO</div>
                <input
                  value={threePao}
                  onChange={(e) => setThreePao(e.target.value)}
                  placeholder="Insert here..."
                  className="w-full rounded-lg border border-white/10 bg-[#09090b] px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-emerald-500/35 focus:bg-[#0d1110]"
                />
              </div>

              <div className="space-y-2">
                <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">Assessor name</div>
                <input
                  value={assessorName}
                  onChange={(e) => setAssessorName(e.target.value)}
                  placeholder="Insert here..."
                  className="w-full rounded-lg border border-white/10 bg-[#09090b] px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-emerald-500/35 focus:bg-[#0d1110]"
                />
              </div>

              <div className="rounded-xl border border-amber-500/15 bg-amber-500/[0.06] p-4 text-xs leading-5 text-amber-100/70">
                This is a demo no real data.
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#09090b] px-5 py-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-white/10 bg-[#121217] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-300 transition hover:bg-white/[0.06]"
              >
                Cancel
              </button>

              <div className="flex items-center gap-2">
                {record ? (
                  <button
                    type="button"
                    onClick={clear}
                    className="rounded-md border border-rose-500/20 bg-rose-500/10 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-rose-300 transition hover:bg-rose-500/15"
                  >
                    Clear validation
                  </button>
                ) : null}

                <button
                  type="button"
                  disabled={!canSave}
                  onClick={save}
                  className={`rounded-md border px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider transition ${
                    canSave
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/15"
                      : "border-white/10 bg-[#121217] text-slate-600"
                  }`}
                >
                  Save validation
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
