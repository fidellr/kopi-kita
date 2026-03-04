import TagBadge from "@/components/ui/TagBadge";

interface TagFilterPanelProps {
  allTags: string[];
  activeTags: string[];
  onToggle: (tag: string) => void;
  onClear: () => void;
}

export default function TagFilterPanel({
  allTags,
  activeTags,
  onToggle,
  onClear,
}: TagFilterPanelProps) {
  return (
    <div className="mb-5 p-4 bg-card border border-border rounded-xl">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Filter by interest
        </span>
        {activeTags.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-primary hover:underline"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <TagBadge
            key={tag}
            tag={tag}
            active={activeTags.includes(tag)}
            onClick={() => onToggle(tag)}
            className="px-2.5 py-1.5"
          />
        ))}
      </div>
    </div>
  );
}
