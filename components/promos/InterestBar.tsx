import { cn, getTagColor } from "@/lib/utils";

interface InterestBarProps {
  tag: string;
  count: number;
  total: number;
}

export default function InterestBar({ tag, count, total }: InterestBarProps) {
  const pct = Math.round((count / total) * 100);
  return (
    <div className="flex items-center gap-3">
      <span
        className={cn(
          "text-xs px-2 py-1 rounded-lg border font-medium w-36 flex-shrink-0 text-center",
          getTagColor(tag),
        )}
      >
        {tag}
      </span>
      <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-kopi-400 to-kopi-600 rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground w-16 text-right flex-shrink-0">
        {count} ({pct}%)
      </span>
    </div>
  );
}
