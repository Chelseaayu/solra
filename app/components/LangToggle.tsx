"use client";

import { useLang } from "../context/LanguageContext";

export default function LangToggle() {
  const { lang, toggleLang } = useLang();

  return (
    <button
      onClick={toggleLang}
      style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "6px 14px", borderRadius: 999, fontSize: 13, fontWeight: 500,
        border: "1px solid #2e2e50", background: "#1a1a2e",
        color: "#8888aa", cursor: "pointer", transition: "all 0.2s",
        fontFamily: "inherit"
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "#c9a96e55"; e.currentTarget.style.color = "#c9a96e"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "#2e2e50"; e.currentTarget.style.color = "#8888aa"; }}
      title={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
    >
      <span style={{ fontSize: 14 }}>{lang === "id" ? "🇮🇩" : "🇬🇧"}</span>
      {lang === "id" ? "EN" : "ID"}
    </button>
  );
}
