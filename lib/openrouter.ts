import OpenAI from "openai";

export const MODEL = process.env.OPENROUTER_MODEL;

export const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY!,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    "X-Title": "Kopi Kita CRM",
  },
});

export function extractText(response: OpenAI.Chat.ChatCompletion): string {
  return response.choices[0]?.message?.content ?? "";
}
