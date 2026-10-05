import { ImageResponse } from "next/og";

import { siteConfig } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.role}`;

/**
 * Social share card, generated at build time so no design asset has to be
 * maintained by hand.
 */
export default function OpenGraphImage() {
  const stack = siteConfig.primaryStack.join("  ·  ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#080a0f",
          backgroundImage:
            "radial-gradient(circle at 20% 0%, rgba(90,166,255,0.18) 0%, transparent 55%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              border: "1px solid #23405f",
              backgroundColor: "#10233a",
              color: "#5aa6ff",
              fontSize: "26px",
              fontWeight: 600,
            }}
          >
            {siteConfig.shortName}
          </div>
          <div style={{ display: "flex", fontSize: "26px", color: "#9aa5b4" }}>
            {siteConfig.location}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "76px",
              fontWeight: 700,
              letterSpacing: "-2.5px",
              color: "#e9edf4",
              lineHeight: 1.05,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "18px",
              fontSize: "36px",
              color: "#5aa6ff",
            }}
          >
            {siteConfig.role}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "28px",
              fontSize: "26px",
              color: "#6d7887",
            }}
          >
            {stack}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            borderTop: "1px solid #1e242e",
            paddingTop: "28px",
            fontSize: "24px",
            color: "#6d7887",
          }}
        >
          <div style={{ display: "flex", color: "#5aa6ff" }}>●</div>
          {siteConfig.availability}
        </div>
      </div>
    ),
    size,
  );
}