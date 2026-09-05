export const siteConfig = {
  name: "Scrunity",
  shortName: "Scrunity",
  title: "Scrunity — AI-Powered Client Workspace & Revenue Protection",
  description:
    "AI-Powered Client Collaboration & Revenue Protection Platform for Agencies & Freelancers. Contracts, Deliverables, E-Signatures, Payment Tracking, Timelines and more.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://landing.scrunity.com",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "https://app.scrunity.com",
  brandColor: "#00AAF7",
  creator: "@scrunity",
  keywords: [
    "agency client portal",
    "freelancer workspace",
    "client collaboration",
    "contract management",
    "scope creep prevention",
    "payment milestone tracking",
    "e-signatures",
    "deliverable approvals",
    "revenue protection",
  ],
};

export function getAbsoluteUrl(path: string = ""): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
