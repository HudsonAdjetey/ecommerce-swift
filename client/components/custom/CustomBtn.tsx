import { cn } from "@/lib/utils";
import React from "react";

const CustomBtn = ({
  className,
  textString,
}: {
  className?: string;
  textString?: string;
}) => {
  return (
    <button
      className={cn(
        "px-6 py-3 max-sm:text-sm font-semibold  bg-black text-white  transition-all duration-200 rounded-full",
        className
      )}
    >
      {textString || "Shop Now"}
    </button>
  );
};

export default CustomBtn;
