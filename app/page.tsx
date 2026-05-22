"use client";

import Link from "next/link";
import { useLang } from "./context/LanguageContext";
import LangToggle from "./components/LangToggle";

export default function HomePage() {
  const { t } = useLang();

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f1a", color: "#e8e8f0", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Navbar */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 40px", borderBottom: "1px solid #2e2e50",
        position: "sticky", top: 0, zIndex: 10, background: "#0f0f1a"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #c9a96e, #8b6fae)" }} />
          <span style={{ fontSize: 20, fontWeight: 600 }}>Solra</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/knowledge" style={{ fontSize: 14, color: "#8888aa" }}>
            {t("Knowledge", "Pengetahuan")}
          </Link>
          <LangToggle />
          <Link href="/chat" style={{
            padding: "9px 22px", borderRadius: 999, fontSize: 14, fontWeight: 500,
            background: "#c9a96e", color: "#0f0f1a"
          }}>
            {t("Start Now", "Mulai")}
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "90px 24px 70px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px",
          borderRadius: 999, fontSize: 12, border: "1px solid #2e2e50",
          background: "#1a1a2e", color: "#8888aa", marginBottom: 36
        }}>
          <span style={{ color: "#c9a96e" }}>✦</span>
          {t("Deep self-discovery through real conversation", "Self-discovery mendalam melalui percakapan nyata")}
        </div>

        <h1 style={{ fontSize: "clamp(40px, 6vw, 68px)", fontWeight: 700, lineHeight: 1.1, maxWidth: 820, marginBottom: 28 }}>
          {t("You've always known.", "Kamu sudah selalu tahu.")}{" "}
          <span style={{ background: "linear-gradient(135deg, #c9a96e, #8b6fae)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {t("Let's find it together.", "Mari temukan bersama.")}
          </span>
        </h1>

        <p style={{ fontSize: 18, maxWidth: 560, lineHeight: 1.75, color: "#8888aa", marginBottom: 44 }}>
          {t(
            "Forget multiple-choice tests that reflect your mood that day. Solra has a real conversation with you — patient, deep, and honest — to help you understand who you actually are.",
            "Lupakan tes pilihan ganda yang hanya mencerminkan suasana hatimu hari itu. Solra mengajakmu bercakap-cakap secara nyata — sabar, mendalam, dan jujur — untuk membantu kamu memahami siapa dirimu sebenarnya."
          )}
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/chat" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "15px 36px", borderRadius: 999, fontWeight: 600, fontSize: 16,
            background: "linear-gradient(135deg, #c9a96e, #8b6fae)", color: "#0f0f1a",
            boxShadow: "0 0 32px rgba(201,169,110,0.3)"
          }}>
            {t("Begin Your Journey →", "Mulai Perjalananmu →")}
          </Link>
          <Link href="/knowledge" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "15px 36px", borderRadius: 999, fontWeight: 500, fontSize: 16,
            border: "1px solid #2e2e50", color: "#e8e8f0", background: "#1a1a2e"
          }}>
            {t("Learn More", "Pelajari Lebih Lanjut")}
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "70px 40px", maxWidth: 960, margin: "0 auto" }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: "center", marginBottom: 14 }}>
          {t("How Solra Works", "Bagaimana Solra Bekerja")}
        </h2>
        <p style={{ textAlign: "center", color: "#8888aa", marginBottom: 52, fontSize: 16 }}>
          {t("Two modes, one goal: knowing yourself better.", "Dua mode, satu tujuan: mengenal dirimu lebih baik.")}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          <div style={{ background: "#1a1a2e", borderRadius: 20, padding: 36, border: "1px solid #2e2e50" }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, marginBottom: 24, background: "rgba(201,169,110,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🧭</div>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 14 }}>{t("Self-Discovery", "Self-Discovery")}</h3>
            <p style={{ color: "#8888aa", lineHeight: 1.75, fontSize: 14, marginBottom: 20 }}>
              {t(
                "A structured conversation that digs into your values, strengths, motivations, and blind spots. At the end, you get a personal profile you can save and share.",
                "Percakapan terstruktur yang menggali nilai, kekuatan, motivasi, dan blind spot-mu. Di akhir, kamu mendapat profil personal yang bisa disimpan dan dibagikan."
              )}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                t("Values Mapping", "Peta Nilai"),
                t("Strength Analysis", "Analisis Kekuatan"),
                t("Career Direction", "Arah Karir"),
                t("Shareable Profile", "Profil Shareable")
              ].map(tag => (
                <span key={tag} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 999, background: "#252540", color: "#c9a96e" }}>{tag}</span>
              ))}
            </div>
          </div>

          <div style={{ background: "#1a1a2e", borderRadius: 20, padding: 36, border: "1px solid #2e2e50" }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, marginBottom: 24, background: "rgba(139,111,174,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🤍</div>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 14 }}>{t("Safe Space", "Safe Space")}</h3>
            <p style={{ color: "#8888aa", lineHeight: 1.75, fontSize: 14, marginBottom: 20 }}>
              {t(
                "Sometimes you just need someone to talk to. Solra listens without judgment, reflects back what it hears, and helps you process what you're going through.",
                "Kadang kamu hanya butuh seseorang untuk diajak bicara. Solra mendengarkan tanpa menghakimi dan membantumu memproses apa yang sedang kamu rasakan."
              )}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                t("Non-judgmental", "Tanpa Menghakimi"),
                t("Empathetic", "Empatik"),
                t("Supportive", "Suportif"),
                t("Always Available", "Selalu Ada")
              ].map(tag => (
                <span key={tag} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 999, background: "#252540", color: "#8b6fae" }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Different */}
      <section style={{ background: "#1a1a2e", padding: "70px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: "center", marginBottom: 14 }}>
            {t("Why Not Just Another Test?", "Kenapa Bukan Sekadar Tes Biasa?")}
          </h2>
          <p style={{ textAlign: "center", color: "#8888aa", marginBottom: 52, maxWidth: 520, margin: "0 auto 52px" }}>
            {t(
              "Standard personality tests capture a snapshot of your mood. Solra captures the pattern of your life.",
              "Tes kepribadian biasa hanya menangkap snapshot suasana hatimu. Solra menangkap pola hidupmu."
            )}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {[
              {
                icon: "🧠", color: "#6b9bb8",
                title: t("Adaptive Conversation", "Percakapan Adaptif"),
                desc: t(
                  "Solra follows up on your answers, digs deeper where it matters, and skips what's irrelevant to you.",
                  "Solra menggali lebih dalam pada jawaban yang penting dan melewati hal yang tidak relevan bagimu."
                )
              },
              {
                icon: "🧭", color: "#c9a96e",
                title: t("Pattern Recognition", "Pengenalan Pola"),
                desc: t(
                  "Instead of labeling you, Solra maps the consistent patterns across your life — decisions, values, and energy.",
                  "Alih-alih memberi label, Solra memetakan pola konsisten dalam hidupmu — keputusan, nilai, dan energi."
                )
              },
              {
                icon: "💜", color: "#8b6fae",
                title: t("Emotionally Aware", "Peka Emosi"),
                desc: t(
                  "The conversation adapts to how you're feeling. If you need to vent first, that's perfectly fine.",
                  "Percakapan menyesuaikan perasaanmu. Kalau perlu curhat dulu, itu sangat boleh."
                )
              }
            ].map(item => (
              <div key={item.title} style={{ background: "#0f0f1a", borderRadius: 16, padding: 26, border: "1px solid #2e2e50" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, marginBottom: 18, background: `${item.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{item.icon}</div>
                <h4 style={{ fontWeight: 600, marginBottom: 10, fontSize: 15 }}>{item.title}</h4>
                <p style={{ fontSize: 14, color: "#8888aa", lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "90px 24px" }}>
        <h2 style={{ fontSize: 38, fontWeight: 700, marginBottom: 18 }}>
          {t("Ready to meet yourself?", "Siap mengenal dirimu sendiri?")}
        </h2>
        <p style={{ color: "#8888aa", marginBottom: 36, maxWidth: 360, fontSize: 16 }}>
          {t("No sign-up required. Just start talking.", "Tidak perlu daftar. Langsung mulai bicara.")}
        </p>
        <Link href="/chat" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "16px 44px", borderRadius: 999, fontWeight: 600, fontSize: 18,
          background: "linear-gradient(135deg, #c9a96e, #8b6fae)", color: "#0f0f1a"
        }}>
          {t("Start for Free →", "Mulai Gratis →")}
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #2e2e50", padding: "22px 40px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #c9a96e, #8b6fae)" }} />
          <span style={{ fontSize: 14, fontWeight: 500 }}>Solra</span>
        </div>
        <p style={{ fontSize: 12, color: "#8888aa" }}>
          {t(
            "Solra is not a substitute for professional psychological or mental health support.",
            "Solra bukan pengganti dukungan psikologis atau kesehatan mental profesional."
          )}
        </p>
      </footer>
    </div>
  );
}
