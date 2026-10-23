"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeInView } from "@/components/FadeInView";

interface DailyMetric {
  label: string;
  views: number;
  sales: number;
}

const WEEKLY_METRICS: DailyMetric[] = [
  { label: "第1週", views: 9800, sales: 820000 },
  { label: "第2週", views: 11400, sales: 980000 },
  { label: "第3週", views: 12650, sales: 1140000 },
  { label: "第4週", views: 14400, sales: 1346000 },
];

const DAILY_METRICS: DailyMetric[] = [
  { label: "月", views: 1620, sales: 142000 },
  { label: "火", views: 1780, sales: 168000 },
  { label: "水", views: 1950, sales: 185000 },
  { label: "木", views: 1890, sales: 174000 },
  { label: "金", views: 2340, sales: 248000 },
  { label: "土", views: 2890, sales: 312000 },
  { label: "日", views: 2680, sales: 289000 },
];

const TOP_VIEWED_PRODUCTS = [
  {
    rank: 1,
    id: "1",
    name: "ウールブレンド オーバーサイズコート",
    category: "OUTERWEAR",
    price: "¥49,800",
    image: "/images/coat-black.jpg",
    views: 12480,
    cvr: "2.1%",
    barPercent: 100,
    badge: "閲覧急上昇・CVR要改善",
    badgeWarning: true,
  },
  {
    rank: 2,
    id: "5",
    name: "カシミヤブレンド クルーネックニット",
    category: "TOPS",
    price: "¥24,800",
    image: "/images/knit-charcoal.jpg",
    views: 8920,
    cvr: "4.3%",
    barPercent: 72,
    badge: "高CVR・好調",
    badgeWarning: false,
  },
  {
    rank: 3,
    id: "2",
    name: "オーガニックコットン Tシャツ",
    category: "TOPS",
    price: "¥7,800",
    image: "/images/tshirt-beige.jpg",
    views: 7340,
    cvr: "5.8%",
    barPercent: 59,
    badge: "リピート率 No.1",
    badgeWarning: false,
  },
];

const AI_RECOMMENDATIONS = [
  {
    id: "rec-1",
    priority: "HIGH IMPACT",
    title: "閲覧数1位商品の画像追加による購入率改善",
    message:
      "「ウールブレンド オーバーサイズコート」の商品の閲覧数が伸びていますが、購入に至っていません。着用シルエットや素材感が伝わる商品画像を追加することをお勧めします。",
    expectedEffect: "推定CVR改善: +1.2%（月間売上 +¥580,000 相当）",
    targetLink: "/products/1",
    targetLabel: "該当商品ページを確認",
  },
  {
    id: "rec-2",
    priority: "URGENT",
    title: "カート放棄率 65% の改善アプローチ",
    message:
      "決済直前での離脱が多く発生しています。サイズ選びの不安を解消する「AIチャットボット」および「購入者レビュー（UGC）」の併用で離脱防止が期待できます。",
    expectedEffect: "推定カート放棄率改善: 65% → 48%",
    targetLink: "/products",
    targetLabel: "商品一覧を確認",
  },
];

export default function AnalyticsDashboardPage() {
  const [chartPeriod, setChartPeriod] = useState<"weekly" | "daily">("weekly");

  const activeMetrics =
    chartPeriod === "weekly" ? WEEKLY_METRICS : DAILY_METRICS;
  const maxViews = Math.max(...activeMetrics.map((m) => m.views));

  return (
    <div className="pt-24 sm:pt-28 pb-24 px-4 bg-background-light min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ダッシュボードヘッダー */}
        <FadeInView>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-gray-200">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900 text-white text-[10px] font-semibold tracking-[0.2em] uppercase mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ANALYTICS & AI REPORT
              </div>
              <h1 className="text-2xl sm:text-3xl font-light tracking-wider text-gray-900">
                サイト分析・AI改善ダッシュボード
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                対象期間: 2026年10月1日 〜 10月23日（リアルタイム集計プレビュー）
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-medium text-gray-700 hover:text-gray-900 hover:border-gray-900 transition-colors shadow-2xs"
              >
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
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
                ショップ画面へ戻る
              </Link>
            </div>
          </div>
        </FadeInView>

        {/* 1. 今月のKPIサマリー（総アクセス数・CVR・売上金額） */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 総アクセス数 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                今月の総アクセス数
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                +18.4%
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
                48,250
              </span>
              <span className="text-xs text-gray-500 font-medium">PV</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              ユニークユーザー: 19,420 UU（前月比 +2,840）
            </p>
          </motion.div>

          {/* コンバージョン率 (CVR) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                コンバージョン率 (CVR)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                +0.6%
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
                3.42
              </span>
              <span className="text-lg text-gray-700 font-medium">%</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              購入件数: 198件 / アパレルEC業界平均（2.1%）を上回る水準
            </p>
          </motion.div>

          {/* 今月の売上金額 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                今月の売上金額
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                +24.1%
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
                ¥4,286,000
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              平均客単価: ¥21,646（前月比 +¥1,420）
            </p>
          </motion.div>
        </div>

        {/* 2. AIからの改善提案メッセージ（ハイライトセクション） */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="bg-gray-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.75}
                stroke="currentColor"
                className="w-5 h-5 text-amber-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"
                />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.25em] text-amber-300 uppercase">
                AI INSIGHTS & RECOMMENDATIONS
              </p>
              <h2 className="text-base sm:text-lg font-semibold">
                AIからのサイト改善提案
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {AI_RECOMMENDATIONS.map((rec) => (
              <div
                key={rec.id}
                className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px] font-bold tracking-wider">
                      {rec.priority}
                    </span>
                    <h3 className="text-sm font-semibold text-white">
                      {rec.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {rec.message}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-medium text-emerald-300">
                    {rec.expectedEffect}
                  </span>
                  <Link
                    href={rec.targetLink}
                    className="inline-flex items-center gap-1 text-xs font-medium text-white hover:text-amber-300 transition-colors"
                  >
                    {rec.targetLabel}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 3. アクセス＆売上推移グラフ + カート放棄率（ユーザー行動分析） */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 左: アクセス＆売上推移バーグラフ (7カラム) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    アクセス数・売上推移
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    期間ごとのPV数および売上金額の推移
                  </p>
                </div>

                {/* 期間切り替えボタン */}
                <div className="inline-flex rounded-lg bg-gray-100 p-1">
                  <button
                    type="button"
                    onClick={() => setChartPeriod("weekly")}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      chartPeriod === "weekly"
                        ? "bg-white text-gray-900 shadow-2xs"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    今月（週次）
                  </button>
                  <button
                    type="button"
                    onClick={() => setChartPeriod("daily")}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      chartPeriod === "daily"
                        ? "bg-white text-gray-900 shadow-2xs"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    直近7日間
                  </button>
                </div>
              </div>

              {/* バーグラフ領域 */}
              <div className="h-56 flex items-end justify-between gap-3 sm:gap-5 pt-6 px-2 border-b border-gray-100">
                {activeMetrics.map((item, idx) => {
                  const heightPercent = Math.round(
                    (item.views / maxViews) * 100
                  );
                  return (
                    <div
                      key={item.label}
                      className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
                    >
                      {/* 数値ツールチップ */}
                      <div className="text-[10px] font-medium text-gray-500 group-hover:text-gray-900 transition-colors">
                        {item.views.toLocaleString()}
                      </div>

                      {/* バー本体 */}
                      <div className="w-full max-w-[44px] bg-gray-100 rounded-t-lg h-40 flex items-end overflow-hidden">
                        <motion.div
                          key={`${chartPeriod}-${item.label}`}
                          initial={{ height: 0 }}
                          animate={{ height: `${heightPercent}%` }}
                          transition={{
                            duration: 0.5,
                            delay: idx * 0.06,
                            ease: "easeOut",
                          }}
                          className="w-full bg-gray-900 group-hover:bg-gray-700 rounded-t-lg transition-colors"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* X軸ラベル */}
              <div className="flex items-center justify-between gap-3 sm:gap-5 pt-3 px-2">
                {activeMetrics.map((item) => (
                  <div
                    key={item.label}
                    className="flex-1 text-center text-xs font-medium text-gray-500"
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>※ 週末（金〜日）にかけてアクセス・CVRともにピークに達する傾向があります</span>
              <span className="font-medium text-gray-900">単位: PV</span>
            </div>
          </motion.div>

          {/* 右: ユーザー行動分析「カート放棄率 65%（要改善）」 (5カラム) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="lg:col-span-5 bg-white border border-gray-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-6">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    ユーザーの行動分析（カゴ落ち分析）
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    カート投入後の離脱率と購入ファネル
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold">
                  要改善
                </span>
              </div>

              {/* ドーナツゲージ + カート放棄率 65% */}
              <div className="flex items-center gap-6 p-4 rounded-xl bg-gray-50 border border-gray-100 mb-6">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#E5E7EB"
                      strokeWidth="12"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#E11D48"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 40}
                      initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                      animate={{
                        strokeDashoffset: 2 * Math.PI * 40 * (1 - 0.65),
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-gray-900">65%</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-rose-600 uppercase tracking-wider">
                    CART ABANDONMENT
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 mt-0.5">
                    カート放棄率 65%（要改善）
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    カートに商品を入れた565人のうち、367人が購入完了前に離脱しています。
                  </p>
                </div>
              </div>

              {/* 購入ファネル内訳 */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">1. 商品詳細ページ閲覧</span>
                    <span className="font-semibold text-gray-900">
                      5,800 人 (100%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-900 rounded-full w-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">2. カートに追加</span>
                    <span className="font-semibold text-gray-900">
                      565 人 (9.7%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-700 rounded-full w-[45%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">3. 購入完了</span>
                    <span className="font-semibold text-emerald-700">
                      198 人 (カート投入者の 35%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full w-[18%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500">
              主な離脱要因: サイズ感の迷い・送料確認・ゲスト購入導線
            </div>
          </motion.div>
        </div>

        {/* 4. よく見られている商品 TOP3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.35 }}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xs"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                よく見られている商品 TOP3
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                今月アクセス数が集中している人気商品とコンバージョン率の比較
              </p>
            </div>
            <Link
              href="/products"
              className="text-xs font-medium text-gray-600 hover:text-gray-900 underline underline-offset-4"
            >
              全商品一覧を見る
            </Link>
          </div>

          <div className="space-y-4">
            {TOP_VIEWED_PRODUCTS.map((product, index) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group block p-4 rounded-xl border border-gray-100 hover:border-gray-300 hover:bg-gray-50/60 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* ランクバッジ + サムネイル */}
                  <div className="flex items-center gap-3.5 min-w-0 sm:w-80">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        product.rank === 1
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {product.rank}
                    </span>

                    <div className="w-12 h-14 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="48px"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] tracking-wider text-gray-400">
                        {product.category} · {product.price}
                      </p>
                      <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:underline">
                        {product.name}
                      </h3>
                      <span
                        className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium ${
                          product.badgeWarning
                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {product.badge}
                      </span>
                    </div>
                  </div>

                  {/* 横バーグラフ + 閲覧数・CVR */}
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">
                        閲覧数:{" "}
                        <strong className="text-gray-900">
                          {product.views.toLocaleString()} PV
                        </strong>
                      </span>
                      <span className="text-gray-500">
                        CVR:{" "}
                        <strong
                          className={
                            product.badgeWarning
                              ? "text-amber-700"
                              : "text-emerald-700"
                          }
                        >
                          {product.cvr}
                        </strong>
                      </span>
                    </div>

                    <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${product.barPercent}%` }}
                        transition={{
                          duration: 0.7,
                          delay: 0.2 + index * 0.1,
                          ease: "easeOut",
                        }}
                        className={`h-full rounded-full ${
                          product.rank === 1 ? "bg-gray-900" : "bg-gray-500"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
