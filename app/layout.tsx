import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kopi Kita — Smart Coffee CRM",
  description:
    "AI-powered customer insights and promo management for Kopi Kita coffee shop",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head />
      <body className="min-h-screen cream-bg">{children}</body>
    </html>
  );
}
