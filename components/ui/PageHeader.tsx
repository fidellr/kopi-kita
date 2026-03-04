interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function PageHeader({
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div className="page-header mb-0">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
}
