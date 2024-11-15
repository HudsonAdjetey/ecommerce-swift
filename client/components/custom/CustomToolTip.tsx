import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const CustomToolTip: React.FC<{
  children: React.ReactNode;
  className?: string;
  label: string;
  // handle click
  handleClick?: () => void;
}> = ({ children, className, label, handleClick }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={handleClick}
          className={cn(
            "w-[40px] h-[40px] flex items-center justify-center hover:bg-neutral-100 rounded-full",
            className
          )}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomToolTip;
