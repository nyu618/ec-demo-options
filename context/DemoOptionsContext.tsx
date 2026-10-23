"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Category } from "@/types";

interface DemoOptionsContextType {
  isChatbotEnabled: boolean;
  setIsChatbotEnabled: (enabled: boolean) => void;
  toggleChatbot: () => void;
  isSearchEnabled: boolean;
  setIsSearchEnabled: (enabled: boolean) => void;
  toggleSearch: () => void;
  isSocialEnabled: boolean;
  setIsSocialEnabled: (enabled: boolean) => void;
  toggleSocial: () => void;
  isUgcEnabled: boolean;
  setIsUgcEnabled: (enabled: boolean) => void;
  toggleUgc: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
}

const DemoOptionsContext = createContext<DemoOptionsContextType | undefined>(undefined);

export function DemoOptionsProvider({ children }: { children: ReactNode }) {
  const [isChatbotEnabled, setIsChatbotEnabled] = useState<boolean>(false);
  const [isSearchEnabled, setIsSearchEnabled] = useState<boolean>(false);
  const [isSocialEnabled, setIsSocialEnabled] = useState<boolean>(false);
  const [isUgcEnabled, setIsUgcEnabled] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  const toggleChatbot = useCallback(() => {
    setIsChatbotEnabled((prev) => !prev);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchEnabled((prev) => !prev);
  }, []);

  const toggleSocial = useCallback(() => {
    setIsSocialEnabled((prev) => !prev);
  }, []);

  const toggleUgc = useCallback(() => {
    setIsUgcEnabled((prev) => !prev);
  }, []);

  return (
    <DemoOptionsContext.Provider
      value={{
        isChatbotEnabled,
        setIsChatbotEnabled,
        toggleChatbot,
        isSearchEnabled,
        setIsSearchEnabled,
        toggleSearch,
        isSocialEnabled,
        setIsSocialEnabled,
        toggleSocial,
        isUgcEnabled,
        setIsUgcEnabled,
        toggleUgc,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </DemoOptionsContext.Provider>
  );
}

export function useDemoOptions() {
  const context = useContext(DemoOptionsContext);
  if (!context) {
    throw new Error("useDemoOptions must be used within a DemoOptionsProvider");
  }
  return context;
}
