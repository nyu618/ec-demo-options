"use client";

import { motion } from "framer-motion";
import { Category, CATEGORY_LABELS } from "@/types";

interface CategoryFilterProps {
  selected: Category;
  onChange: (category: Category) => void;
  layoutId?: string;
}

const categories: Category[] = [
  "all",
  "new",
  "featured",
  "tops",
  "outerwear",
  "suits",
  "accessories",
];

export function CategoryFilter({
  selected,
  onChange,
  layoutId = "activeCategory",
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={`relative px-4 sm:px-5 py-2 text-xs sm:text-sm tracking-wider rounded-full transition-colors duration-200 cursor-pointer ${
            selected === category
              ? "text-white font-medium"
              : "text-accent-light hover:text-accent bg-gray-100/80 hover:bg-gray-200/70"
          }`}
        >
          {selected === category && (
            <motion.div
              layoutId={layoutId}
              className="absolute inset-0 bg-accent rounded-full"
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
            />
          )}
          <span className="relative z-10">{CATEGORY_LABELS[category]}</span>
        </button>
      ))}
    </div>
  );
}
