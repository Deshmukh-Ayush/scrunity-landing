export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    role: string;
  };
}

export const BLOG_POSTS: Record<string, BlogPost> = {
  "introducing-scrunity-client-workspace": {
    slug: "introducing-scrunity-client-workspace",
    title: "Introducing Scrunity: The Revenue Protection OS for Agencies",
    description:
      "Why we built an all-in-one workspace uniting AI scope extraction, e-signatures, milestone payments, and deliverable reviews.",
    date: "2026-08-20",
    readTime: "4 min read",
    category: "Product Launch",
    author: {
      name: "Ayush Deshmukh",
      role: "Founder, Scrunity",
    },
  },
  "how-ai-scope-guardian-prevents-scope-creep": {
    slug: "how-ai-scope-guardian-prevents-scope-creep",
    title: "How the AI Scope Guardian Eliminates Scope Creep and Protects Agency Margins",
    description:
      "A deep dive into how automatic SOW revision limits and one-click Change Order SOW addendums prevent unpaid revision cycles.",
    date: "2026-08-28",
    readTime: "6 min read",
    category: "Engineering & AI",
    author: {
      name: "Scrunity Engineering",
      role: "Product Team",
    },
  },
  "the-death-of-the-docusign-whatsapp-invoice-chaos": {
    slug: "the-death-of-the-docusign-whatsapp-invoice-chaos",
    title: "The Death of the DocuSign + WhatsApp + Spreadsheet Agency Stack",
    description:
      "How fragmented client collaboration stacks destroy client trust, and how a unified client portal fixes it.",
    date: "2026-09-02",
    readTime: "5 min read",
    category: "Agency Operations",
    author: {
      name: "Ayush Deshmukh",
      role: "Founder, Scrunity",
    },
  },
};

export function getPostBySlug(slug: string): BlogPost {
  if (BLOG_POSTS[slug]) {
    return BLOG_POSTS[slug];
  }

  // Graceful fallback: dynamically format slug to human readable title
  const formattedTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    slug,
    title: formattedTitle,
    description: `Read the latest insights and updates about ${formattedTitle} on the Scrunity blog.`,
    date: new Date().toISOString().split("T")[0],
    readTime: "5 min read",
    category: "Article",
    author: {
      name: "Scrunity Team",
      role: "Editorial",
    },
  };
}
