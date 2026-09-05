import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Heading, Para } from "@/components/utility/texts";
import { getPostBySlug, BLOG_POSTS } from "../data";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const canonicalUrl = `/blog/${slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      publishedTime: post.date,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: siteConfig.creator,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-gray-50 pt-28 pb-24">
      <Container className="max-w-3xl px-6 md:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors mb-8"
        >
          ← Back to Scrunity
        </Link>

        <header className="space-y-4 border-b border-gray-200 pb-8">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-sky-100 px-3 py-0.5 text-xs font-semibold text-[#00AAF7]">
              {post.category}
            </span>
            <span className="text-xs text-neutral-500">{post.readTime}</span>
            <span className="text-xs text-neutral-400">•</span>
            <span className="text-xs text-neutral-500">{post.date}</span>
          </div>

          <Heading className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-5xl leading-tight">
            {post.title}
          </Heading>

          <Para className="text-base text-neutral-600 leading-relaxed">
            {post.description}
          </Para>

          <div className="flex items-center gap-3 pt-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-semibold text-neutral-900">{post.author.name}</div>
              <div className="text-[11px] text-neutral-500">{post.author.role}</div>
            </div>
          </div>
        </header>

        <div className="prose prose-neutral mt-8 max-w-none text-neutral-700 leading-relaxed space-y-6 text-sm md:text-base">
          <p>
            Client collaboration in modern agencies is fragmented. Contracts live in DocuSign,
            timelines are discussed over WhatsApp, deliverables get lost in Google Drive links, and
            billing disputes simmer in spreadsheets.
          </p>
          <p>
            When scope creeps—an extra design iteration here, an unapproved copy change there—agency
            margins quietly erode. Scrunity was engineered to provide a single, legally binding,
            and AI-monitored workspace where both agencies and clients operate from a single source
            of truth.
          </p>
          <div className="my-8 rounded-xl border border-sky-200 bg-sky-50/60 p-6">
            <h3 className="text-base font-semibold text-neutral-900 mb-2">Key takeaway</h3>
            <p className="text-sm text-neutral-700">
              Clear scope terms extracted directly from PDF contracts allow our AI Scope Guardian to
              detect scope creep in real-time, drafting SOW Change Orders before unpaid work begins.
            </p>
          </div>
        </div>
      </Container>
    </article>
  );
}
