"use client";

import { useEffect, useMemo, useState } from "react";

type ValidationRecord = {
  ksi_id: string;
  three_pao: string;
  assessor_name: string;
  validated_at: string;
};

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
    <div className="rounded-2xl border border-white/10 bg-[#0f1117] p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Validation</div>
          <div className="mt-1 text-xs text-white/50">Assessor attestation for this KSI</div>
        </div>

        <div className="flex items-center gap-2">
          {loaded && record ? (
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
              Validated
            </span>
          ) : (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
              Not validated
            </span>
          )}

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 hover:bg-white/10"
          >
            {record ? "Edit" : "Validate KSI"}
          </button>
        </div>
      </div>

      {loaded && record ? (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs text-white/50">Validated by</div>
          <div className="mt-1 text-sm font-semibold text-white/90">{record.three_pao}</div>
          <div className="mt-2 text-sm text-white/70">
            {record.assessor_name}
            <span className="text-white/40"> · </span>
            {new Date(record.validated_at).toLocaleString()}
          </div>
        </div>
      ) : (
        <div className="mt-4 text-sm text-white/60">
          No validation recorded yet. Click <span className="font-semibold text-white/80">Validate KSI</span> to add it.
        </div>
      )}

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0b0e14] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
            <div className="border-b border-white/10 px-5 py-4">
              <div className="text-sm font-semibold">Validate KSI</div>
              <div className="mt-1 text-xs text-white/50">{ksiId}</div>
            </div>

            <div className="space-y-4 px-5 py-5">
              <div className="space-y-2">
                <div className="text-xs text-white/60">3PAO</div>
                <input
                  value={threePao}
                  onChange={(e) => setThreePao(e.target.value)}
                  placeholder="Insert here..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 placeholder:text-white/30 outline-none focus:border-white/20 focus:bg-white/10"
                />
              </div>

              <div className="space-y-2">
                <div className="text-xs text-white/60">Assessor name</div>
                <input
                  value={assessorName}
                  onChange={(e) => setAssessorName(e.target.value)}
                  placeholder="Insert here..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 placeholder:text-white/30 outline-none focus:border-white/20 focus:bg-white/10"
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/60">
                This is a demo no real data.
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 hover:bg-white/10"
              >
                Cancel
              </button>

              <div className="flex items-center gap-2">
                {record ? (
                  <button
                    type="button"
                    onClick={clear}
                    className="rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-2 text-xs text-rose-200 hover:bg-rose-500/15"
                  >
                    Clear validation
                  </button>
                ) : null}

                <button
                  type="button"
                  disabled={!canSave}
                  onClick={save}
                  className={`rounded-xl border px-4 py-2 text-xs ${
                    canSave
                      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/15"
                      : "border-white/10 bg-white/5 text-white/35"
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
