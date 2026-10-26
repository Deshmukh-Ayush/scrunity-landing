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
            <svg width="22" height="19" viewBox="0 0 595 516" fill="none">
              <path
                d="M173.484 291.968C196.11 273.319 209.027 250.36 208.629 220.999C208.459 208.482 204.84 196.793 197.593 186.543C186.492 170.845 181.629 153.411 182.066 134.358C182.623 110.14 180.842 85.8856 183.058 61.6968C186.188 27.535 214.673 0.842046 249.366 0.331365C280.848 -0.132075 312.348 -0.0928666 343.831 0.345853C381.175 0.866217 410.445 30.9534 410.568 68.303C410.646 92.2947 410.365 116.29 410.658 140.278C410.834 154.738 408.14 168.759 399.469 180.001C370.498 217.558 386.322 271.371 426.991 297.543C445.409 309.396 464.418 317.025 486.758 315.332C497.691 314.504 508.74 315.198 519.736 315.189C560.912 315.158 589.337 339.361 592.587 380.141C594.603 405.443 594.954 431.115 591.975 456.479C588.344 487.398 561.407 512.088 530.261 514.123C506.302 515.689 482.315 514.182 458.363 514.657C434.521 515.129 414.789 507.219 399.18 489.491C389.779 478.814 381.318 467.315 372.149 456.427C354.913 435.96 334.482 420.877 306.846 417.685C281.588 414.769 259.412 421.935 239.883 437.598C224.959 449.568 213.403 464.767 201.929 479.869C189.275 496.524 174.309 509.456 153.112 513.342C145.499 514.738 137.741 515.079 129.978 514.932C107.004 514.499 83.9937 516.045 61.0535 514.09C28.0133 511.273 0.898518 482.21 0.308415 448.745C-0.0836594 426.51 -0.11465 404.256 0.288914 382.021C0.955144 345.315 31.0258 315.76 67.7928 315.253C78.7869 315.102 89.8574 314.43 100.767 315.405C128.265 317.863 151.877 309.113 173.484 291.968ZM295.401 207.941C275.761 208.255 258.928 216.007 246.484 230.529C224.137 256.607 207.737 286.637 198.7 319.666C187.574 360.325 215.375 394.513 257.619 394.619C284.112 394.686 310.609 394.912 337.097 394.519C355.981 394.239 372.268 387.414 384.267 372.285C400.484 351.839 400.129 329.481 390.785 306.545C381.521 283.806 370.288 261.966 356.082 241.952C341.74 221.748 322.959 208.095 295.401 207.941Z"
                fill="#FFFFFF"
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
