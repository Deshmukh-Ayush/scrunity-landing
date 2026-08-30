import { Navbar } from "@/components/navbar";
import { WorkspaceOverviewUI } from "@/components/redesign/workspace-overview-ui";
import { Heading } from "@/components/utility/texts";
import { FinancialsResult } from "../../components/redesign/financials-result";

export default function Playground() {
  return (
    <div>
      <div className="flex px-20 py-10">
        <Heading>The game changing revolution</Heading>
      </div>

      <FinancialsResult />
    </div>
  );
}
