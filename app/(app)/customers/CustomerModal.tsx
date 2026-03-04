"use client";
import { useState } from "react";
import { Customer } from "@prisma/client";
import { X, Plus, Minus } from "lucide-react";
import { cn, getTagColor, ALL_TAGS } from "@/lib/utils";

interface CustomerModalProps {
  customer: Customer | null;
  onClose: () => void;
  onSaved: (customer: Customer) => void;
}

export default function CustomerModal({
  customer,
  onClose,
  onSaved,
}: CustomerModalProps) {
  const [form, setForm] = useState({
    name: customer?.name || "",
    contact: customer?.contact || "",
    favoriteDrink: customer?.favoriteDrink || "",
    tags: customer?.tags || ([] as string[]),
    notes: customer?.notes || "",
  });
  const [customTag, setCustomTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleTag = (tag: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const addCustomTag = () => {
    const tag = customTag.trim().toLowerCase();
    if (tag && !form.tags.includes(tag)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
      setCustomTag("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setLoading(true);
    setError("");

    try {
      const url = customer ? `/api/customers/${customer.id}` : "/api/customers";
      const method = customer ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      const saved = await res.json();
      onSaved(saved);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card z-10">
          <h2
            className="font-semibold text-foreground"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {customer ? "Edit Customer" : "Add New Customer"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Rina Susanti"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Contact{" "}
              <span className="text-muted-foreground text-xs">(optional)</span>
            </label>
            <input
              type="text"
              value={form.contact}
              onChange={(e) =>
                setForm((p) => ({ ...p, contact: e.target.value }))
              }
              placeholder="081234567890 or email@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Favorite Drink / Product
            </label>
            <input
              type="text"
              value={form.favoriteDrink}
              onChange={(e) =>
                setForm((p) => ({ ...p, favoriteDrink: e.target.value }))
              }
              placeholder="Caramel Cold Brew, Croissant, Latte Art Class..."
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Interest Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-all",
                    form.tags.includes(tag)
                      ? "bg-primary text-white border-primary"
                      : cn("hover:border-primary/30", getTagColor(tag)),
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addCustomTag())
                }
                placeholder="Add custom tag..."
                className="flex-1 px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <button
                type="button"
                onClick={addCustomTag}
                className="px-3 py-2 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {form.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-lg"
                  >
                    {tag}
                    <button type="button" onClick={() => toggleTag(tag)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Notes{" "}
              <span className="text-muted-foreground text-xs">(optional)</span>
            </label>
            <textarea
              value={form.notes}
              onChange={(e) =>
                setForm((p) => ({ ...p, notes: e.target.value }))
              }
              placeholder="Any additional notes about this customer..."
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !form.name.trim()}
              className="flex-1 py-2.5 rounded-xl kopi-gradient text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Saving..."
                : customer
                  ? "Update Customer"
                  : "Add Customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
