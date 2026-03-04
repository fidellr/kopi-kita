interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="text-center py-16 text-muted-foreground">
      <div className="flex justify-center mb-3 opacity-30">{icon}</div>
      <p className="text-sm font-medium text-foreground mb-1">{title}</p>
      {description && (
        <p className="text-xs text-muted-foreground mb-4">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
