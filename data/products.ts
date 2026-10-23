import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "ウールブレンド オーバーサイズコート",
    nameEn: "Wool Blend Oversized Coat",
    price: 49800,
    category: "outerwear",
    description: "上質なウールブレンド素材を使用したオーバーサイズシルエットのコート。ミニマルなデザインでありながら、確かな存在感を放つ一着です。裏地付きで保温性も確保。日常使いからフォーマルシーンまで幅広く対応します。",
    images: [
      "/images/coat-black.jpg",
      "/images/coat-grey.jpg"
    ],
    variants: [
      { type: "サイズ", options: ["S", "M", "L", "XL"] },
      { type: "カラー", options: ["ブラック", "グレー"] }
    ],
    featured: true,
    isNew: true
  },
  {
    id: "2",
    name: "オーガニックコットン Tシャツ",
    nameEn: "Organic Cotton T-Shirt",
    price: 7800,
    category: "tops",
    description: "厳選されたオーガニックコットンを100%使用。肌に優しい着心地と、洗い込むほどに風合いが増す素材感が魅力です。ベーシックでありながら、シルエットにこだわった一枚。",
    images: [
      "/images/tshirt-white.jpg",
      "/images/tshirt-black.jpg",
      "/images/tshirt-beige.jpg"
    ],
    variants: [
      { type: "サイズ", options: ["XS", "S", "M", "L", "XL"] },
      { type: "カラー", options: ["ホワイト", "ブラック", "ベージュ"] }
    ],
    featured: true,
    isNew: false
  },
  {
    id: "3",
    name: "セットアップスーツ",
    nameEn: "Setup Suit",
    price: 15800,
    category: "suits",
    description: "洗練されたシルエットと快適な着心地を兼ね備えたセットアップスーツ。上質なウール混紡素材を使用し、シワになりにくくお手入れも簡単。ビジネスからフォーマルまで幅広いシーンで活躍する一着です。",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop&blend=F5F5F4&blend-mode=multiply&blend-alpha=30"
    ],
    variants: [
      { type: "サイズ", options: ["S", "M", "L"] }
    ],
    featured: true,
    isNew: false
  },
  {
    id: "4",
    name: "レザーミニマルウォレット",
    nameEn: "Leather Minimal Wallet",
    price: 12800,
    category: "accessories",
    description: "イタリアンレザーを使用したコンパクトウォレット。必要最小限のカードスロットとコインポケットを備え、ミニマリストのための洗練されたデザイン。",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&h=1000&fit=crop&blend=000000&blend-mode=multiply&blend-alpha=50"
    ],
    variants: [
    ],
    featured: true,
    isNew: false
  },
  {
    id: "5",
    name: "カシミヤブレンド クルーネックニット",
    nameEn: "Cashmere Blend Crew Neck Knit",
    price: 24800,
    category: "tops",
    description: "カシミヤをブレンドした極上の肌触りのクルーネックニット。上品な光沢感と軽やかな着心地を両立。レイヤードスタイルにも最適です。",
    images: [
      "/images/knit-charcoal.jpg",
      "/images/knit-bordeaux.jpg"
    ],
    variants: [
      { type: "サイズ", options: ["S", "M", "L", "XL"] },
      { type: "カラー", options: ["チャコール", "ボルドー"] }
    ],
    featured: false,
    isNew: true
  },
  {
    id: "6",
    name: "ライトダウンジャケット",
    nameEn: "Light Down Jacket",
    price: 35800,
    category: "outerwear",
    description: "高品質ダウンを使用した軽量ジャケット。コンパクトに収納可能でありながら、高い保温性を実現。インナーダウンとしても活躍する汎用性の高い一着。",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop&blend=000000&blend-mode=multiply&blend-alpha=50"
    ],
    variants: [
      { type: "サイズ", options: ["S", "M", "L", "XL"] }
    ],
    featured: false,
    isNew: true
  }
];
