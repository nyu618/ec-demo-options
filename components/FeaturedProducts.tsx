"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { FadeInView } from "./FadeInView";
import {
  ProductSearchFilter,
  filterProducts,
} from "./ProductSearchFilter";
import { useDemoOptions } from "@/context/DemoOptionsContext";
import { Category } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export function FeaturedProducts() {
  const { isSearchEnabled } = useDemoOptions();
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const defaultFeatured = products.filter((p) => p.featured).slice(0, 4);
  const displayedProducts = isSearchEnabled
    ? filterProducts(products, selectedCategory, searchQuery)
    : defaultFeatured;

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  return (
    <section className="py-20 sm:py-28 px-4 bg-background-light">
      <div className="max-w-7xl mx-auto">
        <FadeInView>
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs tracking-[0.4em] text-text-muted mb-3">
              {isSearchEnabled ? "PRODUCTS" : "FEATURED"}
            </p>
            <h2 className="text-2xl sm:text-3xl font-light tracking-wider text-accent">
              {isSearchEnabled ? "商品検索・一覧" : "おすすめアイテム"}
            </h2>
          </div>
        </FadeInView>

        {/* 検索バー ＆ カテゴリ絞り込み（オプションON時のみ表示） */}
        <AnimatePresence>
          {isSearchEnabled && (
            <ProductSearchFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              layoutId="homePageCategory"
            />
          )}
        </AnimatePresence>

        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {displayedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-16 text-center"
          >
            <p className="text-base text-gray-600 tracking-wider mb-4">
              該当する商品が見つかりません
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs tracking-wider text-gray-900 border-b border-gray-900 pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors cursor-pointer"
            >
              検索条件をリセット
            </button>
          </motion.div>
        )}

        <FadeInView delay={0.4}>
          <div className="text-center mt-12 sm:mt-16">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm tracking-wider text-accent border-b border-accent pb-1 hover:text-accent-light hover:border-accent-light transition-colors duration-200"
            >
              VIEW ALL PRODUCTS
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
