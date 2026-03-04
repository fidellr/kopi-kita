import { MessageCircle } from "lucide-react";

const QUESTIONS = [
  "Siapa saja customer yang suka oat milk?",
  "Tag interest apa yang paling populer?",
  "Promo apa yang cocok untuk weekend ini?",
  "Berapa customer yang suka pastry?",
  "Rekomendasikan strategi untuk sweet drink lovers",
  "Customer mana yang cocok untuk workshop latte art?",
];

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
  disabled?: boolean;
}

export default function SuggestedQuestions({
  onSelect,
  disabled,
}: SuggestedQuestionsProps) {
  return (
    <div className="w-64 flex-shrink-0 space-y-4">
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">
            Quick Questions
          </h3>
        </div>
        <div className="space-y-2">
          {QUESTIONS.map((q, i) => (
            <button
              key={i}
              onClick={() => onSelect(q)}
              disabled={disabled}
              className="w-full text-left text-xs text-muted-foreground hover:text-foreground p-2.5 rounded-xl hover:bg-muted border border-transparent hover:border-border transition-all disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-kopi-50 border border-kopi-200 rounded-2xl p-4">
        <div className="text-xs font-semibold text-kopi-800 mb-2">💡 Tips</div>
        <p className="text-xs text-kopi-700 leading-relaxed">
          Kiko has access to all your customer data. Ask in Indonesian or
          English — both work!
        </p>
      </div>
    </div>
  );
}
