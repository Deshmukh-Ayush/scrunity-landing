import { Metadata } from "next";
import { Container } from "@/components/container";
import { Heading, Para, SubHeading } from "@/components/utility/texts";
import { Divider } from "@/components/utility/divider";
import { Footer } from "@/components/footer";
import { getAllBlogs } from "@/utils/mdx";
import { BlogList } from "@/components/blog/blog-list";

export const metadata: Metadata = {
  title: "Writing & Engineering Notes | Scrunity",
  description:
    "Essays, architectural breakdowns, and design engineering notes from the team building Scrunity. Contracts, deliverables, and revenue protection without scope creep.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Writing & Engineering Notes | Scrunity",
    description:
      "Essays, architectural breakdowns, and design engineering notes from the team building Scrunity.",
    url: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await getAllBlogs();

  return (
    <div className="min-h-screen overflow-x-clip bg-gray-50">
      <Container className="relative min-h-screen max-w-3xl border-x border-gray-200 px-6 pt-28 pb-10 sm:px-10.5">
        {/* Header Hero Section */}
        <div className="flex flex-col items-start justify-between gap-3 py-10">
          <Para className="ml-1 text-neutral-500">Blogs</Para>
          <Heading className="leading-none">
            News and updates <br /> about Scrunity AI
          </Heading>
        </div>

        {/* Blog Post List Section */}
        <div className="w-full py-12">
          <BlogList posts={posts} />
        </div>

        {/* Global Footer */}
        <Footer />
      </Container>
    </div>
  );
}
