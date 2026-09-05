import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Scrunity Pricing Plans — Predictable & Transparent";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  const tiers = [
    { name: "Free Trial", price: "$0", note: "14-day trial" },
    { name: "Freelancer", price: "$20", note: "per month" },
    { name: "Agency", price: "$30", note: "most popular", popular: true },
    { name: "Enterprise", price: "Custom", note: "annual billing" },
  ];

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
            "radial-gradient(circle at 80% 20%, rgba(0, 170, 247, 0.22) 0%, rgba(8, 9, 12, 0) 55%), radial-gradient(circle at 20% 80%, rgba(0, 170, 247, 0.08) 0%, rgba(8, 9, 12, 0) 45%)",
          padding: "52px 64px",
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
          </div>

          <div
            style={{
              padding: "6px 16px",
              borderRadius: 999,
              backgroundColor: "rgba(0, 170, 247, 0.12)",
              border: "1px solid rgba(0, 170, 247, 0.3)",
              fontSize: 13,
              fontWeight: 600,
              color: "#00AAF7",
            }}
          >
            Transparent Plans
          </div>
        </div>

        {/* Title & Subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontSize: 54,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              lineHeight: 1.15,
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <span>Protect your scope.</span>
            <span style={{ color: "#00AAF7" }}>Get paid on time.</span>
          </div>
          <span style={{ fontSize: 20, color: "#94A3B8" }}>
            Simple, honest pricing designed to scale with your freelance or agency business.
          </span>
        </div>

        {/* 4 Plan Cards */}
        <div style={{ display: "flex", gap: 16, width: "100%" }}>
          {tiers.map((tier) => (
            <div
              key={tier.name}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: "20px 22px",
                borderRadius: 14,
                backgroundColor: tier.popular
                  ? "rgba(0, 170, 247, 0.14)"
                  : "rgba(255, 255, 255, 0.04)",
                border: tier.popular
                  ? "2px solid #00AAF7"
                  : "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: tier.popular ? "#00AAF7" : "#CBD5E1",
                }}
              >
                {tier.name}
              </span>
              <span
                style={{
                  fontSize: 34,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "#FFFFFF",
                  marginTop: 8,
                }}
              >
                {tier.price}
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: "#64748B",
                  marginTop: 2,
                }}
              >
                {tier.note}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: 20,
          }}
        >
          <span style={{ fontSize: 14, color: "#64748B" }}>
            Includes AI Scope Guardian, PDF E-Signatures & Unlimited Proposals
          </span>
          <span style={{ fontSize: 16, fontWeight: 600, color: "#64748B" }}>
            landing.scrunity.com/pricing
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
