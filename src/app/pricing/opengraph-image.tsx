import { ImageResponse } from "next/og";
import { OgTemplate } from "@/components/og/og-template";

export const runtime = "nodejs";
export const alt = "Scrunity Pricing Plans — Predictable & Transparent";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        title="Protect your scope. Get paid on time."
        description="Transparent pricing for modern agencies and freelancers. Free trial, Freelancer, Agency, and Enterprise tiers."
        badge="Pricing"
        meta="Free Trial · Freelancer $20/mo · Agency $30/mo · Enterprise"
        domain="landing.scrunity.com/pricing"
      />
    ),
    {
      ...size,
    }
  );
}
