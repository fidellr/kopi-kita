import Link from "next/link";
import { cn } from "@/lib/utils";

type Color = "kopi" | "amber" | "orange";

const colorMap: Record<Color, string> = {
  kopi: "bg-kopi-100 text-kopi-700",
  amber: "bg-amber-100 text-amber-700",
  orange: "bg-orange-100 text-orange-700",
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  sub: string;
  color: Color;
  href?: string;
}

export default function StatCard({
  icon,
  label,
  value,
  sub,
  color,
  href,
}: StatCardProps) {
  const inner = (
    <div className="bg-card border border-border rounded-2xl p-5 hover:shadow-sm transition-shadow h-full">
      <div
        className={cn(
          "w-9 h-9 rounded-xl flex items-center justify-center mb-4",
          colorMap[color],
        )}
      >
        {icon}
      </div>
      <div
        className="text-3xl font-bold text-foreground mb-1"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        {value}
      </div>
      <div className="text-sm font-medium text-foreground">{label}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
    </div>
  );
  if (href)
    return (
      <Link href={href} className="block">
        {inner}
      </Link>
    );
  return inner;
}
