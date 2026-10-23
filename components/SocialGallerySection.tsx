"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useDemoOptions } from "@/context/DemoOptionsContext";

interface SelectedPlatformModal {
  platform: "instagram" | "x";
  name: string;
  handle: string;
  url: string;
}

export function SocialGallerySection() {
  const { isSocialEnabled } = useDemoOptions();
  const [selectedModal, setSelectedModal] =
    useState<SelectedPlatformModal | null>(null);

  const openInstagramLink = () => {
    setSelectedModal({
      platform: "instagram",
      name: "Instagram",
      handle: "@demo_official_jp",
      url: "https://instagram.com/demo_official_jp",
    });
  };

  const openXLink = () => {
    setSelectedModal({
      platform: "x",
      name: "X (旧Twitter)",
      handle: "@demo_store_jp",
      url: "https://x.com/demo_store_jp",
    });
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
          <div className="max-w-5xl mx-auto">
            {/* セクションヘッダー */}
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-xs tracking-[0.4em] text-text-muted mb-3 uppercase">
                SOCIAL MEDIA
              </p>
              <h2 className="text-2xl sm:text-3xl font-light tracking-wider text-accent">
                Follow Us on SNS
              </h2>
              <p className="text-sm text-gray-500 mt-3 max-w-xl mx-auto">
                最新コレクションやスタイリング、店舗の最新情報を公式SNSで発信しています
              </p>
            </div>

            {/* Instagram (左) ＆ X (右) の1投稿ずつ2カラムグリッド */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* ==========================================
                  1. Instagram ネイティブ埋め込み風デザイン
                 ========================================== */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                onClick={openInstagramLink}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openInstagramLink();
                  }
                }}
                aria-label="公式Instagramアカウントを開く"
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer text-left"
              >
                {/* Instagram ヘッダー */}
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    {/* Instagram ストーリーグラデーションリング */}
                    <div className="p-[2px] rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600">
                      <div className="w-8 h-8 rounded-full bg-gray-900 text-white border-2 border-white flex items-center justify-center text-[9px] font-bold tracking-wider">
                        DEMO
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-semibold text-gray-900">
                          demo_official_jp
                        </span>
                        <VerifiedBadge className="w-3.5 h-3.5 text-sky-500" />
                      </div>
                      <p className="text-[11px] text-gray-500">
                        Omotesando, Tokyo
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-semibold text-sky-500 group-hover:text-sky-600 transition-colors">
                      プロフィールを表示
                    </span>
                    <InstagramIcon className="w-5 h-5 text-gray-800" />
                  </div>
                </div>

                {/* Instagram 正方形メディアプレビュー（リール動画風） */}
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  <Image
                    src="/images/coat-black.jpg"
                    alt="Instagram 投稿プレビュー"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors" />

                  {/* 右上 リールアイコン */}
                  <div className="absolute top-3 right-3 text-white drop-shadow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
                    </svg>
                  </div>

                  {/* 中央 再生ボタン */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-xs border border-white/40 text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 translate-x-0.5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* 左下 人物タグアイコン */}
                  <div className="absolute bottom-3 left-3 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                    </svg>
                  </div>
                </div>

                {/* Instagram 特有のアクションバー (♡ 💬 ✈️ + 🔖) */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3 text-gray-900">
                    <div className="flex items-center gap-4">
                      {/* ハート */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.75}
                        stroke="currentColor"
                        className="w-6 h-6 hover:text-rose-500 transition-colors"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                      {/* コメント */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.75}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                        />
                      </svg>
                      {/* シェア（紙飛行機） */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.75}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                        />
                      </svg>
                    </div>

                    {/* ブックマーク（保存） */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.75}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                      />
                    </svg>
                  </div>

                  {/* いいね数 */}
                  <p className="text-xs font-bold text-gray-900 mb-1.5">
                    「いいね！」1,240件
                  </p>

                  {/* アカウント名＋キャプション */}
                  <p className="text-xs text-gray-800 leading-relaxed">
                    <span className="font-bold mr-1.5">demo_official_jp</span>
                    【2026 AW COLLECTION】上質なウールブレンド素材を使用したオーバーサイズコート。動くたびに美しいドレープを描くシルエットを動画でご覧ください。{" "}
                    <span className="text-sky-700">
                      #DEMO #AutumnWinter #OversizedCoat #MinimalStyle
                    </span>
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    コメント32件をすべて見る
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
                    2時間前
                  </p>
                </div>

                {/* Instagram フッターリンク */}
                <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-sky-500 group-hover:bg-gray-50 transition-colors">
                  <span>Instagramでさらに見る</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </div>
              </motion.article>

              {/* ==========================================
                  2. X (旧Twitter) ネイティブ埋め込み風デザイン
                 ========================================== */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                onClick={openXLink}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openXLink();
                  }
                }}
                aria-label="公式Xアカウントを開く"
                className="group bg-white border border-gray-200 rounded-2xl p-5 shadow-xs hover:shadow-xl hover:bg-gray-50/40 transition-all duration-300 cursor-pointer text-left"
              >
                {/* X ヘッダー */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold tracking-wider">
                      DEMO
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-gray-900">
                          DEMO Official
                        </span>
                        <VerifiedBadge className="w-4 h-4 text-sky-500" />
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-gray-500">@demo_store_jp</span>
                        <span className="text-gray-300">·</span>
                        <span className="font-bold text-sky-500 group-hover:underline">
                          フォローする
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* X ロゴ */}
                  <XIcon className="w-5 h-5 text-gray-900" />
                </div>

                {/* X ポスト本文（画像より上にテキストが来るX特有のレイアウト） */}
                <div className="mt-4 text-[14px] text-gray-900 leading-relaxed space-y-2">
                  <p>
                    表参道フラッグシップストアにて、2026年秋冬コレクションの先行展示を開始いたしました。
                  </p>
                  <p>
                    週末限定のスペシャルムービーも公開中です。ぜひ店頭およびオンラインストアにてご覧ください。
                  </p>
                  <p className="text-sky-500">
                    #DEMO #Omotesando #2026AW #PopUpStore
                  </p>
                </div>

                {/* X 角丸メディア添付ボックス */}
                <div className="mt-3.5 relative aspect-16/10 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100">
                  <Image
                    src="/images/about-hero.jpg"
                    alt="X 投稿メディアプレビュー"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors" />

                  {/* 中央 X風ブルー丸再生ボタン */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-13 h-13 rounded-full bg-sky-500/95 text-white border-2 border-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 translate-x-0.5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* 左下 再生時間バッジ */}
                  <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/75 text-white text-[11px] font-medium">
                    0:45
                  </div>
                </div>

                {/* X タイムスタンプ＆インプレッション */}
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                  <span>午後7:30 · 2026年10月23日</span>
                  <span>·</span>
                  <span>
                    <strong className="text-gray-800">2.4万</strong> 件の表示
                  </span>
                </div>

                {/* X アクションバー（リプライ・リポスト・いいね・シェア） */}
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  {/* リプライ */}
                  <div className="flex items-center gap-1.5 group-hover:text-sky-500 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.75}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                      />
                    </svg>
                    <span>14</span>
                  </div>

                  {/* リポスト */}
                  <div className="flex items-center gap-1.5 group-hover:text-emerald-500 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.75}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                      />
                    </svg>
                    <span>128</span>
                  </div>

                  {/* いいね */}
                  <div className="flex items-center gap-1.5 group-hover:text-rose-500 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.75}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                    <span>645</span>
                  </div>

                  {/* 共有 */}
                  <div className="flex items-center gap-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.75}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                      />
                    </svg>
                  </div>
                </div>

                {/* X 埋め込み特有の「X で続きを読む」ピルボタン */}
                <div className="mt-3.5">
                  <div className="w-full py-2 rounded-full border border-gray-300 text-center text-xs font-bold text-gray-900 group-hover:bg-gray-100 transition-colors">
                    X でポストを表示
                  </div>
                </div>
              </motion.article>
            </div>
          </div>

          {/* ==========================================
              SNSアカウント遷移デモ用ポップアップモーダル
             ========================================== */}
          <AnimatePresence>
            {selectedModal && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedModal(null)}
                  className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 12 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 z-50 text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-900 text-white flex items-center justify-center">
                    {selectedModal.platform === "instagram" ? (
                      <InstagramIcon className="w-6 h-6" />
                    ) : (
                      <XIcon className="w-5 h-5" />
                    )}
                  </div>

                  <p className="text-[11px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
                    EXTERNAL LINK PREVIEW
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900 mt-1">
                    公式 {selectedModal.name} アカウントへ遷移
                  </h3>
                  <p className="text-sm font-medium text-gray-700 mt-1">
                    {selectedModal.handle}
                  </p>

                  <div className="mt-3 py-2 px-3 bg-gray-50 rounded-lg border border-gray-100 text-xs text-gray-500 font-mono truncate">
                    {selectedModal.url}
                  </div>

                  <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                    本番環境ではクリック時に公式 {selectedModal.name}{" "}
                    の投稿・プロフィールページが新しいタブで開きます。
                    <br />
                    <span className="text-gray-400">
                      （※現在はデモ環境のため外部遷移は行われません）
                    </span>
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedModal(null)}
                    className="mt-6 w-full bg-gray-900 text-white py-3 rounded-xl text-xs font-semibold tracking-wider hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    閉じる
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

function VerifiedBadge({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
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
