import { Form } from "@/components/join/form";
import { Illustration } from "@/components/join/illustration";
import { Para, SubHeading } from "@/components/utility/texts";

export default function Join() {
  return (
    <div className="flex min-h-[calc(100svh-72px)] w-full bg-gray-50 p-2 lg:flex-row">
      <div className="flex w-full items-center justify-center rounded-lg bg-gray-100 px-6 py-12 sm:px-10 lg:w-1/2 lg:px-12 lg:py-16">
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
      <div className="flex w-full items-center justify-center bg-gray-50 lg:w-1/2">
        <Illustration />
      </div>
    </div>
  );
}
