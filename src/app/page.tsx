import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Easy } from "@/components/easy";
import { Hero } from "@/components/hero/hero";
import { Features1 } from "@/components/features-one";
import { SubHeadingAnimation } from "@/components/features-one/subheading";
import { Button } from "@/components/utility/button";
import { Heading, Para, SubHeading } from "@/components/utility/texts";
import { cn } from "@/lib/utils";
import { Divider } from "@/components/utility/divider";
import { HowItWorks } from "@/components/how-it-works";

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
        <div className="flex items-end justify-between px-10 pt-40 pb-10">
          <Heading className="leading-16">
            Save time <br /> and think less{" "}
          </Heading>
          <div className="flex flex-col items-end justify-between gap-6 py-1">
            <Para className="text-end">
              Contracts, Deliverables, E-Signatures, Payment Tracking, <br />{" "}
              Timelines and more. Join the waitlist to get early access.
            </Para>
            <div className="flex items-end justify-center gap-4">
              <button className="cursor-pointer rounded-full px-6 py-2 text-[15px] text-neutral-800">
                Join Waitlist
              </button>
              <Button>Get Early Access</Button>
            </div>
          </div>
        </div>
      </Container>

      <div className="ml-35 overflow-hidden rounded-[10px] border border-gray-200 p-2">
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
        {/* Makes it easy */}
        <div className="w-full py-10">
          <SubHeading>Scrunity makes it easy.</SubHeading>
          <Para className="my-2 w-150">
            It streamlines the entire contract management process, saving you
            time and reducing the complexity of handling multiple documents and
            communications.
          </Para>
          <Easy />
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
      </Container>
    </div>
  );
}
