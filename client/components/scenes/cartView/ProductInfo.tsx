import dynamic from "next/dynamic";
import { StaticImageData } from "next/image";
import React from "react";
const ImageComponent = dynamic(() => import("@/components/common/ImageBlur"));
const ProductInfo = ({
  productName,
  variantId,
  src,
  size,
}: {
  productName: string;
  variantId: string;
  src: StaticImageData;
  size: string;
}) => {
  return (
    <div className="flex items-center  gap-4 ">
      <div className="h-[120px]   w-[120px]">
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
        </div>
        <p className="space-x-2">
          <span>Size:</span>
          <span>{size}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
