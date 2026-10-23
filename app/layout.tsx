import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { DemoSettingsPanel } from "@/components/DemoSettingsPanel";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { CartProvider } from "@/context/CartContext";
import { DemoOptionsProvider } from "@/context/DemoOptionsContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DEMO — Premium Lifestyle Store",
  description:
    "上質なライフスタイルを提案するプレミアムセレクトショップ。厳選されたアイテムをお届けします。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} ${notoSansJP.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <DemoOptionsProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <CartDrawer />
            <DemoSettingsPanel />
            <ChatbotWidget />
          </CartProvider>
        </DemoOptionsProvider>
      </body>
    </html>
  );
}
