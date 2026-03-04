import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { aggregateTags, getTopDrinks } from "@/lib/utils";
import { buildPromoPrompt } from "@/lib/prompts";
import { openrouter, MODEL, extractText } from "@/lib/openrouter";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const customers = await prisma.customer.findMany();

    if (customers.length === 0) {
      return NextResponse.json(
        { error: "No customers yet. Add some first!" },
        { status: 400 }
      );
    }

    const tagCounts = aggregateTags(customers);
    const topDrinks = getTopDrinks(customers);
    const sampleCustomers = customers.slice(0, 15).map((c) => ({
      name: c.name,
      tags: c.tags,
      favoriteDrink: c.favoriteDrink || "",
    }));

    const prompt = buildPromoPrompt({
      totalCustomers: customers.length,
      tagCounts,
      topDrinks,
      sampleCustomers,
    });

    const completion = await openrouter.chat.completions.create({
      model: MODEL as string,
      max_tokens: 2000,
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content:
            "You are a smart marketing assistant for an Indonesian coffee shop. Always respond with valid JSON only — no markdown fences, no extra text.",
        },
        { role: "user", content: prompt },
      ],
    });

    const raw = extractText(completion);
    const clean = raw.replace(/```json\n?|\n?```/g, "").trim();
    const promoData = JSON.parse(clean);
    promoData.generatedAt = new Date().toISOString();

    await prisma.promoCache.create({ data: { data: promoData } });

    const old = await prisma.promoCache.findMany({
      orderBy: { createdAt: "desc" },
      skip: 10,
    });
    if (old.length > 0) {
      await prisma.promoCache.deleteMany({
        where: { id: { in: old.map((c) => c.id) } },
      });
    }

    return NextResponse.json(promoData);
  } catch (error: any) {
    console.error("Promo generation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate promos" },
      { status: 500 }
    );
  }
}
