"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  iconOnly?: boolean;
}

export default function CopyButton({
  text,
  label = "Copy message",
  className,
  iconOnly = false,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (iconOnly) {
    return (
      <button
        onClick={copy}
        className={cn(
          "p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground",
          className,
        )}
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-green-600" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={copy}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
        copied
          ? "bg-green-100 text-green-700 border border-green-200"
          : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground border border-border",
        className,
      )}
    >
      {copied ? (
        <Check className="w-3.5 h-3.5" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
      {copied ? "Copied!" : label}
    </button>
  );
}
