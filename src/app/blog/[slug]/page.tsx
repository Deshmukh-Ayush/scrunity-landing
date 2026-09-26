import { Container } from "@/components/container";
import { Para, SubHeading } from "@/components/utility/texts";
import { Metadata } from "next";
import { promises as fs } from "fs";
import { MDXRemote, compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import { getSingleBlog } from "@/utils/mdx";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Single Blogs - Scrunity AI",
  description: "Latest updates changelogs and more.",
};

export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const singleBlog = await getSingleBlog(slug);

  if (!singleBlog) {
    redirect("/blog");
  }

  const { content, frontmatter } = await compileMDX<{ title: string }>({
    source: singleBlog,
    options: { parseFrontmatter: true },
  });

  return (
    <article className="min-h-screen items-start justify-start bg-gray-50 pt-28 pb-24">
      <Container className="min-h-screen max-w-2xl px-6 md:px-8">
        <SubHeading>Blogs Page</SubHeading>
        <Para>Hello Everyone, on this page I write</Para>

        <div className="prose">{content}</div>
      </Container>
    </article>
  );
}
