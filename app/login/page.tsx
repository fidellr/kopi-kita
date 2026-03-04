"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Coffee, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden kopi-gradient">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -right-16 w-80 h-80 rounded-full bg-black/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/5" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Coffee className="w-5 h-5 text-white" />
            </div>
            <span
              className="text-white font-semibold text-lg"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Kopi Kita
            </span>
          </div>

          <div>
            <h1
              className="text-5xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Smart promos
              <br />
              <em>crafted by AI,</em>
              <br />
              built on trust.
            </h1>
            <p className="text-white/75 text-lg leading-relaxed max-w-sm">
              Know what your customers love. Run promos that feel personal. Grow
              your coffee community.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">30+</div>
              <div className="text-white/60 text-sm">Customers tracked</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">AI</div>
              <div className="text-white/60 text-sm">Promo ideas</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">↑</div>
              <div className="text-white/60 text-sm">Retention</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-9 h-9 kopi-gradient rounded-xl flex items-center justify-center">
              <Coffee className="w-4 h-4 text-white" />
            </div>
            <span
              className="font-semibold text-foreground"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Kopi Kita
            </span>
          </div>

          <div className="mb-8">
            <h2
              className="text-2xl font-semibold text-foreground mb-2"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Welcome back, Mimi 👋
            </h2>
            <p className="text-muted-foreground text-sm">
              Sign in to manage your coffee community
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mimi@kopikita.id"
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 kopi-gradient text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground text-center mb-2 font-medium">
              Demo credentials
            </p>
            <p className="text-xs text-center text-foreground font-mono">
              mimi@kopikita.id · kopikita123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
