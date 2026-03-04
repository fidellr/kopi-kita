"use client";
import Link from "next/link";
import { Users, Sparkles, TrendingUp, Coffee, ArrowRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import TagBadge from "@/components/ui/TagBadge";
import CopyButton from "@/components/ui/CopyButton";

interface DashboardProps {
  data: {
    totalCustomers: number;
    tagCounts: Record<string, number>;
    topDrinks: Array<{ drink: string; count: number }>;
    recentCustomers: Array<{
      id: string;
      name: string;
      tags: string[];
      favoriteDrink: string | null;
      createdAtRelative: string;
    }>;
    cachedPromo: any;
  };
}

const CHART_COLORS = [
  "#d4821e",
  "#e39d3a",
  "#b86616",
  "#963d0e",
  "#ecbd6e",
  "#aa7523",
];

export default function DashboardClient({ data }: DashboardProps) {
  const topTags = Object.entries(data.tagCounts).slice(0, 8);
  const chartData = topTags.map(([name, value]) => ({ name, value }));
  const promos = data.cachedPromo?.promos || [];

  return (
    <div className="space-y-8 animate-in">
      <PageHeader
        title="Good morning ☕"
        description="Here's what's happening with your customers at Kopi Kita."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<Users className="w-5 h-5" />}
          label="Total Customers"
          value={data.totalCustomers}
          sub="All-time registered"
          color="kopi"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Interest Tags"
          value={Object.keys(data.tagCounts).length}
          sub="Unique preferences tracked"
          color="amber"
        />
        <StatCard
          icon={<Sparkles className="w-5 h-5" />}
          label="Promo Ideas Ready"
          value={promos.length || "—"}
          sub={
            promos.length ? "AI-generated this week" : "Visit Promo Ideas page"
          }
          color="orange"
          href="/promos"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-6">
          <h3
            className="font-semibold text-foreground mb-1"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Top Customer Interests
          </h3>
          <p className="text-xs text-muted-foreground mb-6">
            Tag frequency across all customers
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData} margin={{ left: -20, right: 10 }}>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
                angle={-25}
                textAnchor="end"
                height={50}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  fontSize: 12,
                }}
                cursor={{ fill: "hsl(var(--muted))" }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3
              className="font-semibold text-foreground"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Recent Customers
            </h3>
            <Link
              href="/customers"
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {data.recentCustomers.map((c) => (
              <div key={c.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-kopi-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-kopi-700 text-xs font-semibold">
                    {c.name[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-foreground truncate">
                      {c.name}
                    </span>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {c.createdAtRelative}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {c.favoriteDrink || "No drink noted"}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {c.tags.slice(0, 2).map((tag) => (
                      <TagBadge
                        key={tag}
                        tag={tag}
                        className="px-1.5 py-0.5 text-xs"
                      />
                    ))}
                    {c.tags.length > 2 && (
                      <span className="text-xs text-muted-foreground">
                        +{c.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {promos.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3
                className="font-semibold text-foreground"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                This Week's AI Campaigns
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                AI-generated promo ideas based on your customer data
              </p>
            </div>
            <Link
              href="/promos"
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              Full promo page <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {promos.map((promo: any, i: number) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{promo.emoji}</span>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">
                        {promo.theme}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {promo.segment}
                      </span>
                    </div>
                  </div>
                  <CopyButton text={promo.message} iconOnly />
                </div>
                <p className="text-xs text-muted-foreground italic mb-3">
                  "{promo.whyNow}"
                </p>
                <div className="p-3 bg-muted/50 rounded-xl text-xs text-foreground leading-relaxed">
                  {promo.message}
                </div>
                <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                  <Coffee className="w-3 h-3" />
                  <span>{promo.timeWindow}</span>
                  <span>·</span>
                  <span>{promo.segmentSize} customers</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {promos.length === 0 && (
        <div className="bg-gradient-to-r from-kopi-50 to-cream-50 border border-kopi-200 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h3
              className="font-semibold text-kopi-900 mb-1"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Generate this week's promo ideas ✨
            </h3>
            <p className="text-sm text-kopi-700">
              Let AI analyze your {data.totalCustomers} customers and suggest
              smart campaigns.
            </p>
          </div>
          <Link
            href="/promos"
            className="flex-shrink-0 px-4 py-2.5 kopi-gradient text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Generate Promos
          </Link>
        </div>
      )}
    </div>
  );
}
