"use client";

import { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDemoOptions } from "@/context/DemoOptionsContext";
import { Category, CATEGORY_LABELS } from "@/types";

const QUICK_CATEGORIES: Category[] = ["all", "new", "featured", "outerwear", "tops"];

export function HeroSection() {
  const {
    isSearchEnabled,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useDemoOptions();

  const scrollToProducts = () => {
    const el = document.getElementById("products-search-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleHeroSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    scrollToProducts();
  };

  const handleQuickCategorySelect = (cat: Category) => {
    setSelectedCategory(cat);
    scrollToProducts();
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 背景画像 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop')",
        }}
      >
        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 text-center px-4 w-full max-w-xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-sm sm:text-base tracking-[0.3em] text-white/80 mb-4"
        >
          PREMIUM LIFESTYLE STORE
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-[0.1em] mb-6"
        >
          DEMO
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-base sm:text-lg text-white/70 tracking-wider max-w-md mx-auto"
        >
          日常に、上質を。
        </motion.p>

        {/* 商品検索機能ON時：ファーストビュー内にも検索バー＆クイック絞り込みを表示 */}
        <AnimatePresence>
          {isSearchEnabled && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mt-10"
            >
              <form
                onSubmit={handleHeroSearchSubmit}
                className="relative flex items-center max-w-md mx-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-white/70 absolute left-4 pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="商品名・キーワードで検索..."
                  aria-label="トップページから商品を検索"
                  className="w-full pl-12 pr-24 py-3.5 text-sm bg-white/15 backdrop-blur-md border border-white/35 rounded-full text-white placeholder:text-white/65 shadow-xl focus:outline-none focus:bg-white/25 focus:border-white transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-4 py-2 rounded-full bg-white text-gray-900 text-xs font-semibold tracking-wider hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  検索
                </button>
              </form>

              {/* クイックカテゴリ絞り込みタグ */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                {QUICK_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleQuickCategorySelect(cat)}
                    className={`px-3.5 py-1 rounded-full text-xs tracking-wider transition-all cursor-pointer backdrop-blur-xs border ${
                      selectedCategory === cat
                        ? "bg-white text-gray-900 border-white font-medium"
                        : "bg-black/30 text-white/85 border-white/25 hover:bg-white/20 hover:border-white/50"
                    }`}
                  >
                    {CATEGORY_LABELS[cat]}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
