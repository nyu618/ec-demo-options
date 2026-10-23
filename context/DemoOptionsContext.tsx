"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

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
}

const DemoOptionsContext = createContext<DemoOptionsContextType | undefined>(undefined);

export function DemoOptionsProvider({ children }: { children: ReactNode }) {
  const [isChatbotEnabled, setIsChatbotEnabled] = useState<boolean>(false);
  const [isSearchEnabled, setIsSearchEnabled] = useState<boolean>(false);
  const [isSocialEnabled, setIsSocialEnabled] = useState<boolean>(false);

  const toggleChatbot = useCallback(() => {
    setIsChatbotEnabled((prev) => !prev);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchEnabled((prev) => !prev);
  }, []);

  const toggleSocial = useCallback(() => {
    setIsSocialEnabled((prev) => !prev);
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
