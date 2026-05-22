"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ProfileCard, { parseProfile } from "../components/ProfileCard";
import { useLang } from "../context/LanguageContext";
import LangToggle from "../components/LangToggle";

type Mode = "select" | "discovery" | "safe-space";
interface Message { role: "user" | "assistant"; content: string; }

const BASE: React.CSSProperties = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  background: "#0f0f1a", color: "#e8e8f0"
};

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  // Strip profile markers from display — only show text before ##PROFILE_START##
  let displayContent = message.content;
  if (displayContent.includes("##PROFILE_START##")) {
    displayContent = displayContent.split("##PROFILE_START##")[0].trim();
    if (!displayContent) displayContent = "Sesi self-discovery kamu sudah selesai! Lihat profil kamu di bawah ya ✨";
  }

  const hasDisclaimer = displayContent.includes("⚠️ Disclaimer:");
  const parts = hasDisclaimer ? displayContent.split("---") : [displayContent];
  const mainContent = parts[0].trim();
  const disclaimer = hasDisclaimer ? parts.slice(1).join("---").trim() : null;

  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", marginBottom: 18, gap: 10, alignItems: "flex-start" }}>
      {!isUser && (
        <div style={{
          width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg, #c9a96e, #8b6fae)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, color: "#0f0f1a"
        }}>S</div>
      )}
      <div style={{ maxWidth: "75%" }}>
        <div style={{
          padding: "13px 18px", fontSize: 14, lineHeight: 1.75,
          background: isUser ? "linear-gradient(135deg, #c9a96e, #8b6fae)" : "#1a1a2e",
          color: isUser ? "#0f0f1a" : "#e8e8f0",
          borderRadius: 18,
          borderBottomRightRadius: isUser ? 4 : 18,
          borderBottomLeftRadius: isUser ? 18 : 4,
          border: isUser ? "none" : "1px solid #2e2e50"
        }}>
          <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{mainContent}</p>
        </div>
        {disclaimer && (
          <div style={{
            marginTop: 8, padding: "10px 14px", borderRadius: 10, fontSize: 12, lineHeight: 1.6,
            background: "rgba(255,200,50,0.05)", border: "1px solid rgba(255,200,50,0.15)", color: "#8888aa"
          }}>{disclaimer}</div>
        )}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 18, alignItems: "flex-start" }}>
      <div style={{
        width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
        background: "linear-gradient(135deg, #c9a96e, #8b6fae)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, fontWeight: 700, color: "#0f0f1a"
      }}>S</div>
      <div style={{ padding: "14px 20px", background: "#1a1a2e", borderRadius: 18, borderBottomLeftRadius: 4, border: "1px solid #2e2e50" }}>
        <div className="typing-indicator"><span /><span /><span /></div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const { t } = useLang();
  const [mode, setMode] = useState<Mode>("select");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<ReturnType<typeof parseProfile>>(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const startMode = async (selectedMode: "discovery" | "safe-space") => {
    if (selectedMode === "safe-space" && !disclaimerAccepted) { setShowDisclaimer(true); return; }
    setMode(selectedMode);
    const greeting = selectedMode === "discovery"
      ? "Hi, I'm Solra. I'm here to help you understand yourself a little better — not through a checklist, but through a real conversation.\n\nThere's no right or wrong answer here. Just be honest, even if your honest answer feels messy or contradictory.\n\nLet's start simple: what's going on in your life right now?"
      : "Hi, I'm here. This is a safe space — no judgment, no rushing.\n\nYou can talk about anything that's on your mind. I'll listen, reflect, and be honest with you when it's helpful.\n\nWhat's been weighing on you lately?";
    setMessages([{ role: "assistant", content: greeting }]);
  };

  const handleDisclaimerAccept = () => { setDisclaimerAccepted(true); setShowDisclaimer(false); startMode("safe-space"); };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, mode }),
      });
      const data = await res.json();
      if (data.error) {
        setMessages(prev => [...prev, { role: "assistant", content: `Error: ${data.error}` }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
        if (data.message.includes("##PROFILE_START##")) {
          const parsed = parseProfile(data.message);
          if (parsed) setProfileData(parsed);
        }
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Maaf, terjadi kesalahan koneksi. Coba lagi ya." }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const resetChat = () => { setMode("select"); setMessages([]); setInput(""); setProfileData(null); setShowProfileCard(false); };

  return (
    <div style={{ ...BASE, height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* Navbar — always fixed at top */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 28px", borderBottom: "1px solid #2e2e50",
        flexShrink: 0, zIndex: 10, background: "#0f0f1a"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Link href="/" style={{ color: "#8888aa", fontSize: 20, lineHeight: 1 }}>←</Link>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #c9a96e, #8b6fae)" }} />
            <span style={{ fontWeight: 600, fontSize: 16 }}>Solra</span>
          </div>
          {mode !== "select" && (
            <span style={{
              fontSize: 12, padding: "4px 12px", borderRadius: 999, fontWeight: 500,
              background: mode === "discovery" ? "rgba(201,169,110,0.15)" : "rgba(139,111,174,0.15)",
              color: mode === "discovery" ? "#c9a96e" : "#8b6fae"
            }}>
              {mode === "discovery" ? "Self-Discovery" : "Safe Space"}
            </span>
          )}
        </div>
        {mode !== "select" && (
          <button onClick={resetChat} style={{
            fontSize: 13, color: "#8888aa", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6, background: "none", border: "none"
          }}>↺ {t("New Session", "Sesi Baru")}</button>
        )}
      </nav>

      {mode === "select" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", marginBottom: 28, background: "linear-gradient(135deg, #c9a96e, #8b6fae)" }} />
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 10, textAlign: "center" }}>
            {t("How can Solra help you today?", "Bagaimana Solra bisa membantumu hari ini?")}
          </h1>
          <p style={{ color: "#8888aa", marginBottom: 44, textAlign: "center", maxWidth: 380, fontSize: 15 }}>
            {t("Choose the mode that fits what you need right now.", "Pilih mode yang sesuai dengan kebutuhanmu saat ini.")}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, width: "100%", maxWidth: 640 }}>
            {/* Self-Discovery */}
            <button onClick={() => startMode("discovery")} style={{
              background: "#1a1a2e", borderRadius: 20, padding: 32, border: "1px solid #2e2e50",
              textAlign: "left", cursor: "pointer", color: "#e8e8f0", transition: "transform 0.2s, border-color 0.2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.borderColor = "#c9a96e44"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.borderColor = "#2e2e50"; }}>
              <div style={{ width: 50, height: 50, borderRadius: 14, marginBottom: 20, background: "rgba(201,169,110,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🧭</div>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Self-Discovery</h2>
              <p style={{ fontSize: 14, color: "#8888aa", lineHeight: 1.7, marginBottom: 18 }}>
                {t(
                  "A deep conversation to understand your values, strengths, and direction. Get a shareable profile card at the end.",
                  "Percakapan mendalam untuk memahami nilai, kekuatan, dan arahmu. Dapatkan profil yang bisa dibagikan di akhir."
                )}
              </p>
              <p style={{ fontSize: 13, color: "#c9a96e" }}>✦ {t("Includes profile summary", "Termasuk ringkasan profil")}</p>
            </button>

            {/* Safe Space */}
            <button onClick={() => startMode("safe-space")} style={{
              background: "#1a1a2e", borderRadius: 20, padding: 32, border: "1px solid #2e2e50",
              textAlign: "left", cursor: "pointer", color: "#e8e8f0", transition: "transform 0.2s, border-color 0.2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.borderColor = "#8b6fae44"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.borderColor = "#2e2e50"; }}>
              <div style={{ width: 50, height: 50, borderRadius: 14, marginBottom: 20, background: "rgba(139,111,174,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🤍</div>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Safe Space</h2>
              <p style={{ fontSize: 14, color: "#8888aa", lineHeight: 1.7, marginBottom: 18 }}>
                {t(
                  "Just need someone to talk to? Solra listens without judgment and helps you process what you're going through.",
                  "Butuh teman bicara? Solra mendengarkan tanpa menghakimi dan membantumu memproses apa yang sedang kamu rasakan."
                )}
              </p>
              <p style={{ fontSize: 13, color: "#8888aa" }}>{t("No agenda, just presence.", "Tanpa agenda, hanya hadir.")}</p>
            </button>
          </div>

          <div style={{ marginTop: 28 }}>
            <LangToggle />
          </div>
        </div>
      )}

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}>
          <div style={{ maxWidth: 460, width: "100%", borderRadius: 22, padding: 36, background: "#1a1a2e", border: "1px solid #2e2e50" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", marginBottom: 22, background: "rgba(139,111,174,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🤍</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14 }}>
              {t("Before we begin", "Sebelum kita mulai")}
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: "#8888aa", marginBottom: 12 }}>
              {t(
                "Safe Space is designed to be a safe place for sharing and reflection. Solra is an AI that will listen and respond with empathy.",
                "Mode Safe Space dirancang untuk menjadi ruang aman untuk berbagi dan refleksi. Solra adalah AI yang akan mendengarkan dan merespons dengan empati."
              )}
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: "#e8e8f0", marginBottom: 16 }}>
              <strong>{t("Important:", "Penting:")}</strong> {t(
                "Solra is not a substitute for a licensed psychologist or mental health professional.",
                "Solra bukan pengganti psikolog atau tenaga kesehatan mental berlisensi."
              )}
            </p>
            <div style={{ padding: 16, borderRadius: 12, marginBottom: 24, background: "#0f0f1a", border: "1px solid #2e2e50" }}>
              <p style={{ fontSize: 13, color: "#e8e8f0", marginBottom: 6 }}>🇮🇩 Into The Light Indonesia: <strong>1500-454</strong></p>
              <p style={{ fontSize: 13, color: "#e8e8f0" }}>🌏 Crisis Text Line: <strong>Text HOME to 741741</strong></p>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setShowDisclaimer(false)} style={{ flex: 1, padding: "13px 0", borderRadius: 12, fontSize: 14, border: "1px solid #2e2e50", color: "#8888aa", background: "transparent", cursor: "pointer" }}>
                {t("Go Back", "Kembali")}
              </button>
              <button onClick={handleDisclaimerAccept} style={{ flex: 1, padding: "13px 0", borderRadius: 12, fontSize: 14, fontWeight: 600, background: "#8b6fae", color: "#fff", border: "none", cursor: "pointer" }}>
                {t("I Understand, Continue", "Saya Mengerti, Lanjutkan")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Interface */}
      {mode !== "select" && (
        <>
          <div style={{ flex: 1, overflowY: "auto", padding: "28px 20px", maxWidth: 760, width: "100%", margin: "0 auto", boxSizing: "border-box", minHeight: 0 }}>
            {messages.map((msg, i) => <MessageBubble key={i} message={msg} />)}
            {loading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {profileData && (
            <div style={{ padding: "0 20px 10px", maxWidth: 760, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
              <button onClick={() => setShowProfileCard(true)} style={{ width: "100%", padding: "13px 0", borderRadius: 12, fontSize: 14, fontWeight: 500, background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.3)", color: "#c9a96e", cursor: "pointer" }}>
                ✨ {t("View & Save Your Profile Card", "Lihat & Simpan Kartu Profilmu")}
              </button>
            </div>
          )}

          {/* Input */}
          <div style={{ borderTop: "1px solid #2e2e50", padding: "16px 20px", flexShrink: 0, maxWidth: 760, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={mode === "discovery"
                  ? t("Share your thoughts...", "Ceritakan pikiranmu...")
                  : t("Talk to me...", "Cerita aja dulu...")
                }
                rows={1}
                style={{
                  flex: 1, resize: "none", borderRadius: 16, padding: "13px 18px",
                  fontSize: 14, outline: "none", lineHeight: 1.6, maxHeight: 130,
                  background: "#1a1a2e", border: "1px solid #2e2e50",
                  color: "#e8e8f0", fontFamily: "inherit"
                }}
                onInput={e => {
                  const t = e.target as HTMLTextAreaElement;
                  t.style.height = "auto";
                  t.style.height = Math.min(t.scrollHeight, 130) + "px";
                }}
              />
              <button onClick={sendMessage} disabled={!input.trim() || loading} style={{
                width: 46, height: 46, borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg, #c9a96e, #8b6fae)",
                border: "none", cursor: "pointer", fontSize: 18,
                opacity: (!input.trim() || loading) ? 0.35 : 1,
                transition: "opacity 0.2s, transform 0.2s",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>➤</button>
            </div>
            <p style={{ fontSize: 11, color: "#8888aa", textAlign: "center", marginTop: 10 }}>
              {t("Enter to send · Shift+Enter for new line", "Enter untuk kirim · Shift+Enter untuk baris baru")}
            </p>
          </div>
        </>
      )}

      {showProfileCard && profileData && (
        <ProfileCard profile={profileData} onClose={() => setShowProfileCard(false)} />
      )}
    </div>
  );
}
