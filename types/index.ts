/** 商品バリエーション */
export interface ProductVariant {
  type: string;  // 例: "サイズ", "カラー"
  options: string[];
}

/** 商品データ */
export interface Product {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  variants: ProductVariant[];
  featured: boolean;
  isNew?: boolean;
}

/** カート内アイテム */
export interface CartItem {
  id: string; // productId + variant identifiers
  product: Product;
  quantity: number;
  selectedVariants: Record<string, string>;
}

/** カテゴリ */
export type Category =
  | "all"
  | "new"
  | "featured"
  | "tops"
  | "outerwear"
  | "suits"
  | "accessories";

export const CATEGORY_LABELS: Record<Category, string> = {
  all: "すべて",
  new: "新作",
  featured: "おすすめ",
  tops: "トップス",
  outerwear: "アウター",
  suits: "スーツ",
  accessories: "アクセサリー",
};
