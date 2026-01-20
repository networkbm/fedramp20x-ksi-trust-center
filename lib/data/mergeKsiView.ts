import { KsiCatalog, KsiItem, KsiStatus } from "@/types/ksi";
import { KsiStatusCatalog, KsiStatusEntry } from "@/types/status";

export type KsiViewItem = KsiItem & {
  status: KsiStatus;
  last_verified?: string;
  summary?: string;
  evidence?: string[];
};

export type KsiView = {
  meta: Record<string, unknown>;
  items: KsiViewItem[];
};

export function mergeKsiView(ksis: KsiCatalog, statuses: KsiStatusCatalog): KsiView {
  const statusMap: Record<string, KsiStatusEntry> = (statuses && statuses.statuses) ? statuses.statuses : {};

  const items: KsiViewItem[] = ksis.items.map((k) => {
    const st = statusMap[k.id];
    if (!st) {
      return { ...k, status: "PENDING" };
    }
    return {
      ...k,
      status: st.status,
      last_verified: st.last_verified,
      summary: st.summary,
      evidence: st.evidence
    };
  });

  return {
    meta: {
      ksi_source_count: ksis.items.length,
      status_source_count: Object.keys(statusMap).length,
      framework: statuses?.meta?.framework,
      last_updated: statuses?.meta?.last_updated
    },
    items
  };
}
