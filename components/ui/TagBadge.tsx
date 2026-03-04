import { cn, getTagColor } from "@/lib/utils";

interface TagBadgeProps {
  tag: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function TagBadge({
  tag,
  active,
  onClick,
  className,
}: TagBadgeProps) {
  const base = "text-xs px-2 py-1 rounded-lg border font-medium transition-all";

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          base,
          active
            ? "bg-primary text-white border-primary"
            : cn("hover:border-primary/30", getTagColor(tag)),
          className,
        )}
      >
        {tag}
      </button>
    );
  }

  return <span className={cn(base, getTagColor(tag), className)}>{tag}</span>;
}
