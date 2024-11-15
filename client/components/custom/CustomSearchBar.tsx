import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

const CustomSearchBar = ({
  className,
  handleToggle,
  searchContainerRef,
}: {
  className?: string;
  handleToggle: () => void;
  searchContainerRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <motion.div
      key="search-overlay"
      initial={{ opacity: 0, top: 20 }}
      animate={{ top: 64, opacity: 1 }}
      exit={{ opacity: 0, top: -10 }}
      transition={{
        duration: 0.3,
        ease: "linear",
      }}
      ref={searchContainerRef}
      className={cn(
        "fixed bg-white w-full max-h-[80vh]  left-0 right-0 z-50 overflow-hidden",
        className
      )}
    >
      {/* Search Bar */}
      <div className="bg-white 2xl:px-10 px-4 flex items-center gap-3">
        <div className="flex-1 flex border-b-2 border-black">
          <input
            type="text"
            className="h-full p-3 w-full focus-within:outline-none focus:outline border-none"
            placeholder="Search Items"
          />
        </div>
        <button onClick={handleToggle}>
          <X />
        </button>
      </div>

      <div className="2xl:px-10 px-4  overflow-y-auto max-h-[calc(80vh-64px)]">
        <div className="space-y-4 py-5 ">
          <p className="text-sm text-center flex items-center gap-3 justify-center font-medium text-black/70">
            <span>Search result empty</span>
            <span>
              <Search size={20} />
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomSearchBar;
