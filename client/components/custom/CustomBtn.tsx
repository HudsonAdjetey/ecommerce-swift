import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

const CustomBtn = ({
  className,
  textString,
  href,
}: {
  className?: string;
  textString?: string;
  href?: string;
}) => {
  const router = useRouter();
  return (
    <button
      onClick={
        href
          ? () => {
              router.push(href);
            }
          : undefined
      }
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
