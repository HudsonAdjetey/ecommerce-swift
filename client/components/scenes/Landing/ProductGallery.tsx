import React from "react";
import dynamic from "next/dynamic";
import { HeroImgs } from "@/constants/img.constants";
import GridImageContent from "@/components/common/GridImageContent";
const ImageBlur = dynamic(() => import("@/components/common/ImageBlur"), {
  ssr: false,
});
const ProductGallery = () => {
  return (
    <section className="max-sm:mt-20 mt-32">
      <div className="flex flex-col items-center my-16">
        <h3 className="text-5xl  font-bold text-center capitalize max-sm:text-3xl">
          Your Mind Holds The Key To Change
        </h3>
        <p className="text-xl text-neutral-600 font-medium my-4 text-center">
          All Brands. Fashion Line.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <GridImageContent
            imgUrl={HeroImgs.Grid1}
            textFirstString="The Custom"
            textSecond="Party Fly"
            btnContent="Purchase"
          />
          <GridImageContent
            imgUrl={HeroImgs.Grid2}
            textFirstString="The Custom"
            textSecond="Party Fly"
            btnContent="Shop Now"
            cls="bg-white text-black hover:bg-white/90"
          />
          <GridImageContent
            imgUrl={HeroImgs.Grid3}
            textFirstString="The Custom"
            textSecond="Party Fly"
            btnContent="Shop Now"
            cls="bg-white text-black hover:bg-white/90"
          />
          <GridImageContent
            imgUrl={HeroImgs.Grid4}
            textFirstString="The Custom"
            textSecond="Party Fly"
            btnContent="Purchase"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;
