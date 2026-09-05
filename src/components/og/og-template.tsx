import React from "react";

export interface OgTemplateProps {
  title: string;
  description?: string;
  category?: string;
  badge?: string;
  meta?: string;
  domain?: string;
}

export function OgTemplate({
  title,
  description,
  category,
  badge,
  meta,
  domain = "landing.scrunity.com",
}: OgTemplateProps) {
  // Establish typographic hierarchy: scale title size adaptively so long titles wrap cleanly without clipping
  const titleFontSize = title.length > 75 ? 44 : title.length > 46 ? 50 : 58;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0A0A0A",
        padding: "64px 72px",
        fontFamily: "sans-serif",
        color: "#EDEDED",
        boxSizing: "border-box",
        border: "1px solid #222222",
      }}
    >
      {/* Top Header: Brand Wordmark + Restrained Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Scrunity Vector Symbol */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: 8,
              backgroundColor: "#141414",
              border: "1px solid #262626",
            }}
          >
            <svg width="18" height="24" viewBox="0 0 113 188" fill="none">
              <path
                d="M74.8486 149.697V187.121H0V149.696L74.8486 149.697ZM37.4248 74.8496H74.8486V74.8477H112.273V149.697L74.8486 149.696V112.274H0V37.4238H37.4248V74.8496ZM112.273 0.000976562V37.4248H37.4248V0L112.273 0.000976562Z"
                fill="#00AAF7"
              />
            </svg>
          </div>
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
            }}
          >
            Scrunity
          </span>
        </div>

        {(badge || category) && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 6,
              backgroundColor: "#141414",
              border: "1px solid #262626",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                backgroundColor: "#00AAF7",
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.04em",
                color: "#CCCCCC",
                textTransform: "uppercase",
              }}
            >
              {category || badge}
            </span>
          </div>
        )}
      </div>

      {/* Center: Title & Optional Description */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          marginTop: "auto",
          marginBottom: "auto",
        }}
      >
        <div
          style={{
            fontSize: titleFontSize,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
            maxWidth: 1040,
          }}
        >
          {title}
        </div>

        {description && (
          <div
            style={{
              fontSize: 22,
              lineHeight: 1.45,
              color: "#888888",
              maxWidth: 960,
            }}
          >
            {description}
          </div>
        )}
      </div>

      {/* Bottom Footer: Meta + Domain */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          borderTop: "1px solid #1E1E1E",
          paddingTop: 24,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "#666666",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          {meta ? (
            <span>{meta}</span>
          ) : (
            <span>Client Workspace & Revenue Protection</span>
          )}
        </div>

        <span
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: "#555555",
            letterSpacing: "-0.01em",
          }}
        >
          {domain}
        </span>
      </div>
    </div>
  );
}
