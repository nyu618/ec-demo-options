"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useDemoOptions } from "@/context/DemoOptionsContext";

const MOBILE_NAV_LINKS = [
  { href: "/", labelJa: "ホーム", labelEn: "HOME" },
  { href: "/about", labelJa: "私たちについて", labelEn: "ABOUT" },
  { href: "/products", labelJa: "商品一覧", labelEn: "PRODUCTS" },
  { href: "/faq", labelJa: "よくある質問", labelEn: "FAQ" },
  { href: "/contact", labelJa: "お問い合わせ", labelEn: "CONTACT" },
];

const MOBILE_ACCOUNT_LINKS = [
  { href: "/mypage", label: "マイページ" },
  { href: "/login", label: "ログイン" },
  { href: "/register", label: "新規会員登録" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();
  const { isSearchEnabled, isAnalyticsEnabled } = useDemoOptions();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchIconClick = () => {
    setMobileMenuOpen(false);
    if (pathname === "/") {
      const el = document.getElementById("products-search-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    router.push("/products");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* ロゴ */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center"
          >
            <span className="text-xl sm:text-2xl font-bold tracking-[0.15em] text-gray-900">
              DEMO
            </span>
          </Link>

          {/* ナビゲーション + アイコン群 */}
          <div className="flex items-center gap-3 sm:gap-7">
            <nav className="hidden sm:flex items-center gap-8">
              <Link
                href="/"
                className="text-sm tracking-wider text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                HOME
              </Link>
              <Link
                href="/about"
                className="text-sm tracking-wider text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                ABOUT
              </Link>
              <Link
                href="/products"
                className="text-sm tracking-wider text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                PRODUCTS
              </Link>
              <Link
                href="/faq"
                className="text-sm tracking-wider text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="text-sm tracking-wider text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                CONTACT
              </Link>
            </nav>

            {/* 検索アイコンボタン（商品検索オプションON時のみ表示） */}
            <AnimatePresence>
              {isSearchEnabled && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handleSearchIconClick}
                  className="p-2 text-gray-900 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
                  aria-label="商品を検索"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>

            {/* アカウントアイコン */}
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-900 hover:text-gray-600 transition-colors duration-200"
              aria-label="ログイン"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </Link>

            {/* カートボタン */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                toggleCart();
              }}
              className="relative p-2 text-gray-900 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
              aria-label="カートを開く"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 bg-gray-900 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* モバイルハンバーガーメニュー開閉ボタン */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="sm:hidden p-2 text-gray-900 hover:text-gray-600 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* モバイルナビゲーションメニュー */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="sm:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl"
          >
            <div className="px-6 py-6 space-y-6">
              {/* メインページリンク */}
              <nav className="space-y-1">
                <p className="text-[10px] font-semibold tracking-[0.25em] text-gray-400 uppercase mb-2">
                  NAVIGATION
                </p>
                {MOBILE_NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between py-2.5 text-sm border-b border-gray-50 transition-colors ${
                        isActive
                          ? "text-gray-900 font-semibold"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <span>{link.labelJa}</span>
                      <span className="text-[11px] tracking-widest text-gray-400">
                        {link.labelEn}
                      </span>
                    </Link>
                  );
                })}

                {isAnalyticsEnabled && (
                  <Link
                    href="/analytics"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 text-sm border-b border-gray-50 text-gray-900 font-medium"
                  >
                    <span>📊 サイト分析ダッシュボード</span>
                    <span className="text-[11px] tracking-widest text-gray-400">
                      ANALYTICS
                    </span>
                  </Link>
                )}
              </nav>

              {/* アカウント関連リンク */}
              <div>
                <p className="text-[10px] font-semibold tracking-[0.25em] text-gray-400 uppercase mb-2.5">
                  ACCOUNT
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {MOBILE_ACCOUNT_LINKS.map((acc) => (
                    <Link
                      key={acc.href}
                      href={acc.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2.5 px-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-center text-xs font-medium text-gray-800 transition-colors"
                    >
                      {acc.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
