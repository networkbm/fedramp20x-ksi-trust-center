"use client";

export default function KsiSearch({
  value,
  onChange
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex w-full items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 focus-within:border-white/20 focus-within:bg-white/10">
      <div className="text-xs text-white/40">Search</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by ID, name, group, or keywords..."
        className="w-full bg-transparent text-sm text-white/80 placeholder:text-white/30 outline-none"
      />
      {value.length > 0 ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="rounded-xl border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/60 hover:bg-white/10 hover:text-white/80"
        >
          Clear
        </button>
      ) : null}
    </div>
  );
}
