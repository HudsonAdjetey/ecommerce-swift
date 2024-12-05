import { Copy } from "lucide-react";
import dynamic from "next/dynamic";
import { StaticImageData } from "next/image";
import React from "react";
const ImageComponent = dynamic(() => import("@/components/common/ImageBlur"));
const ProductInfo = ({
  handleCopy,
  productName,
  variantId,
  src,
  color,
}: {
  handleCopy: (text: string) => void;
  productName: string;
  variantId: string;
  src: StaticImageData;
  color: string;
}) => {
  return (
    <div className="flex items-center  gap-4 ">
      <div className="h-[120px]  bg-red-500 w-[120px]">
        <ImageComponent
          src={src}
          alt={productName ? productName : "product image"}
          width={300}
          height={200}
        />
      </div>
      <div className="ml-4 space-y-2">
        <h3>{productName}</h3>
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{variantId}</span>
          <span
            onClick={() => handleCopy(variantId)}
            className="cursor-pointer"
          >
            <Copy className="" size={17} />
          </span>
        </div>
        <p className="space-x-2">
          <span>Color:</span>
          <span>{color}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
