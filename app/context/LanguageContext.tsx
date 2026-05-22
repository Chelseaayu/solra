"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "en" | "id";

interface LangContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (en: string, id: string) => string;
}

const LanguageContext = createContext<LangContextType>({
  lang: "id",
  toggleLang: () => {},
  t: (en, id) => id,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("id");

  useEffect(() => {
    const saved = localStorage.getItem("solra_lang") as Lang;
    if (saved === "en" || saved === "id") setLang(saved);
  }, []);

  const toggleLang = () => {
    const next: Lang = lang === "id" ? "en" : "id";
    setLang(next);
    localStorage.setItem("solra_lang", next);
  };

  const t = (en: string, id: string) => (lang === "en" ? en : id);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
