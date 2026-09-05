import { ImageResponse } from "next/og";
import { getPostBySlug } from "../data";
import { OgTemplate } from "@/components/og/og-template";

export const runtime = "nodejs";
export const alt = "Scrunity Blog";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return new ImageResponse(
    (
      <OgTemplate
        title={post.title}
        description={post.description}
        category={post.category}
        meta={`${post.author.name} · ${post.author.role} · ${post.readTime}`}
        domain="landing.scrunity.com"
      />
    ),
    {
      ...size,
    }
  );
}
