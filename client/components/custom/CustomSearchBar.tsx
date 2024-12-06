import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {  X } from "lucide-react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useSearch from "@/hooks/useSearch";
const ImageBlurComponent = dynamic(
  () => import("@/components/common/ImageBlur")
);
const CustomSearchBar = ({
  className,
  handleToggle,
  searchContainerRef,
  toggleSearch,
}: {
  className?: string;
  handleToggle: () => void;
  searchContainerRef: React.RefObject<HTMLDivElement>;
  toggleSearch: boolean;
}) => {
  const { handleChange, searchItem } = useSearch();
  const [productContainers, setProductContainers] = useState<
    ProductsProps[] | []
  >([]);
  const queryClient = useQueryClient();
  const handleSearchQuery = useQuery({
    queryKey: ["searchQuery"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5913/api/product/search-products?query=${searchItem}`
      );
      return res.data;
    },

    enabled: searchItem !== "",
  });

  useEffect(() => {
    if (searchItem) {
      queryClient.invalidateQueries({
        queryKey: ["searchQuery"],
      });
      if (handleSearchQuery.data) {
        setProductContainers(handleSearchQuery.data.products);
      }
    } else {
      setProductContainers([]);
    }
  }, [handleSearchQuery.data, searchItem]);

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
            onChange={handleChange}
            autoFocus={toggleSearch}
          />
        </div>
        <button onClick={handleToggle}>
          <X />
        </button>
      </div>

      <div className="2xl:px-10 px-4  overflow-y-auto max-h-[calc(80vh-64px)]">
        <div className="space-y-4 py-5 ">
          <div className="flex container justify-evenly max-md:flex-col gap-10 pb-10">
            <div className="basis-[20%] ">
              <ul>
                <li className="text-2xl font-medium mb-4">Top searches</li>
                <li className="text-xl mb-2 font-normal text-neutral-600 ">
                  Jordan
                </li>
                <li className="text-xl mb-2 font-normal text-neutral-600 cursor-pointer">
                  Puma
                </li>
                <li className="text-xl mb-2 font-normal text-neutral-600 cursor-pointer">
                  Vans
                </li>
                <li className="text-xl mb-2 font-normal text-neutral-600 cursor-pointer">
                  Vans Ari3
                </li>
                <li className="text-xl mb-2 font-normal text-neutral-600 cursor-pointer">
                  Jordan 1
                </li>
                <li className="text-xl mb-2 font-normal text-neutral-600 cursor-pointer">
                  Hot Breaks
                </li>
              </ul>
            </div>
            {/* Display Search Results */}
            <div className="grid transition-all duration-200 flex-1 max-lg:grid-cols-3 max-sm:grid-cols-2 grid-cols-4 gap-3">
              {searchItem && productContainers?.length ? (
                productContainers.slice(0, 10).map((prod) =>
                  prod?.variants?.map((variant) => (
                    <div key={`${prod._id}-${variant._id}`}>
                      <ImageBlurComponent
                        src={variant.image}
                        alt={prod.name}
                        width={350}
                        height={400}
                      />
                      <small className="text-neutral-600 tracking-wider mb-4">
                        {prod.brand}
                      </small>
                      <h3 className="text-lg text-neutral-900 font-medium">
                        {prod.name}
                      </h3>
                      <p className="mt-2">
                        GHS{" "}
                        {variant.price.toLocaleString("en", {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  ))
                )
              ) : (
                <p className="text-center col-span-full">Nothing here</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomSearchBar;
