import { Container } from "@/components/container";
import { Hero } from "@/components/hero/hero";
import { HowItWorks } from "@/components/how-it-works";
import { SubHeadingAnimation } from "@/components/how-it-works/subheading";
import { Button } from "@/components/utility/button";
import { Heading, Para, SubHeading } from "@/components/utility/texts";

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
      <Container className="mt-10 min-h-screen px-10.5 py-20 pb-10">
        <div className="w-full">
          <SubHeadingAnimation />
        </div>
        <div className="w-full py-10">
          <HowItWorks />
        </div>
      </Container>
    </div>
  );
}
