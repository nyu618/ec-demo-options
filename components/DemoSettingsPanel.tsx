"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDemoOptions } from "@/context/DemoOptionsContext";

export function DemoSettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { isChatbotEnabled, toggleChatbot } = useDemoOptions();
  const panelRef = useRef<HTMLDivElement>(null);

  // パネル外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={panelRef} className="fixed bottom-4 left-4 z-50">
      {/* ポップアップ設定パネル */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-14 left-0 w-72 sm:w-80 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* パネルヘッダー */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50/60">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
                  DEMO SETTINGS
                </p>
                <h3 className="text-sm font-semibold text-gray-900 mt-0.5">
                  オプション機能シミュレーション
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="設定パネルを閉じる"
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
            </div>

            {/* オプションリスト */}
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      AIチャットボット機能
                    </span>
                    <span
                      className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                        isChatbotEnabled
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {isChatbotEnabled ? "ON" : "OFF"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    画面右下に自動応答チャットウィジェットを表示します
                  </p>
                </div>

                {/* トグルスイッチ */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={isChatbotEnabled}
                  aria-label="AIチャットボット機能の切り替え"
                  onClick={toggleChatbot}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isChatbotEnabled ? "bg-gray-900" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isChatbotEnabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* フッター注記 */}
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
              <p className="text-[11px] text-gray-400">
                ※ 商談用プレビュー：リアルタイムでUIを切り替えます
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 歯車アイコンボタン (Demo Settings) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Demo Settings"
        aria-expanded={isOpen}
        className={`group relative flex items-center gap-2 px-3.5 py-3 rounded-full border shadow-lg backdrop-blur-md transition-all duration-200 ${
          isOpen
            ? "bg-gray-900 text-white border-gray-900"
            : "bg-white/90 text-gray-900 border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-5 h-5 transition-transform duration-500 ${
            isOpen ? "rotate-90" : "group-hover:rotate-45"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        <span className="text-xs font-medium tracking-wider pr-0.5">
          Demo Settings
        </span>

        {/* オプション有効時のアクティブドット */}
        {isChatbotEnabled && (
          <span
            className={`w-2 h-2 rounded-full ${
              isOpen ? "bg-white" : "bg-gray-900 group-hover:bg-white"
            }`}
          />
        )}
      </button>
    </div>
  );
}
