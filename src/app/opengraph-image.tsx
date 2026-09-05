import { ImageResponse } from "next/og";
import { OgTemplate } from "@/components/og/og-template";

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
      <OgTemplate
        title="Save time and think less in your client work."
        description="Contracts, Deliverables, E-Signatures, Payment Tracking, and AI Scope Guardian. Built for modern agencies and freelancers."
        badge="Client Workspace"
        domain="landing.scrunity.com"
      />
    ),
    {
      ...size,
    }
  );
}
