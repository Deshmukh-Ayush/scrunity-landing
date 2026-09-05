import { ImageResponse } from "next/og";
import { getPostBySlug } from "../data";

export const runtime = "nodejs";
export const alt = "Scrunity Blog";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#08090C",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(0, 170, 247, 0.22) 0%, rgba(8, 9, 12, 0) 55%), radial-gradient(circle at 15% 85%, rgba(0, 170, 247, 0.08) 0%, rgba(8, 9, 12, 0) 45%)",
          padding: "56px 64px",
          fontFamily: "sans-serif",
          color: "#FFFFFF",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: "rgba(0, 170, 247, 0.12)",
                border: "1px solid rgba(0, 170, 247, 0.35)",
              }}
            >
              <svg width="22" height="30" viewBox="0 0 113 188" fill="none">
                <path
                  d="M74.8486 149.697V187.121H0V149.696L74.8486 149.697ZM37.4248 74.8496H74.8486V74.8477H112.273V149.697L74.8486 149.696V112.274H0V37.4238H37.4248V74.8496ZM112.273 0.000976562V37.4248H37.4248V0L112.273 0.000976562Z"
                  fill="#00AAF7"
                />
              </svg>
            </div>
            <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em" }}>
              Scrunity
            </span>
            <span style={{ fontSize: 18, color: "#64748B", fontWeight: 500 }}>
              / Blog
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 999,
              backgroundColor: "rgba(0, 170, 247, 0.12)",
              border: "1px solid rgba(0, 170, 247, 0.3)",
              fontSize: 13,
              fontWeight: 600,
              color: "#00AAF7",
            }}
          >
            {post.category}
          </div>
        </div>

        {/* Center: Dynamic Post Title & Description */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 54,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              maxWidth: 1040,
            }}
          >
            {post.title}
          </div>

          <p
            style={{
              fontSize: 22,
              lineHeight: 1.45,
              color: "#94A3B8",
              margin: 0,
              maxWidth: 980,
            }}
          >
            {post.description}
          </p>
        </div>

        {/* Footer: Author info + read time + domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                borderRadius: 999,
                backgroundColor: "#00AAF7",
                fontSize: 16,
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              {post.author.name.charAt(0)}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#E2E8F0" }}>
                {post.author.name}
              </span>
              <span style={{ fontSize: 12, color: "#64748B" }}>
                {post.author.role} · {post.readTime}
              </span>
            </div>
          </div>

          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#64748B",
            }}
          >
            landing.scrunity.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
