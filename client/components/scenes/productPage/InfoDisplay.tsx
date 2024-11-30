"use client";
import CartBtn from "@/components/custom/CartBtn";
import { ArrowRightIcon, Heart } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CustomImageBlur = dynamic(() => import("@/components/common/ImageBlur"), {
  ssr: false,
});

interface InfoDisplayProps {
  currentProduct?: ProductsProps;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  isLoading: boolean;
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({
  currentProduct,
  selectedSize,
  setSelectedSize,
  isLoading,
}) => {
  const [activeImage, setActiveImage] = useState("");
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [activeProductId, setActiveProductId] = useState<string>("");
  const [activePrice, setActivePrice] = useState<number>(0);
  useEffect(() => {
    if (currentProduct?.variants) {
      if (!activeProductId && currentProduct?.variants?.length > 0) {
        setActiveProductId(currentProduct.variants[0].variantId);
      }
      setActivePrice(currentProduct.variants[0].price);
      const product = currentProduct.variants.find(
        (variant) => variant.variantId.toString() === activeProductId.toString()
      );

      if (product) {
        setAvailableSizes(product.size);
      }
    }
  }, [currentProduct?.variants, currentProduct, activeProductId]);
  console.log(activeProductId);
  return !isLoading ? (
    currentProduct ? (
      <section className="flex gap-10 bg-[#EFEFEF] max-lg:flex-col p-10 w-full">
        <section className="lg:w-1/2 flex flex-col gap-10 items-center">
          <div className="h-[400px] ">
            {currentProduct.variants &&
              currentProduct.variants.slice(0, 1).map((img, idx) => {
                return (
                  <CustomImageBlur
                    key={idx}
                    src={activeImage || img.image}
                    alt={currentProduct.name}
                    className="w-full h-full object-contain"
                    sizes="(max-width:768px) 45vw"
                    width={300}
                    height={400}
                  />
                );
              })}
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {currentProduct.variants &&
              currentProduct.variants.map((vari) => {
                return (
                  <button
                    key={vari.variantId}
                    className={`w-[90px] h-[100px]  rounded-md overflow-hidden`}
                    onClick={() => {
                      setActiveImage(vari.image);
                      setAvailableSizes(vari.size);
                      setActivePrice(vari.price);
                      if (!vari.size.includes(selectedSize)) {
                        setSelectedSize("");
                      }
                    }}
                  >
                    <CustomImageBlur
                      src={vari.image}
                      alt={currentProduct.name}
                      className="w-full h-full object-cover"
                      width={90}
                      height={120}
                      sizes="(max-width:768px) 35vw, 45vw"
                    />
                  </button>
                );
              })}
          </div>
        </section>

        <section className="lg:w-1/2 flex-col">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold">{currentProduct.name}</h1>
            <p className="text-base text-neutral-500 ">
              {currentProduct.description}
            </p>
            <p className="text-base font-medium mt-1 text-green-500">
              Available for {currentProduct.category}
            </p>
          </div>
          <div>
            <p className="text-base text-neutral-800 font-medium">
              Select Size
            </p>
            <ul className="mt-3 mb-10  flex flex-wrap gap-3 w-1/2 max-sm:w-full">
              {currentProduct.availableSizes.map((size) => {
                const isAvailable = availableSizes.includes(size);

                return (
                  <li key={size}>
                    <button
                      className={`w-[50px] p-2 h-[50px] text-lg text-center flex items-center justify-center rounded-sm  disabled:text-neutral-400 disabled:cursor-not-allowed cursor-pointer  ${
                        selectedSize === size && "bg-white drop-shadow-md"
                      }`}
                      onClick={() => {
                        if (isAvailable) {
                          setSelectedSize(size);
                        }
                      }}
                      disabled={!isAvailable}
                    >
                      {size}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <aside className="flex items-center gap-5">
            <CartBtn
              className="bg-black text-white w-[200px] max-sm:w-[80%]"
              product={{
                productId: currentProduct._id,
                variantId: activeProductId,
                size: selectedSize,
              }}
            />
            <h2 className="text-2xl font-semibold">
              Ghs{" "}
              {activePrice.toLocaleString("en", {
                maximumFractionDigits: 2,
              })}
            </h2>
          </aside>

          <div className="my-10">
            <div>
              <div className="flex max-sm:flex-col-reverse items-center gap-3 justify-between">
                <Link
                  href="#"
                  className="lg:hover:underline max-sm:underline flex items-center gap-3"
                >
                  <span>Get Help</span>
                  <ArrowRightIcon color="gray" className="max-sm:hidden" />
                </Link>
                <button className="text-lg max-sm:w-full flex items-center gap-3 bg-white text-black py-4 px-4 w-[200px] justify-center font-medium rounded-full">
                  <Heart color="gray" fill="gray" />
                  Favorite
                </button>
              </div>
            </div>
          </div>
        </section>
      </section>
    ) : (
      <div className="py-20 text-center flex items-center justify-center">
        No products available
      </div>
    )
  ) : (
    <div className="w-screen min-h-screen overflow-hidden fixed z-50 inset-0 flex items-center justify-center bg-white ">
      <div className="loaders " />
    </div>
  );
};

export default InfoDisplay;
InfoDisplay.displayName = "Info";
