import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { aggregateTags, getTopDrinks } from "@/lib/utils";
import { buildChatSystemPrompt } from "@/lib/prompts";
import { openrouter, MODEL, extractText } from "@/lib/openrouter";
import { z } from "zod";

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(2000),
      })
    )
    .max(50),
});

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { messages } = chatSchema.parse(body);

    const customers = await prisma.customer.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    const tagCounts = aggregateTags(customers);
    const topDrinks = getTopDrinks(customers);
    const recentCustomers = customers.slice(0, 10).map((c) => ({
      name: c.name,
      tags: c.tags,
      favoriteDrink: c.favoriteDrink || "",
      createdAt: c.createdAt,
    }));

    const systemPrompt = buildChatSystemPrompt({
      totalCustomers: customers.length,
      tagCounts,
      recentCustomers,
      topDrinks,
    });

    const completion = await openrouter.chat.completions.create({
      model: MODEL,
      max_tokens: 800,
      temperature: 0.7,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
    });

    const content = extractText(completion);
    return NextResponse.json({ content });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process chat" },
      { status: 500 }
    );
  }
}
