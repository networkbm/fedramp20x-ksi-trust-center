import { NextRequest, NextResponse } from "next/server";
import { loadKsis } from "@/lib/data/loadKsis";
import { loadStatuses } from "@/lib/data/loadStatuses";
import { loadHistory } from "@/lib/data/loadHistory";
import { mergeKsiView } from "@/lib/data/mergeKsiView";
import { queryOllamaForKsis } from "@/lib/ai/ksiAssistant";
import { ValidationRecord } from "@/types/validation";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { prompt?: string; validations?: ValidationRecord[] };
    const prompt = body.prompt?.trim();
    const validations = Array.isArray(body.validations) ? body.validations : [];

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const [ksis, statuses, history] = await Promise.all([loadKsis(), loadStatuses(), loadHistory()]);
    const view = mergeKsiView(ksis, statuses);
    const result = await queryOllamaForKsis({ prompt, items: view.items, history: history.points, validations });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
