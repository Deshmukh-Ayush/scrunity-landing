import { Form } from "@/components/join/form";
import { Para, SubHeading } from "@/components/utility/texts";

export default function Join() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex h-full w-[50%] items-center justify-center bg-gray-100">
        <div className="flex h-[80vh] w-[80vh] flex-col gap-20 bg-red-300">
          <div>
            <SubHeading>Get Started</SubHeading>
            <Para className="mt-2">
              Get a first hand look how Scrunity can save <br /> you time and
              streamline your workflow
            </Para>
          </div>
          <div className="flex items-center justify-start">
            <Form />
          </div>
        </div>
      </div>
      <div className="h-full w-[50%] bg-red-400">hi</div>
    </div>
  );
}
