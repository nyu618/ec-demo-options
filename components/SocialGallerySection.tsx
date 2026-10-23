"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useDemoOptions } from "@/context/DemoOptionsContext";

interface SocialPost {
  id: string;
  platform: "instagram" | "x";
  authorName: string;
  handle: string;
  date: string;
  image: string;
  isVideo?: boolean;
  videoDuration?: string;
  caption: string;
  hashtags: string[];
  likes: number;
  comments: number;
  reposts?: number;
}

const DUMMY_SOCIAL_POSTS: SocialPost[] = [
  {
    id: "ig-1",
    platform: "instagram",
    authorName: "DEMO Official",
    handle: "@demo_official_jp",
    date: "2時間前",
    image: "/images/coat-black.jpg",
    isVideo: true,
    videoDuration: "0:28",
    caption:
      "【2026 AW COLLECTION】上質なウールブレンド素材を使用したオーバーサイズコート。動くたびに美しいドレープを描くシルエットを動画でご覧ください。",
    hashtags: ["#DEMO", "#AutumnWinter", "#OversizedCoat", "#MinimalStyle"],
    likes: 1240,
    comments: 32,
  },
  {
    id: "ig-2",
    platform: "instagram",
    authorName: "DEMO Official",
    handle: "@demo_official_jp",
    date: "1日前",
    image: "/images/knit-bordeaux.jpg",
    isVideo: false,
    caption:
      "カシミヤをブレンドした極上の肌触り。深みのあるボルドーカラーが冬の装いに上品なアクセントを添えます。",
    hashtags: ["#DEMO", "#CashmereKnit", "#NewArrival"],
    likes: 892,
    comments: 18,
  },
  {
    id: "x-1",
    platform: "x",
    authorName: "DEMO Official",
    handle: "@demo_store_jp",
    date: "3時間前",
    image: "/images/about-hero.jpg",
    isVideo: true,
    videoDuration: "0:45",
    caption:
      "表参道フラッグシップストアにて、2026年秋冬コレクションの先行展示を開始いたしました。週末限定のスペシャルムービーも公開中です。",
    hashtags: ["#DEMO", "#Omotesando", "#PopUpStore"],
    likes: 645,
    comments: 14,
    reposts: 128,
  },
  {
    id: "x-2",
    platform: "x",
    authorName: "DEMO Official",
    handle: "@demo_store_jp",
    date: "2日前",
    image: "/images/tshirt-beige.jpg",
    isVideo: false,
    caption:
      "【再入荷のお知らせ】完売していたオーガニックコットンTシャツ（ベージュ / ブラック）が全サイズ再入荷いたしました。オンラインストアよりご注文いただけます。",
    hashtags: ["#DEMO", "#Restock", "#OrganicCotton"],
    likes: 412,
    comments: 9,
    reposts: 84,
  },
];

export function SocialGallerySection() {
  const { isSocialEnabled } = useDemoOptions();
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);

  const toggleLike = (id: string) => {
    setLikedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <AnimatePresence>
      {isSocialEnabled && (
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="py-20 sm:py-28 px-4 bg-white border-t border-gray-100"
        >
          <div className="max-w-7xl mx-auto">
            {/* セクションヘッダー */}
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-xs tracking-[0.4em] text-text-muted mb-3 uppercase">
                SOCIAL MEDIA
              </p>
              <h2 className="text-2xl sm:text-3xl font-light tracking-wider text-accent">
                Follow Us on SNS
              </h2>
              <p className="text-sm text-gray-500 mt-3 max-w-xl mx-auto">
                最新コレクションのスタイリング動画や再入荷情報を公式 Instagram・X にてリアルタイムで発信しています
              </p>

              {/* 公式アカウントバッジ */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800">
                  <InstagramIcon className="w-4 h-4" />
                  Instagram @demo_official_jp
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800">
                  <XIcon className="w-3.5 h-3.5" />
                  X @demo_store_jp
                </span>
              </div>
            </div>

            {/* SNS埋め込み風カードグリッド */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
              {DUMMY_SOCIAL_POSTS.map((post, index) => {
                const isLiked = Boolean(likedIds[post.id]);
                const isPlaying = activePreviewId === post.id;

                return (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    {/* カードヘッダー */}
                    <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-[10px] font-bold tracking-wider flex-shrink-0">
                          DEMO
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-semibold text-gray-900 truncate">
                              {post.authorName}
                            </span>
                            {/* 認証バッジ */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-3.5 h-3.5 text-gray-900 flex-shrink-0"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <p className="text-[11px] text-gray-400 truncate">
                            {post.handle}
                          </p>
                        </div>
                      </div>

                      {/* プラットフォームアイコン */}
                      <div className="text-gray-700 flex-shrink-0">
                        {post.platform === "instagram" ? (
                          <InstagramIcon className="w-4 h-4" />
                        ) : (
                          <XIcon className="w-4 h-4" />
                        )}
                      </div>
                    </div>

                    {/* メディアプレビュー領域 */}
                    <div
                      onClick={() =>
                        post.isVideo &&
                        setActivePreviewId(isPlaying ? null : post.id)
                      }
                      className={`relative aspect-4/5 bg-gray-100 overflow-hidden ${
                        post.isVideo ? "cursor-pointer" : ""
                      }`}
                    >
                      <Image
                        src={post.image}
                        alt={post.caption}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className={`object-cover transition-transform duration-700 ${
                          isPlaying
                            ? "scale-105 brightness-95"
                            : "group-hover:scale-105"
                        }`}
                      />

                      {/* グラデーションオーバーレイ */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />

                      {/* 動画再生ボタンアイコン (isVideo時) */}
                      {post.isVideo && (
                        <>
                          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium tracking-wider flex items-center gap-1">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isPlaying
                                  ? "bg-red-400 animate-pulse"
                                  : "bg-white"
                              }`}
                            />
                            {isPlaying ? "PLAYING" : post.videoDuration}
                          </div>

                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className={`w-13 h-13 rounded-full backdrop-blur-md border flex items-center justify-center transition-colors shadow-lg ${
                                isPlaying
                                  ? "bg-black/70 border-white/40 text-white"
                                  : "bg-white/85 border-white text-gray-900 group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900"
                              }`}
                            >
                              {isPlaying ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-5 h-5 translate-x-0.5"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </motion.div>
                          </div>
                        </>
                      )}

                      {/* プラットフォームラベルバッジ */}
                      <div className="absolute bottom-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-semibold tracking-wider text-gray-900 uppercase">
                          {post.platform === "instagram"
                            ? post.isVideo
                              ? "Instagram Reel"
                              : "Instagram Post"
                            : "X Post"}
                        </span>
                      </div>
                    </div>

                    {/* コンテンツ＆エンゲージメント領域 */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <p className="text-xs text-gray-700 leading-relaxed line-clamp-3">
                          {post.caption}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {post.hashtags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-medium text-gray-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* フッター（いいね・コメント・日時） */}
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => toggleLike(post.id)}
                            aria-label="いいね"
                            className={`flex items-center gap-1 transition-colors cursor-pointer ${
                              isLiked
                                ? "text-rose-500 font-medium"
                                : "hover:text-gray-900"
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill={isLiked ? "currentColor" : "none"}
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                              />
                            </svg>
                            <span>
                              {(post.likes + (isLiked ? 1 : 0)).toLocaleString()}
                            </span>
                          </button>

                          <div className="flex items-center gap-1">
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
                                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                              />
                            </svg>
                            <span>{post.comments}</span>
                          </div>

                          {post.reposts !== undefined && (
                            <div className="flex items-center gap-1">
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
                                  d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                                />
                              </svg>
                              <span>{post.reposts}</span>
                            </div>
                          )}
                        </div>

                        <span className="text-[11px] text-gray-400">
                          {post.date}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
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

function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
