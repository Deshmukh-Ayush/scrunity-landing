import { siteConfig } from "@/lib/site";

export interface FooterLink {
  label: string;
  href: string;
}

export const PRODUCT_LINKS: FooterLink[] = [
  { label: "Scope Guardian", href: "/product#scope-guardian" },
  { label: "Contracts & e-signatures", href: "/product#contracts" },
  { label: "Deliverable reviews", href: "/product#deliverables" },
  { label: "Milestone payments", href: "/product#payments" },
  { label: "Pricing plans", href: "/pricing" },
  { label: "Interactive playground", href: "/playground" },
];

export const RESOURCE_LINKS: FooterLink[] = [
  { label: "Documentation", href: `${siteConfig.appUrl}/docs` },
  { label: "Engineering blog", href: "/blog" },
  { label: "Scope creep guide", href: "/blog" },
  { label: "Contract templates", href: "/resources" },
  { label: "Changelog", href: "/changelog" },
];

export const COMPANY_LINKS: FooterLink[] = [
  { label: "About Scrunity", href: "/about" },
  { label: "Security & privacy", href: "/security" },
  { label: "Careers", href: "/careers" },
  { label: "Contact support", href: "/contact" },
  { label: "Sign in", href: `${siteConfig.appUrl}/sign-in` },
];

export const LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
  { label: "Security overview", href: "/security" },
];
