import { Copy } from "lucide-react";
import React from "react";

const ProductInfo = ({
  handleCopy,
}: {
  handleCopy: (text: string) => void;
}) => {
  return (
    <div className="flex items-center  gap-4 ">
      <div className="h-[120px]  bg-red-500 w-[120px]"></div>
      <div className="ml-4 space-y-2">
        <h3>Nike Air Max</h3>
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">343434</span>
          <span onClick={() => handleCopy("343434")} className="cursor-pointer">
            <Copy className="" size={17} />
          </span>
        </div>
        <p className="space-x-2">
          <span>Color:</span>
          <span>White</span>
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
