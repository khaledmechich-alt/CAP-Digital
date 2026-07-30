import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          backgroundColor: "#0b0b0b",
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(59,130,246,0.25), transparent 60%)",
          color: "#fafafa",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 88,
              height: 88,
              borderRadius: 22,
              backgroundColor: "#3b82f6",
              color: "#ffffff",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            CAP
          </div>
          <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1 }}>
            DIGITAL
          </div>
        </div>
        <div
          style={{
            fontSize: 34,
            color: "#a1a1aa",
            maxWidth: 820,
            textAlign: "center",
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            display: "flex",
            padding: "14px 36px",
            borderRadius: 999,
            backgroundColor: "#3b82f6",
            color: "#ffffff",
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          Devis gratuit sous 48h
        </div>
      </div>
    ),
    size
  );
}
