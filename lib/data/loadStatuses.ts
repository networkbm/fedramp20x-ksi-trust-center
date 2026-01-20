import fs from "node:fs/promises";
import path from "node:path";
import { KsiStatusCatalog } from "@/types/status";

export async function loadStatuses(): Promise<KsiStatusCatalog> {
  const filePath = path.join(process.cwd(), "data", "status", "ksi-status.json");
  const raw = await fs.readFile(filePath, "utf-8");
  const parsed: unknown = JSON.parse(raw);

  return parsed as KsiStatusCatalog;
}
