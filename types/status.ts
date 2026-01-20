export type KsiStatus = "PASS" | "FAIL" | "PENDING";

export type KsiStatusEntry = {
  status: KsiStatus;
  last_verified: string;
  summary: string;
  evidence: string[];
};

export type KsiStatusCatalog = {
  meta: {
    framework: string;
    environment: string;
    last_updated: string;
    notes: string;
  };
  statuses: Record<string, KsiStatusEntry>;
};
