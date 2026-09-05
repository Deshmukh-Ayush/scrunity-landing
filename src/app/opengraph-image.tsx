import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Scrunity — AI-Powered Client Workspace & Revenue Protection";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
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
            "radial-gradient(circle at 85% 15%, rgba(0, 170, 247, 0.18) 0%, rgba(8, 9, 12, 0) 55%), radial-gradient(circle at 15% 85%, rgba(0, 170, 247, 0.08) 0%, rgba(8, 9, 12, 0) 45%)",
          padding: "56px 64px",
          fontFamily: "sans-serif",
          color: "#FFFFFF",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        {/* Top bar: Brand Logo + Product Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Scrunity Logo Icon */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: "rgba(0, 170, 247, 0.12)",
                border: "1px solid rgba(0, 170, 247, 0.35)",
              }}
            >
              <svg
                width="24"
                height="32"
                viewBox="0 0 113 188"
                fill="none"
              >
                <path
                  d="M74.8486 149.697V187.121H0V149.696L74.8486 149.697ZM37.4248 74.8496H74.8486V74.8477H112.273V149.697L74.8486 149.696V112.274H0V37.4238H37.4248V74.8496ZM112.273 0.000976562V37.4248H37.4248V0L112.273 0.000976562Z"
                  fill="#00AAF7"
                />
              </svg>
            </div>
            <span
              style={{
                fontSize: 32,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
              }}
            >
              Scrunity
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 18px",
              borderRadius: 999,
              backgroundColor: "rgba(0, 170, 247, 0.12)",
              border: "1px solid rgba(0, 170, 247, 0.28)",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                backgroundColor: "#00AAF7",
              }}
            />
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.02em",
                color: "#00AAF7",
              }}
            >
              Client Workspace & Revenue Protection
            </span>
          </div>
        </div>

        {/* Center: Main Headline & Pitch */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 62,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Save time and think less</span>
            <span style={{ color: "#00AAF7" }}>in your client work.</span>
          </div>

          <p
            style={{
              fontSize: 24,
              lineHeight: 1.45,
              color: "#94A3B8",
              margin: 0,
              maxWidth: 960,
            }}
          >
            Contracts, Deliverables, E-Signatures, Payment Tracking, and AI Scope
            Guardian. Built for modern agencies and freelancers.
          </p>
        </div>

        {/* Bottom bar: Feature tags + Domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {["AI Scope Guardian", "E-Signature Vault", "Milestone Payments", "Client Safeguards"].map(
              (tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 8,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#E2E8F0",
                  }}
                >
                  {tag}
                </div>
              )
            )}
          </div>

          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#64748B",
              letterSpacing: "-0.01em",
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
