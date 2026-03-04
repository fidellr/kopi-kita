"use client";
import { useRef } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  disabled,
}: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-4 border-t border-border">
      <div className="flex gap-3">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && !e.shiftKey && (e.preventDefault(), onSend())
          }
          placeholder="Tanya tentang customer, promo, atau insight bisnis..."
          disabled={disabled}
          className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50"
        />
        <button
          onClick={onSend}
          disabled={disabled || !value.trim()}
          className="px-4 py-3 kopi-gradient text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
