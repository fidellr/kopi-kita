import { TrendingUp } from "lucide-react";

interface WeeklyInsightBannerProps {
  insight: string;
}

export default function WeeklyInsightBanner({
  insight,
}: WeeklyInsightBannerProps) {
  return (
    <div className="bg-kopi-50 border border-kopi-200 rounded-2xl p-5 flex gap-4">
      <div className="w-9 h-9 bg-kopi-200 rounded-xl flex items-center justify-center flex-shrink-0">
        <TrendingUp className="w-4 h-4 text-kopi-700" />
      </div>
      <div>
        <div className="text-xs font-semibold text-kopi-700 uppercase tracking-wide mb-1">
          Weekly Insight
        </div>
        <p className="text-sm text-kopi-900">{insight}</p>
      </div>
    </div>
  );
}
