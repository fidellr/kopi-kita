"use client";
import { useState, useRef, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import SuggestedQuestions from "@/components/chat/SuggestedQuestions";
import { Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hai! Saya Kiko, asisten AI Kopi Kita ☕\n\nSaya bisa bantu kamu analisis data customer, kasih rekomendasi promo, atau jawab pertanyaan tentang bisnis kamu. Mau tanya apa?",
};

export default function ChatClient() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const content = text || input.trim();
    if (!content || loading) return;
    const userMsg: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Maaf, ada masalah teknis. Coba lagi ya!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in flex flex-col h-[calc(100vh-4rem)] max-h-[800px]">
      <PageHeader
        title="AI Assistant"
        description="Ask Kiko anything about your customers and business"
      >
        <button
          onClick={() => setMessages([INITIAL_MESSAGE])}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          New chat
        </button>
      </PageHeader>

      <div className="flex gap-6 flex-1 min-h-0">
        <div className="flex-1 flex flex-col bg-card border border-border rounded-2xl overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {messages.map((msg, i) => (
              <ChatMessage key={i} role={msg.role} content={msg.content} />
            ))}

            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-kopi-400 to-kopi-600 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-muted border border-border/50 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1 items-center">
                    {[0, 150, 300].map((delay) => (
                      <div
                        key={delay}
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <ChatInput
            value={input}
            onChange={setInput}
            onSend={sendMessage}
            disabled={loading}
          />
        </div>

        <SuggestedQuestions onSelect={sendMessage} disabled={loading} />
      </div>
    </div>
  );
}
