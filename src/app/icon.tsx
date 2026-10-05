import { ImageResponse } from "next/og";

import { siteConfig } from "@/data/site";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b1220",
          color: "#5aa6ff",
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: "-1px",
        }}
      >
        {siteConfig.shortName}
      </div>
    ),
    size,
  );
}