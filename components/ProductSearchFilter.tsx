"use client";

import { motion } from "framer-motion";
import { Category, CATEGORY_LABELS, Product } from "@/types";
import { CategoryFilter } from "./CategoryFilter";

interface ProductSearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  layoutId?: string;
}

export function filterProducts(
  productList: Product[],
  selectedCategory: Category,
  searchQuery: string
): Product[] {
  return productList.filter((product) => {
    // 1. カテゴリ絞り込み
    const matchesCategory =
      selectedCategory === "all"
        ? true
        : selectedCategory === "new"
          ? Boolean(product.isNew)
          : selectedCategory === "featured"
            ? product.featured
            : product.category === selectedCategory;

    if (!matchesCategory) return false;

    // 2. キーワード絞り込み（全角・半角スペース区切りAND検索）
    const trimmedQuery = searchQuery.trim().toLowerCase();
    if (!trimmedQuery) return true;

    const keywords = trimmedQuery.split(/[\s\u3000]+/);
    const categoryLabel =
      CATEGORY_LABELS[product.category as Category] || "";
    const variantOptions = product.variants
      .flatMap((v) => v.options)
      .join(" ");

    const searchableText = [
      product.name,
      product.nameEn,
      product.description,
      product.category,
      categoryLabel,
      variantOptions,
      product.isNew ? "新作 new" : "",
      product.featured ? "おすすめ featured" : "",
    ]
      .join(" ")
      .toLowerCase();

    return keywords.every((kw) => searchableText.includes(kw));
  });
}

export function ProductSearchFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  layoutId = "activeCategory",
}: ProductSearchFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="mb-12 space-y-6"
    >
      {/* 検索バー */}
      <div className="max-w-md mx-auto relative">
        <div className="relative flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none"
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
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="商品名・キーワードで検索..."
            aria-label="商品を検索"
            className="w-full pl-12 pr-10 py-3 text-sm bg-white border border-gray-200 rounded-full text-gray-900 placeholder:text-gray-400 shadow-xs focus:outline-none focus:border-gray-900 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="検索キーワードをクリア"
              className="absolute right-3.5 p-1 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
            >
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* カテゴリ絞り込み */}
      <div className="flex justify-center">
        <CategoryFilter
          selected={selectedCategory}
          onChange={onCategoryChange}
          layoutId={layoutId}
        />
      </div>
    </motion.div>
  );
}
