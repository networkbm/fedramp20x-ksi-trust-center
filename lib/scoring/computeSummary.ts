import { KsiStatus } from "@/types/ksi";
import { KsiViewItem } from "@/lib/data/mergeKsiView";

export type StatusCounts = {
  PASS: number;
  FAIL: number;
  PENDING: number;
  total: number;
};

export function computeStatusCounts(items: KsiViewItem[]): StatusCounts {
  const counts: StatusCounts = { PASS: 0, FAIL: 0, PENDING: 0, total: items.length };

  for (const it of items) {
    const s: KsiStatus = it.status ?? "PENDING";
    if (s === "PASS") counts.PASS += 1;
    else if (s === "FAIL") counts.FAIL += 1;
    else counts.PENDING += 1;
  }

  return counts;
}
