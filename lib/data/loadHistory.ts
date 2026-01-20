import fs from "node:fs/promises";
import path from "node:path";

export type KsiHistoryPoint = {
  date: string;
  PASS: number;
  FAIL: number;
  PENDING: number;
};

export type KsiHistory = {
  meta: {
    granularity: string;
    range_days: number;
    notes: string;
  };
  points: KsiHistoryPoint[];
};

export async function loadHistory(): Promise<KsiHistory> {
  const filePath = path.join(process.cwd(), "data", "status", "ksi-history.json");
  const raw = await fs.readFile(filePath, "utf-8");
  const parsed: unknown = JSON.parse(raw);
  return parsed as KsiHistory;
}
