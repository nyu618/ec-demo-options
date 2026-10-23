"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface DemoOptionsContextType {
  isChatbotEnabled: boolean;
  setIsChatbotEnabled: (enabled: boolean) => void;
  toggleChatbot: () => void;
}

const DemoOptionsContext = createContext<DemoOptionsContextType | undefined>(undefined);

export function DemoOptionsProvider({ children }: { children: ReactNode }) {
  const [isChatbotEnabled, setIsChatbotEnabled] = useState<boolean>(false);

  const toggleChatbot = useCallback(() => {
    setIsChatbotEnabled((prev) => !prev);
  }, []);

  return (
    <DemoOptionsContext.Provider
      value={{
        isChatbotEnabled,
        setIsChatbotEnabled,
        toggleChatbot,
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
