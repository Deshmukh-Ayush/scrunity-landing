import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Easy } from "@/components/easy";
import { Hero } from "@/components/hero/hero";
import { HowItWorks } from "@/components/how-it-works";
import { SubHeadingAnimation } from "@/components/how-it-works/subheading";
import { Button } from "@/components/utility/button";
import { Heading, Para, SubHeading } from "@/components/utility/texts";
import { cn } from "@/lib/utils";

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
    <>
      <div className="[--separator-height:--spacing(8)] **:data-[slot=panel]:scroll-mt-[calc(var(--header-height)+var(--separator-height))]">
        <div className="min-h-screen overflow-x-clip bg-gray-50">
          <Container className="overflow-hidden">
            <div className="flex items-end justify-between px-10 pt-40 pb-10">
              <Heading className="leading-16">
                Save time <br /> and think less{" "}
              </Heading>
              <div className="flex flex-col items-end justify-between gap-6 py-1">
                <Para className="text-end">
                  Contracts, Deliverables, E-Signatures, Payment Tracking,{" "}
                  <br /> Timelines and more. Join the waitlist to get early
                  access.
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
          <Container className="mt-10 min-h-screen px-10.5 py-20 pb-10">
            <div className="w-full">
              <SubHeadingAnimation />
            </div>
            <div className="w-full py-10">
              <HowItWorks />
            </div>
            <Separator />
            <div className="w-full py-20">
              <SubHeading>Scrunity makes it easy.</SubHeading>
              <Para className="my-2 w-150">
                It streamlines the entire contract management process, saving
                you time and reducing the complexity of handling multiple
                documents and communications.
              </Para>
              <Easy />
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "stripe-divider h-(--separator-height) w-full border-x",
        className,
      )}
    >
      <div
        className="bg-background absolute -top-1.25 -left-1.25 z-2 flex size-2.25 border"
        aria-hidden
      />
      <div
        className="bg-background absolute -top-1.25 -right-1.25 z-2 flex size-2.25 border"
        aria-hidden
      />
    </div>
  );
}
