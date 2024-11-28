"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
const ImageBlurComponent = dynamic(
  () => import("@/components/common/ImageBlur")
);

const ProductCard: React.FC<{
  product: ProductsProps;
  isVariant?: boolean;
}> = ({ product }) => {
  const [activeImage, setActiveImage] = useState("");
  // Reset the image when the product changes
  const [activePrice, setActivePrice] = useState(
    (product.variants && product.variants[0].price) || ""
  );

  const router = useRouter();

  return (
    <div className="product-card flex flex-col cursor-pointer">
      {/* Main product image */}
      <span
        onClick={() => {
          router.push(`/products/${product.category}?id=${product.id}`);
        }}
      >
        {product.variants &&
          product.variants.slice(0, 1).map((img, idx) => {
            return (
              <ImageBlurComponent
                key={idx}
                src={activeImage || img.image}
                alt={product.name}
                width={300}
                height={300}
                className="w-full"
              />
            );
          })}
      </span>

      {/* Brand and product variants */}
      <div className="mt-3 flex max-lg:flex-col max-lg:items-start items-center justify-between">
        <p className="text-orange-400 font-medium mb-4">{product.brand}</p>

        {/* Variants (if any) */}
        {product.variants && (
          <div className="inline-flex items-center mb-2 space-x-3">
            {product.variants.slice(0, 3).map((variant, idx) => (
              <div key={idx}>
                <div
                  onClick={() => {
                    setActiveImage(variant.image);
                    setActivePrice(variant.price);
                  }}
                  className="variant-thumbnail"
                >
                  {" "}
                  <ImageBlurComponent
                    src={variant.image}
                    alt={variant.alt}
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px] object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product details */}
      <div>
        <h3 className="text-lg  text-neutral-900 font-medium">
          {product.name}
        </h3>
        <p className="">
          GHS{" "}
          {activePrice.toLocaleString("en", {
            minimumFractionDigits: 2,
          })}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
