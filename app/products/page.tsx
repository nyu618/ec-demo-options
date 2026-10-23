"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import {
  ProductSearchFilter,
  filterProducts,
} from "@/components/ProductSearchFilter";
import { FadeInView } from "@/components/FadeInView";
import { useDemoOptions } from "@/context/DemoOptionsContext";
import { Category } from "@/types";
import { AnimatePresence, motion } from "framer-motion";

export default function ProductsPage() {
  const { isSearchEnabled } = useDemoOptions();
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const displayedProducts = isSearchEnabled
    ? filterProducts(products, selectedCategory, searchQuery)
    : products;

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  return (
    <div className="pt-24 sm:pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* ページヘッダー */}
        <FadeInView>
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs tracking-[0.4em] text-text-muted mb-3">
              COLLECTION
            </p>
            <h1 className="text-3xl sm:text-4xl font-light tracking-wider text-accent">
              全商品一覧
            </h1>
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
              layoutId="productsPageCategory"
            />
          )}
        </AnimatePresence>

        {/* 商品グリッド / 0件メッセージ */}
        {displayedProducts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {displayedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-20 text-center"
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

        {/* 商品数表示 */}
        <FadeInView delay={0.3}>
          <div className="text-center mt-12">
            <p className="text-xs text-text-muted tracking-wider">
              {displayedProducts.length} ITEMS
            </p>
          </div>
        </FadeInView>
      </div>
    </div>
  );
}
