export type KsiStatus = "PASS" | "FAIL" | "PENDING";

export type KsiItem = {
  id: string;
  name: string;
  description: string;
  group?: string;
  tags?: string[];
};

export type KsiCatalog = {
  meta?: Record<string, unknown>;
  items: KsiItem[];
};
