import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  color?: "white" | "primary" | "kopi";
}

const sizeMap = { sm: "w-3.5 h-3.5", md: "w-5 h-5", lg: "w-12 h-12" };
const colorMap = {
  white: "border-white/30 border-t-white",
  primary: "border-primary/30 border-t-primary",
  kopi: "border-kopi-200 border-t-kopi-600",
};

export default function LoadingSpinner({
  size = "md",
  color = "white",
  className,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "rounded-full animate-spin border-2",
        sizeMap[size],
        colorMap[color],
        className,
      )}
      style={size === "lg" ? { borderWidth: "3px" } : undefined}
    />
  );
}
