"use client";
import React from "react";
import DrawerFilter from "@/components/custom/DrawerFilter";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import useScroll from "@/hooks/useScroll";

const StickyBase = () => {
  const scrollY = useScroll();
  return (
    <div className="sticky z-50  top-[63px] flex items-center gap-6 justify-between px-4 2xl:px-10 bg-white py-2 left-0 right-0">
      <h1
        className={`${
          scrollY > 50 ? "text-xl" : "text-2xl"
        } transition-all duration-200`}
      >
        New Arrivals
      </h1>
      <div className="flex items-center gap-6">
        <DrawerFilter />
        <SortBy />
      </div>
    </div>
  );
};

export default StickyBase;

export function SortBy() {
  const [position, setPosition] = React.useState("bottom");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex space-x-2 items-center">
          <span className="text-lg">Sort By</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        <DropdownMenuLabel>Sort</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
