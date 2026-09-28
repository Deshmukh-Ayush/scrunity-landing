import React from "react";
import { Heading } from "@/components/utility/texts";
import { Container } from "@/components/container";
import { cn } from "cn";
import { EverywhereayushShader } from "@/components/join/shader";
import { Scales } from "@/components/utility/scales";

export default function AboutPage() {
  return (
    <div className="bg-neutral-50">
      <Container className="relative min-h-screen max-w-[1380px] border-x border-gray-300">
        <Scales orientation="diagonal" size={8} />
        <Container className="relative isolate min-h-screen w-full overflow-hidden border-x border-gray-300 py-20">
          <div className="pointer-events-none absolute inset-0 z-0">
            <EverywhereayushShader />
          </div>
          <div className="relative z-10">
            <div className="mx-auto flex flex-col items-center justify-center gap-8">
              <h1 className="text-sm text-neutral-400">About Scrunity AI</h1>
              <Heading className="text-center leading-none">
                The self operating <br /> client-operation tool.
              </Heading>
            </div>
            <div className="shadow-border mx-auto mt-8 w-2xl rounded-xl bg-white p-8">
              <div className="flex w-full flex-col items-start justify-center gap-4 p-4">
                <AboutPara className="text-neutral-500">
                  01&nbsp;&nbsp;The problem with existing softwares today!
                </AboutPara>
                <AboutPara className="text-neutral-700">
                  Agencies spend time battling with problems like contracts,
                  invoices, proposals, tracking deliverbales and finding leads.
                  We beleive that agencies and freelancers should focus on thier
                  core field of domain and rather not spend thier precious time
                  solving this chaos. It takes away a lot of time and in the era
                  of AI it is a waste of time to if these things can easily be
                  automated. The market contains tons of Agentic AI solutions
                  but there is no all in one solution platform and that&apos;s
                  where I decided to step in and create something for the
                  community.
                </AboutPara>
              </div>
              <div className="flex w-full flex-col items-start justify-center gap-4 p-4">
                <AboutPara className="text-neutral-500">
                  02&nbsp;&nbsp;New way to approch the problem
                </AboutPara>
                <AboutPara className="text-neutral-700">
                  The idea is to create a application which makes the problem
                  burdenless or to put it simply the idea is to utilize the
                  power of Agentic AI and create a workflow where Agencies and
                  freelancers do not have to worry about the handling of
                  invoices, proposals, outbound leads management and contracts.
                  One workspaces for all clients completely operated by agents
                  so you don&apos;t have to worry about anything
                </AboutPara>
                <AboutPara className="mt-4">Ayush Deshmukh</AboutPara>
              </div>
            </div>
          </div>
        </Container>
      </Container>
    </div>
  );
}

const AboutPara = ({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn("text-[16px] font-medium text-pretty", className)}>
      {children}
    </p>
  );
};
