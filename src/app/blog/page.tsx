import Link from "next/link";
import { Container } from "@/components/container";
import { Heading, Para, SubHeading } from "@/components/utility/texts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Blogs - Scrunity AI",
  description: "Latest updates changelogs and more.",
};

export default async function BlogPage() {
  return (
    <article className="min-h-screen items-start justify-start bg-gray-50 pt-28 pb-24">
      <Container className="min-h-screen max-w-2xl bg-red-200 px-6 md:px-8">
        <SubHeading>Single Blogs Page</SubHeading>
        <Para>this is a single blogs page</Para>
      </Container>
    </article>
  );
}
