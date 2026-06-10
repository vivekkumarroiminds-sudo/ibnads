import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";

// Dynamic Open Graph image: /og?title=...&badge=...
export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? siteConfig.name).slice(0, 120);
  const badge = searchParams.get("badge") ?? "Hands-on review";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px",
          background: "linear-gradient(135deg, #0b1220 0%, #0e2a45 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "#38bdf8",
              border: "2px solid #38bdf8",
              borderRadius: "999px",
              padding: "6px 18px",
            }}
          >
            {badge}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 32, fontWeight: 700 }}>{siteConfig.name}</div>
          <div style={{ fontSize: 24, color: "#94a3b8" }}>Independent · Tested</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
