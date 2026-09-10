import { Form } from "@/components/join/form";
import { Illustration } from "@/components/join/illustration";
import { Para, SubHeading } from "@/components/utility/texts";
import { EverywhereayushShader } from "@/components/join/shader";
import { cn } from "cn";

export default function Join() {
  return (
    <div className="flex min-h-[calc(100svh-72px)] w-full gap-2 p-2 md:flex-row">
      <div className="flex w-full items-center justify-center rounded-lg bg-gray-100 px-6 py-12 backdrop-blur-md sm:px-10 md:w-1/2 md:px-12 md:py-16">
        <div className="flex w-full max-w-2xl flex-col gap-10">
          <div>
            <SubHeading>Get Started</SubHeading>
            <Para className="mt-2 w-80">
              Get a first hand look how Scrunity can save you time and
              streamline your workflow
            </Para>
          </div>
          <div className="mt-10">
            <Form />
          </div>
        </div>
      </div>
      <div className="relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-gray-50 md:w-1/2">
        <VerticalLine className="left-10" />
        <VerticalLine className="left-20" />
        <HorizontalLine className="top-10" />
        <HorizontalLine className="bottom-10" />
        {/* square */}
        <VerticalLine className="left-110 mask-y-from-30% mask-y-to-90%" />
        <VerticalLine className="left-74 mask-y-from-30% mask-y-to-90%" />
        <HorizontalLine className="top-82 mask-x-from-30% mask-x-to-90%" />
        <HorizontalLine className="top-117 mask-x-from-30% mask-x-to-90%" />

        <div className="hidden md:block">
          <Illustration />
        </div>
      </div>
    </div>
  );
}

const VerticalLine = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("absolute h-250 w-[1px]", className)}
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, rgba(23,23,23,0.12) 0 8px, transparent 8px 20px)",
        backgroundRepeat: "repeat-y",
      }}
    />
  );
};

const HorizontalLine = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("absolute h-[1px] w-250", className)}
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, rgba(23,23,23,0.12) 0 8px, transparent 8px 20px)",
        backgroundRepeat: "repeat-x",
      }}
    />
  );
};

const DiagonalLine = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("absolute h-[1px] w-250 -rotate-45", className)}
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, rgba(23,23,23,0.12) 0 8px, transparent 8px 20px)",
        backgroundRepeat: "repeat-x",
      }}
    />
  );
};
