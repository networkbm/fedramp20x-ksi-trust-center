export type AiChartType = "bar" | "line";

export type AiChartDatum = {
  label: string;
  [key: string]: string | number;
};

export type AiChartSeries = {
  key: string;
  label: string;
  color: string;
};

export type AiChart = {
  type: AiChartType;
  title: string;
  description: string;
  xKey: string;
  data: AiChartDatum[];
  series: AiChartSeries[];
};

export type AiMatchedKsi = {
  id: string;
  name: string;
  status: "PASS" | "FAIL" | "PENDING";
  summary?: string;
  validated?: boolean;
  assessorName?: string;
  threePao?: string;
};

export type AiAssistantResponse = {
  answer: string;
  prompt: string;
  matchedKsis: AiMatchedKsi[];
  chart: AiChart | null;
  source: "ollama" | "fallback";
  model: string;
  error?: string;
};
