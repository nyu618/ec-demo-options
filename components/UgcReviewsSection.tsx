"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useDemoOptions } from "@/context/DemoOptionsContext";

interface UgcReviewItem {
  id: string;
  username: string;
  userInitials: string;
  avatarBg: string;
  heightAndSize: string;
  image: string;
  rating: number;
  comment: string;
  hashtags: string[];
  postedAt: string;
}

const DUMMY_UGC_REVIEWS: UgcReviewItem[] = [
  {
    id: "ugc-1",
    username: "@yuka_minimal",
    userInitials: "YM",
    avatarBg: "bg-stone-800",
    heightAndSize: "162cm / Sサイズ着用",
    image: "/images/coat-black.jpg",
    rating: 5,
    comment:
      "シルエットが本当に綺麗で、羽織るだけでコーディネートが格上げされます。生地の質感も高級感があって大満足です！",
    hashtags: ["#DEMO", "#愛用アイテム", "#ミニマルコーデ"],
    postedAt: "3日前",
  },
  {
    id: "ugc-2",
    username: "@kenji.style_",
    userInitials: "KS",
    avatarBg: "bg-zinc-700",
    heightAndSize: "176cm / Lサイズ着用",
    image: "/images/knit-charcoal.jpg",
    rating: 5,
    comment:
      "肌触りが抜群でチクチク感が一切ありません。オンオフ問わず着回せる絶妙なサイズ感で、色違いもリピート購入しました。",
    hashtags: ["#DEMO", "#買ってよかった", "#大人カジュアル"],
    postedAt: "5日前",
  },
  {
    id: "ugc-3",
    username: "@miki_wardrobe",
    userInitials: "MW",
    avatarBg: "bg-neutral-800",
    heightAndSize: "158cm / Mサイズ着用",
    image: "/images/tshirt-beige.jpg",
    rating: 5,
    comment:
      "絶妙なニュアンスカラーがお気に入り。何度か洗濯してもヨレにくく、1枚で着ても透けにくいしっかりとした素材感です。",
    hashtags: ["#DEMO", "#毎日の服", "#シンプルライフ"],
    postedAt: "1週間前",
  },
  {
    id: "ugc-4",
    username: "@sho_tokyo_fashion",
    userInitials: "ST",
    avatarBg: "bg-slate-800",
    heightAndSize: "180cm / XLサイズ着用",
    image: "/images/coat-grey.jpg",
    rating: 5,
    comment:
      "軽くて暖かいのに着膨れしない理想的な一着。丁寧な梱包で届いた瞬間から特別感がありました。今季一番のお気に入りです。",
    hashtags: ["#DEMO", "#冬支度", "#一生モノ"],
    postedAt: "2週間前",
  },
];

interface UgcReviewsSectionProps {
  productName?: string;
}

export function UgcReviewsSection({ productName }: UgcReviewsSectionProps) {
  const { isUgcEnabled } = useDemoOptions();

  return (
    <AnimatePresence>
      {isUgcEnabled && (
        <motion.section
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-20 pt-16 border-t border-gray-200"
        >
          {/* セクションヘッダー */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 text-xs font-medium text-gray-700 mb-4">
              <InstagramIcon className="w-3.5 h-3.5 text-gray-900" />
              <span>USER GENERATED CONTENT</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-light tracking-wider text-accent">
              Instagramで話題！お客様の投稿
            </h2>

            {/* 総合評価サマリー */}
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex items-center text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4" />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-900">5.0</span>
              <span className="text-xs text-gray-500">
                （ご購入者様のInstagram投稿レビュー）
              </span>
            </div>

            {productName && (
              <p className="text-xs text-gray-400 mt-2">
                「{productName}」をはじめとする公式コレクションの着用レビュー
              </p>
            )}
          </div>

          {/* UGCカード 4列横並びグリッド */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DUMMY_UGC_REVIEWS.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* 正方形のダミー写真 */}
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={`${item.username} の投稿写真`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* 右上 Instagram バッジ */}
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs text-gray-900 flex items-center justify-center shadow-xs">
                    <InstagramIcon className="w-3.5 h-3.5" />
                  </div>

                  {/* 左下 着用情報ピル */}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-xs text-[10px] font-medium text-white tracking-wide">
                      {item.heightAndSize}
                    </span>
                  </div>
                </div>

                {/* カードボディ（ユーザーアイコン・星5評価・ポジティブコメント） */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* ユーザー情報 ＆ 星5つ評価 */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="p-[1.5px] rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 flex-shrink-0">
                          <div
                            className={`w-7 h-7 rounded-full ${item.avatarBg} text-white border border-white flex items-center justify-center text-[10px] font-semibold`}
                          >
                            {item.userInitials}
                          </div>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-gray-900 truncate">
                            {item.username}
                          </p>
                          <p className="text-[10px] text-emerald-600 font-medium">
                            ✓ 購入者レビュー
                          </p>
                        </div>
                      </div>

                      {/* 星5つ評価 */}
                      <div
                        className="flex items-center text-amber-400 flex-shrink-0"
                        aria-label={`5段階評価中${item.rating}`}
                      >
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <StarIcon key={i} className="w-3.5 h-3.5" />
                        ))}
                      </div>
                    </div>

                    {/* ポジティブなダミーコメント */}
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {item.comment}
                    </p>
                  </div>

                  {/* ハッシュタグ ＆ 投稿日 */}
                  <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1 truncate">
                      {item.hashtags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] text-gray-400 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400 flex-shrink-0">
                      {item.postedAt}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

function StarIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
