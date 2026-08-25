import { Container } from "@/components/container";
import { Hero } from "@/components/hero/hero";
import { Heading, Para } from "@/components/utility/texts";

export default function Home() {
  return (
    <div>
      <Container className="min-h-screen overflow-hidden">
        <div className="flex items-center justify-between px-10 pt-40 pb-10">
          <Heading className="leading-16">
            Save money <br /> and think less{" "}
          </Heading>
          <div className="flex flex-col items-end justify-between gap-6 py-1">
            <Para className="text-end">
              Scrunity empowers agencies and freelancers with AI-powered <br />
              collaboration to align clients, protect projects, and prevent
              revenue leakage.
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
        <div className="pl-10">
          <Hero />
        </div>
      </Container>
    </div>
  );
}
