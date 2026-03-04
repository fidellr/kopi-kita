"use client";
import { useState } from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import ErrorAlert from "@/components/ui/ErrorAlert";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import InterestBar from "@/components/promos/InterestBar";
import PromoCard, { PromoTheme } from "@/components/promos/PromoCard";
import WeeklyInsightBanner from "@/components/promos/WeeklyInsightBanner";

interface PromoData {
  promos: PromoTheme[];
  weeklyInsight: string;
  generatedAt: string;
}

interface PromosClientProps {
  totalCustomers: number;
  tagCounts: Record<string, number>;
  topDrinks: Array<{ drink: string; count: number }>;
  cachedPromo: PromoData | null;
}

export default function PromosClient({
  totalCustomers,
  tagCounts,
  topDrinks,
  cachedPromo,
}: PromosClientProps) {
  const [promoData, setPromoData] = useState<PromoData | null>(cachedPromo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generatePromos = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/promos/generate", { method: "POST" });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Failed");
      }
      setPromoData(await res.json());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const topTags = Object.entries(tagCounts).slice(0, 6);

  return (
    <div className="animate-in space-y-8">
      <PageHeader
        title="Promo Ideas ✨"
        description={`AI-generated campaigns based on your ${totalCustomers} customers' interests`}
      >
        <button
          onClick={generatePromos}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 kopi-gradient text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 shadow-sm"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          {loading
            ? "Analyzing..."
            : promoData
              ? "Regenerate"
              : "Generate Ideas"}
        </button>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-card border border-border rounded-xl p-4">
          <div
            className="text-2xl font-bold"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {totalCustomers}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            Total customers
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div
            className="text-2xl font-bold"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {Object.keys(tagCounts).length}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            Unique interests
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-sm font-semibold truncate">
            {topTags[0]?.[0] || "—"}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            Top interest ({topTags[0]?.[1]} customers)
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-sm font-semibold truncate">
            {topDrinks[0]?.drink?.split(" ").slice(0, 2).join(" ") || "—"}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            Most popular drink
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        <h3
          className="font-semibold text-foreground mb-4"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Customer Interests Overview
        </h3>
        <div className="space-y-2.5">
          {topTags.map(([tag, count]) => (
            <InterestBar
              key={tag}
              tag={tag}
              count={count}
              total={totalCustomers}
            />
          ))}
        </div>
      </div>

      <ErrorAlert message={error} />

      {loading && (
        <div className="bg-gradient-to-br from-kopi-50 to-cream-100 border border-kopi-200 rounded-2xl p-12 text-center">
          <LoadingSpinner size="lg" color="kopi" className="mx-auto mb-4" />
          <h3
            className="font-semibold text-kopi-900 mb-2"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Brewing your promo ideas...
          </h3>
          <p className="text-sm text-kopi-700">
            Analyzing {totalCustomers} customers' interests and preferences
          </p>
        </div>
      )}

      {!loading && !promoData && (
        <div className="bg-gradient-to-br from-kopi-50 to-cream-50 border border-kopi-100 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-kopi-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Sparkles className="w-7 h-7 text-kopi-600" />
          </div>
          <h3
            className="text-xl font-semibold text-kopi-900 mb-3"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Ready to generate smart promos
          </h3>
          <p className="text-sm text-kopi-700 max-w-sm mx-auto mb-6">
            AI will analyze all your customers' interests and suggest the best
            promo themes, target segments, and ready-to-send messages.
          </p>
          <button
            onClick={generatePromos}
            className="inline-flex items-center gap-2 px-6 py-3 kopi-gradient text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            <Sparkles className="w-4 h-4" />
            Generate Promo Ideas
          </button>
        </div>
      )}

      {!loading && promoData && (
        <div className="space-y-6">
          {promoData.weeklyInsight && (
            <WeeklyInsightBanner insight={promoData.weeklyInsight} />
          )}
          <div>
            <h3
              className="font-semibold text-foreground mb-4"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              This Week's Promo Themes
            </h3>
            <div className="space-y-4">
              {promoData.promos.map((promo, i) => (
                <PromoCard key={i} promo={promo} index={i} />
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Generated{" "}
            {promoData.generatedAt
              ? new Date(promoData.generatedAt).toLocaleString("id-ID")
              : "recently"}{" "}
            · Refresh every 24 hours for updated insights
          </p>
        </div>
      )}
    </div>
  );
}
