import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { ConceptSection } from "@/components/ConceptSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { SocialGallerySection } from "@/components/SocialGallerySection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ConceptSection />
      <FeaturedProducts />
      <SocialGallerySection />

      {/* フッター */}
      <footer className="bg-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* ブランド情報 */}
            <div>
              <h3 className="text-xl font-bold tracking-[0.15em] mb-4">DEMO</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                上質なライフスタイルを提案する
                <br />
                プレミアムセレクトショップ
              </p>
            </div>

            {/* リンク */}
            <div>
              <h4 className="text-xs tracking-[0.3em] text-white/40 mb-4">NAVIGATION</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-sm text-white/70 hover:text-white transition-colors">
                    ホーム
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-white/70 hover:text-white transition-colors">
                    私たちについて
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-sm text-white/70 hover:text-white transition-colors">
                    商品一覧
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-sm text-white/70 hover:text-white transition-colors">
                    よくある質問
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-white/70 hover:text-white transition-colors">
                    お問い合わせ
                  </Link>
                </li>
              </ul>
            </div>

            {/* 法的情報 */}
            <div>
              <h4 className="text-xs tracking-[0.3em] text-white/40 mb-4">LEGAL</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/legal/tokusho" className="text-sm text-white/70 hover:text-white transition-colors">
                    特定商取引法に基づく表記
                  </Link>
                </li>
                <li>
                  <Link href="/legal/terms" className="text-sm text-white/70 hover:text-white transition-colors">
                    利用規約
                  </Link>
                </li>
                <li>
                  <Link href="/legal/privacy" className="text-sm text-white/70 hover:text-white transition-colors">
                    プライバシーポリシー
                  </Link>
                </li>
              </ul>
            </div>

            {/* お問い合わせ */}
            <div>
              <h4 className="text-xs tracking-[0.3em] text-white/40 mb-4">CONTACT</h4>
              <ul className="space-y-3">
                <li className="text-sm text-white/70">info@demo-store.jp</li>
                <li className="text-sm text-white/70">03-1234-5678</li>
                <li className="text-sm text-white/70">10:00 - 20:00（不定休）</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-xs text-white/30 text-center tracking-wider">
              © 2026. DEMO All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
