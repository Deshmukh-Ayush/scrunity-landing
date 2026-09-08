import { Para, SubHeading } from "@/components/utility/texts";

export default function Join() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex h-full w-[50%] items-center justify-center bg-gray-100">
        <div>
          <SubHeading>Get Started</SubHeading>
          <Para>
            Get a first hand look how Scrunity can save <br /> you time and
            streamline your workflow
          </Para>
        </div>
      </div>
      <div className="h-full w-[50%] bg-red-400">hi</div>
    </div>
  );
}
