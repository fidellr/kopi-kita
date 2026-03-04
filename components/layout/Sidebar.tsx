"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  Users,
  Sparkles,
  MessageCircle,
  Coffee,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/promos", label: "Promo Ideas", icon: Sparkles },
  { href: "/chat", label: "AI Assistant", icon: MessageCircle },
];

export default function Sidebar({ user }: { user: User }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#1a0e08] flex flex-col z-30">
      <div className="px-6 py-6 border-b border-white/8">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-kopi-400 to-kopi-600 flex items-center justify-center shadow-lg shadow-kopi-900/50">
            <Coffee className="w-4 h-4 text-white" />
          </div>
          <div>
            <div
              className="text-white font-semibold text-base"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Kopi Kita
            </div>
            <div className="text-white/40 text-xs">Smart CRM</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-auto">
        <div className="px-3 mb-3">
          <span className="text-white/30 text-xs font-medium uppercase tracking-wider">
            Menu
          </span>
        </div>
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group",
                isActive
                  ? "bg-kopi-600/80 text-white shadow-sm"
                  : "text-white/55 hover:text-white/90 hover:bg-white/6",
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 flex-shrink-0",
                  isActive
                    ? "text-white"
                    : "text-white/55 group-hover:text-white/80",
                )}
              />
              <span className="text-sm font-medium">{label}</span>
              {isActive && (
                <ChevronRight className="w-3.5 h-3.5 ml-auto text-white/60" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/8">
        <div className="px-3 mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-kopi-400 to-kopi-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">
                {user.email?.[0].toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white/80 text-xs font-medium truncate">
                {user.email?.split("@")[0]}
              </div>
              <div className="text-white/35 text-xs truncate">{user.email}</div>
            </div>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/5 transition-all text-sm"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
