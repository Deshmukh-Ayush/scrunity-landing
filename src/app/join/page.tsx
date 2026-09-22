import { Form } from "@/components/join/form";
import { Illustration } from "@/components/join/illustration";
import { Para, SubHeading } from "@/components/utility/texts";
import { EverywhereayushShader } from "@/components/join/shader";
import { cn } from "cn";

export default function Join() {
  return (
    <div className="flex min-h-[calc(100svh-72px)] w-full gap-2 p-2 lg:flex-row">
      <div className="flex w-full items-center justify-center rounded-lg bg-gray-100 px-6 py-12 backdrop-blur-md sm:px-10 lg:w-1/2 lg:px-12 lg:py-16">
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
      <div className="relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-gray-50 lg:w-1/2">
        {/* Diary-cover grain, same filter recipe as JpgCardHolder's pocket */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 size-full"
        >
          <defs>
            <filter
              id="join-illustration-grain"
              x="0"
              y="0"
              width="100%"
              height="100%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.7"
                numOctaves="3"
                seed="7"
              />
              <feDiffuseLighting surfaceScale="0.6" lightingColor="#fff">
                <feDistantLight azimuth="235" elevation="55" />
              </feDiffuseLighting>
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1 0 0 0 1"
              />
              <feComposite in="SourceGraphic" operator="in" />
            </filter>
          </defs>
          <rect
            width="100%"
            height="100%"
            filter="url(#join-illustration-grain)"
            className="fill-foreground opacity-15"
          />
        </svg>

        <VerticalLine className="left-10" />
        <VerticalLine className="left-20" />
        <HorizontalLine className="top-10" />
        <HorizontalLine className="bottom-10" />
        {/* square */}
        <VerticalLine className="left-110 mask-y-from-30% mask-y-to-90%" />
        <VerticalLine className="left-74 mask-y-from-30% mask-y-to-90%" />
        <HorizontalLine className="top-82 mask-x-from-30% mask-x-to-90%" />
        <HorizontalLine className="top-117 mask-x-from-30% mask-x-to-90%" />

        <Illustration />
      </div>
    </div>
  );
}

// Round-capped stitch dashes, matching JpgCardHolder's STITCH_PATH treatment.
const VerticalLine = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-hidden
      className={cn("absolute h-250 w-[1px] overflow-visible", className)}
    >
      <line
        x1="50%"
        y1="0%"
        x2="50%"
        y2="100%"
        strokeWidth={1.5}
        className="stroke-foreground/10"
      />
      <line
        x1="50%"
        y1="0%"
        x2="50%"
        y2="100%"
        strokeWidth={1.5}
        strokeDasharray="2.5 10.5"
        strokeLinecap="round"
        className="stroke-foreground/40"
      />
    </svg>
  );
};

const HorizontalLine = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-hidden
      className={cn("absolute h-[1px] w-250 overflow-visible", className)}
    >
      <line
        x1="0%"
        y1="50%"
        x2="100%"
        y2="50%"
        strokeWidth={1.5}
        className="stroke-foreground/10"
      />
      <line
        x1="0%"
        y1="50%"
        x2="100%"
        y2="50%"
        strokeWidth={1.5}
        strokeDasharray="2.5 10.5"
        strokeLinecap="round"
        className="stroke-foreground/40"
      />
    </svg>
  );
};

const DiagonalLine = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-hidden
      className={cn(
        "absolute h-[1px] w-250 -rotate-45 overflow-visible",
        className,
      )}
    >
      <line
        x1="0%"
        y1="50%"
        x2="100%"
        y2="50%"
        strokeWidth={1.5}
        className="stroke-foreground/10"
      />
      <line
        x1="0%"
        y1="50%"
        x2="100%"
        y2="50%"
        strokeWidth={1.5}
        strokeDasharray="2.5 10.5"
        strokeLinecap="round"
        className="stroke-foreground/40"
      />
    </svg>
  );
};
