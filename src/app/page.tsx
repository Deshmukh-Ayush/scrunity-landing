import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Easy } from "@/components/easy";
import { Hero } from "@/components/hero/hero";
import { Features1 } from "@/components/features-one";
import { SubHeadingAnimation } from "@/components/features-one/subheading";
import { Button } from "@/components/utility/button";
import { Heading, Para, SubHeading } from "@/components/utility/texts";
import { Divider } from "@/components/utility/divider";
import { HowItWorks } from "@/components/how-it-works";
import { Pricing } from "@/components/pricing";
import { Footer } from "@/components/footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Save Time and Think Less | Scrunity",
  description:
    "Contracts, Deliverables, E-Signatures, Payment Tracking, Timelines and more. The client collaboration & revenue protection workspace for modern agencies and freelancers.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Scrunity — Save Time and Think Less in Client Work",
    description:
      "Contracts, Deliverables, E-Signatures, Payment Tracking, Timelines and more. Join the waitlist to get early access.",
    url: "/",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-gray-50">
      <Container className="overflow-hidden">
        <div className="flex flex-col items-start justify-between gap-4 px-10 pt-20 pb-10 md:flex-row md:items-end md:gap-6 md:pt-40">
          <Heading className="leading-none md:leading-16">
            Save time <br /> and think less{" "}
          </Heading>
          <div className="flex flex-col items-start justify-between gap-6 py-1">
            <Para className="text-start">
              Contracts, Deliverables, E-Signatures, Payment Tracking,{" "}
              <br className="hidden md:inline" /> Timelines and more. Join the
              waitlist to get early access.
            </Para>
            <div className="flex flex-wrap items-center justify-start gap-4">
              <button className="cursor-pointer rounded-full px-6 py-2 text-[15px] text-neutral-800">
                <Link href="https://app.scrunity.com/sign-in">
                  Join Waitlist
                </Link>
              </button>
              <Button href="/join">Get Early Access</Button>
            </div>
          </div>
        </div>
      </Container>

      <div className="w-full overflow-hidden rounded-[10px] border border-gray-200 p-1.5 sm:p-2 md:ml-35 md:w-auto">
        <Hero />
      </div>

      {/* new container */}
      <Container className="mt-10 min-h-screen border-x border-gray-200 px-10.5 py-20 pb-10">
        <div className="w-full">
          <SubHeadingAnimation />
        </div>
        <div className="w-full py-10">
          <Features1 />
        </div>
        <Divider />
        {/* How it works */}
        <div className="w-full py-10">
          <SubHeading>How it works</SubHeading>
          <Para>
            Starts with creating project and then sending onboarding link to
            client
          </Para>
          <HowItWorks />
        </div>
        <Divider />
        {/* pricing */}
        <div className="w-full py-10">
          <SubHeading>Pricing</SubHeading>
          <Para>Start for free and works for scale too.</Para>
          <Pricing />
        </div>
        <Divider />
        {/* Makes it easy */}
        <div className="w-full py-10">
          <div className="flex w-full flex-col items-start gap-5 md:flex-row md:items-end md:justify-between md:gap-0">
            <div className="w-full">
              <SubHeading>Scrunity makes it easy.</SubHeading>
              <Para className="my-2 w-full md:w-150">
                It streamlines the entire contract management process, saving
                you time and reducing the complexity of handling multiple
                documents and communications.
              </Para>
            </div>
            <Button className="my-1 shrink-0">Start free trial</Button>
          </div>
          <Easy />
        </div>
        <Divider />

        {/* footer */}
        <Footer />
      </Container>
    </div>
  );
}
