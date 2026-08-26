import { Container } from "@/components/container";
import { Hero } from "@/components/hero/hero";
import { Heading, Para } from "@/components/utility/texts";

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Container className="overflow-hidden">
        <div className="flex items-center justify-between px-10 pt-40 pb-10">
          <Heading className="leading-16">
            Save money <br /> and think less{" "}
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
              <button className="cursor-pointer rounded-full bg-neutral-800 px-6 py-2 text-[15px] text-neutral-50">
                Get Early Access
              </button>
            </div>
          </div>
        </div>
      </Container>
      <div className="pl-10">
        <Hero />
      </div>
    </div>
  );
}
