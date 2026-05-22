"use client";

import { useRef } from "react";
import { Download, X } from "lucide-react";

interface ProfileData {
  archetype: string;
  tagline: string;
  coreDriver: string;
  strengths: string[];
  growthEdge: string;
  environment: string;
  directions: { title: string; reason: string }[];
  quote: string;
}

interface ProfileCardProps {
  profile: ProfileData;
  onClose: () => void;
}

export function parseProfile(raw: string): ProfileData | null {
  try {
    const startMarker = "##PROFILE_START##";
    const endMarker = "##PROFILE_END##";
    const start = raw.indexOf(startMarker);
    const end = raw.indexOf(endMarker);
    if (start === -1 || end === -1) return null;

    const content = raw.slice(start + startMarker.length, end).trim();
    const lines = content.split("\n").filter((l) => l.trim());

    const get = (key: string) => {
      const line = lines.find((l) => l.startsWith(key + " |"));
      return line ? line.split("|").slice(1).join("|").trim() : "";
    };

    const archetypeLine = lines.find((l) => l.includes("NAME_PLACEHOLDER"));
    const archetype = archetypeLine
      ? archetypeLine.split("|").slice(1).join("|").trim()
      : "Your Unique Self";

    const strengthsRaw = get("STRENGTHS");
    const strengths = strengthsRaw.split("|").map((s) => s.trim()).filter(Boolean);

    const directions: { title: string; reason: string }[] = [];
    ["DIRECTION_1", "DIRECTION_2", "DIRECTION_3"].forEach((key) => {
      const val = get(key);
      if (val) {
        const parts = val.split("|");
        directions.push({ title: parts[0]?.trim() || "", reason: parts[1]?.trim() || "" });
      }
    });

    return {
      archetype,
      tagline: get("TAGLINE"),
      coreDriver: get("CORE_DRIVER"),
      strengths,
      growthEdge: get("GROWTH_EDGE"),
      environment: get("ENVIRONMENT"),
      directions,
      quote: get("QUOTE"),
    };
  } catch {
    return null;
  }
}

export default function ProfileCard({ profile, onClose }: ProfileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: "#0f0f1a",
      scale: 2,
      useCORS: true,
    });
    const link = document.createElement("a");
    link.download = "solra-profile.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}>
      <div className="w-full max-w-2xl max-h-screen overflow-y-auto">
        {/* Action buttons */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>
            Your Solra Profile
          </span>
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
              style={{ background: "var(--primary)", color: "#0f0f1a" }}
            >
              <Download size={14} /> Save as PNG
            </button>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-9 h-9 rounded-full border transition-all hover:opacity-70"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Card — this gets captured as PNG */}
        <div
          ref={cardRef}
          style={{
            background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16162a 100%)",
            borderRadius: "24px",
            padding: "40px",
            border: "1px solid rgba(201,169,110,0.3)",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "32px", textAlign: "center" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "20px",
              padding: "6px 16px",
              borderRadius: "100px",
              background: "rgba(201,169,110,0.1)",
              border: "1px solid rgba(201,169,110,0.3)"
            }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#c9a96e" }} />
              <span style={{ color: "#c9a96e", fontSize: "12px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>
                Solra Profile
              </span>
            </div>

            <h1 style={{ color: "#e8e8f0", fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>
              {profile.archetype}
            </h1>
            <p style={{ color: "#8b6fae", fontSize: "16px", fontStyle: "italic", lineHeight: 1.5 }}>
              {profile.tagline}
            </p>
          </div>

          {/* Core Driver */}
          <div style={{
            background: "rgba(201,169,110,0.08)",
            border: "1px solid rgba(201,169,110,0.2)",
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "20px"
          }}>
            <div style={{ color: "#c9a96e", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
              Core Driver
            </div>
            <p style={{ color: "#e8e8f0", fontSize: "14px", lineHeight: 1.7 }}>{profile.coreDriver}</p>
          </div>

          {/* Strengths */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ color: "#8888aa", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px" }}>
              Strengths
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {profile.strengths.map((s, i) => (
                <span key={i} style={{
                  padding: "6px 14px",
                  borderRadius: "100px",
                  background: "rgba(139,111,174,0.15)",
                  border: "1px solid rgba(139,111,174,0.3)",
                  color: "#c4a8e8",
                  fontSize: "13px"
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Growth Edge */}
          <div style={{
            background: "rgba(107,155,184,0.08)",
            border: "1px solid rgba(107,155,184,0.2)",
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "20px"
          }}>
            <div style={{ color: "#6b9bb8", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
              Growth Edge
            </div>
            <p style={{ color: "#e8e8f0", fontSize: "14px", lineHeight: 1.7 }}>{profile.growthEdge}</p>
          </div>

          {/* Best Environment */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ color: "#8888aa", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
              Best Environment
            </div>
            <p style={{ color: "#e8e8f0", fontSize: "14px", lineHeight: 1.7 }}>{profile.environment}</p>
          </div>

          {/* Directions */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ color: "#8888aa", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px" }}>
              Paths Worth Exploring
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {profile.directions.map((d, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "14px 16px",
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start"
                }}>
                  <span style={{
                    minWidth: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "rgba(201,169,110,0.2)",
                    color: "#c9a96e",
                    fontSize: "12px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>{i + 1}</span>
                  <div>
                    <div style={{ color: "#e8e8f0", fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>{d.title}</div>
                    <div style={{ color: "#8888aa", fontSize: "13px", lineHeight: 1.5 }}>{d.reason}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "24px",
            textAlign: "center"
          }}>
            <p style={{ color: "#8888aa", fontSize: "13px", fontStyle: "italic", lineHeight: 1.7 }}>
              &ldquo;{profile.quote}&rdquo;
            </p>
          </div>

          {/* Branding */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <span style={{ color: "rgba(201,169,110,0.4)", fontSize: "11px", letterSpacing: "2px" }}>
              SOLRA · solra.app
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
