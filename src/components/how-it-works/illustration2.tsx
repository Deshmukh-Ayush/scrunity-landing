import React from "react";
import { Button } from "../utility/button";
import { toast } from "../ui/toast";

export const Illustration2 = () => {
  return (
    <div className="h-[200px] w-[373px] rounded-lg border border-gray-200">
      <Button
        onClick={() =>
          toast.add({
            type: "success",
            description: "Event has been created.",
          })
        }
      >
        Get Started
      </Button>
    </div>
  );
};
