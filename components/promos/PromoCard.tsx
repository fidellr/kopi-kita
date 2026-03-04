import { Clock, Users, Zap, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";
import TagBadge from "@/components/ui/TagBadge";
import CopyButton from "@/components/ui/CopyButton";

export interface PromoTheme {
  theme: string;
  emoji: string;
  segment: string;
  segmentSize: number;
  whyNow: string;
  message: string;
  timeWindow: string;
  tags: string[];
  discount: string;
}

const GRADIENT_COLORS = [
  "from-amber-50 to-orange-50 border-amber-200",
  "from-pink-50 to-rose-50 border-pink-200",
  "from-green-50 to-emerald-50 border-green-200",
];

interface PromoCardProps {
  promo: PromoTheme;
  index: number;
}

export default function PromoCard({ promo, index }: PromoCardProps) {
  return (
    <div
      className={cn(
        "border rounded-2xl p-6 bg-gradient-to-br",
        GRADIENT_COLORS[index % GRADIENT_COLORS.length],
      )}
    >
      <div className="flex items-start gap-4 mb-5">
        <div className="w-14 h-14 bg-white border border-white/80 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
          {promo.emoji}
        </div>
        <div>
          <h3
            className="font-bold text-foreground text-lg leading-tight"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {promo.theme}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-xs bg-white/70 border border-white/80 text-foreground px-2.5 py-1 rounded-lg font-medium">
              {promo.discount}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {promo.timeWindow}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div className="bg-white/60 rounded-xl p-4 border border-white/80">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
              Target Segment
            </span>
          </div>
          <p className="text-sm font-medium text-foreground">{promo.segment}</p>
          <p className="text-xs text-muted-foreground mt-1">
            ~{promo.segmentSize} customers
          </p>
        </div>

        <div className="bg-white/60 rounded-xl p-4 border border-white/80">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
              Why Now
            </span>
          </div>
          <p className="text-sm text-foreground">{promo.whyNow}</p>
        </div>

        <div className="bg-white/60 rounded-xl p-4 border border-white/80">
          <div className="flex items-center gap-2 mb-2">
            <Coffee className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
              Interest Tags
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {promo.tags?.slice(0, 3).map((tag) => (
              <TagBadge key={tag} tag={tag} className="px-1.5 py-0.5" />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white/80 border border-white rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
            WhatsApp / IG DM Message
          </span>
          <CopyButton text={promo.message} />
        </div>
        <p className="text-sm text-foreground leading-relaxed font-medium">
          {promo.message}
        </p>
      </div>
    </div>
  );
}
