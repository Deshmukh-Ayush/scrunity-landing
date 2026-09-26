import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/container";
import { Divider } from "@/components/utility/divider";
import { Footer } from "@/components/footer";
import { getAllBlogs, getSingleBlog, BlogMeta } from "@/utils/mdx";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { ShareButton } from "@/components/blog/share-button";
import { SubHeading } from "@/components/utility/texts";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllBlogs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const source = await getSingleBlog(slug);

  if (!source) {
    return {
      title: "Article Not Found | Scrunity",
    };
  }

  const { frontmatter } = await compileMDX<BlogMeta>({
    source,
    options: { parseFrontmatter: true },
  });

  return {
    title: `${frontmatter.title} | Scrunity`,
    description: frontmatter.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: `/blog/${slug}`,
      type: "article",
      publishedTime: frontmatter.date,
      authors: [frontmatter.author],
      ...(frontmatter.image && {
        images: [{ url: frontmatter.image }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      ...(frontmatter.image && {
        images: [frontmatter.image],
      }),
    },
  };
}

export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } = await params;
  const source = await getSingleBlog(slug);

  if (!source) {
    notFound();
  }

  const { content, frontmatter } = await compileMDX<BlogMeta>({
    source,
    components: mdxComponents,
    options: { parseFrontmatter: true },
  });

  // Get other posts for the "Read next" section
  const allPosts = await getAllBlogs();
  const morePosts = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen overflow-x-clip bg-gray-50">
      <Container className="min-h-screen border-x border-gray-200 px-6 pt-28 pb-10">
        {/* Back Link */}
        {/* <div className="pt-2 pb-6">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-900"
          >
            <ArrowLeftIcon
              size={13}
              weight="bold"
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
            <span>Back to all articles</span>
          </Link>
        </div> */}

        {/* Post Hero Header */}
        <header className="mx-auto max-w-3xl space-y-5 pb-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold text-blue-700">
              {frontmatter.category}
            </span>
            <span className="text-xs text-neutral-400">·</span>
            <span className="font-mono text-xs text-neutral-500 tabular-nums">
              {frontmatter.date}
            </span>
            <span className="text-xs text-neutral-400">·</span>
            <span className="text-xs text-neutral-500">
              {frontmatter.readTime}
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl md:leading-[1.12]">
            {frontmatter.title}
          </h1>

          {frontmatter.description && (
            <p className="text-base leading-relaxed text-pretty text-neutral-500 sm:text-lg">
              {frontmatter.description}
            </p>
          )}

          {/* Author and Share Row */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-6">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#171717] text-xs font-medium text-white shadow-xs">
                {frontmatter.authorAvatar}
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-900">
                  {frontmatter.author}
                </p>
                <p className="text-[11px] text-neutral-400">
                  {frontmatter.authorRole}
                </p>
              </div>
            </div>

            <ShareButton title={frontmatter.title} />
          </div>
        </header>

        <Divider />

        {/* Post Hero Image */}
        {frontmatter.image && (
          <div className="mx-auto mt-10 -mb-4 aspect-[16/10] w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-neutral-950 shadow-xs">
            <Image
              src={frontmatter.image}
              alt={frontmatter.title}
              width={1200}
              height={750}
              priority
              className="h-full w-full object-cover"
              sizes="(min-width: 768px) 768px, 100vw"
            />
          </div>
        )}

        {/* Article Reading Body */}
        <article className="mx-auto max-w-3xl py-12">{content}</article>

        {/* Read Next Section */}

        {/* Global Footer */}
      </Container>
      <Divider />
      <div className="mx-auto max-w-7xl border-x border-gray-200 px-6 py-10">
        <SubHeading className="ml-2 py-6">Continue Reading</SubHeading>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {morePosts.map((otherPost) => (
            <Link
              key={otherPost.slug}
              href={`/blog/${otherPost.slug}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[18px] border border-gray-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
            >
              <div className="space-y-3">
                {otherPost.image && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-950">
                    <Image
                      src={otherPost.image}
                      alt={otherPost.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(min-width: 768px) 380px, 100vw"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[9px] font-medium text-neutral-600">
                    {otherPost.category}
                  </span>
                  <span className="font-mono text-[10px] text-neutral-400 tabular-nums">
                    {otherPost.readTime}
                  </span>
                </div>

                <h4 className="text-base font-semibold tracking-tight text-neutral-900 transition-colors duration-150 group-hover:text-blue-600">
                  {otherPost.title}
                </h4>

                <p className="line-clamp-2 text-xs leading-relaxed text-neutral-500">
                  {otherPost.description}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-neutral-500">
                <span>{otherPost.date}</span>
                <span className="inline-flex items-center gap-1 font-medium text-neutral-700 transition-colors group-hover:text-blue-600">
                  Read
                  <ArrowUpRightIcon size={11} weight="bold" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Divider />
      <div className="mx-auto max-w-7xl border-x border-gray-200 px-6">
        <Footer />
      </div>
    </div>
  );
}
