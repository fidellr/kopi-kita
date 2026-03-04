import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";
  return (
    <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-kopi-400 to-kopi-600 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-muted text-foreground rounded-tl-sm border border-border/50",
        )}
      >
        {content.split("\n").map((line, i, arr) => (
          <span key={i}>
            {line}
            {i < arr.length - 1 && <br />}
          </span>
        ))}
      </div>
    </div>
  );
}
