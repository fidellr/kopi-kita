interface ErrorAlertProps {
  message: string;
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
  if (!message) return null;
  return (
    <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
      {message}
    </div>
  );
}
