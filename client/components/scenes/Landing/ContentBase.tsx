import React from "react";
import dynamic from "next/dynamic";
import { BannerImages } from "@/constants/img.constants";
import CustomBtn from "@/components/custom/CustomBtn";
const ImageBlurComponent = dynamic(
  () => import("@/components/common/ImageBlur")
);

const ContentBase = () => {
  return (
    <div className="max-sm:mt-20 mt-32">
      <div className="flex flex-col items-center my-16">
        <p className="text-5xl font-bold text-center capitalize max-sm:text-3xl ">
          Tell The Story Of Fashion
        </p>
        <p className="text-base font-bold my-4 text-center  ">
          The intention of fashion stems from the brain
        </p>
        <CustomBtn textString="Shop Now" />
      </div>
      <div className="my-10 flex max-lg:flex-col gap-20  items-center pt-10 px-10 bg-black text-white justify-between">
        <div className="max-lg:text-center pb-10">
          <p className="text-4xl font-semibold max-sm:text-2xl">
            Step into the World of Fashion
          </p>
          <p className="text-base font-medium">
            A place where style meets comfort. Elevate your wardrobe with the
            latest trends.
          </p>
          <article className="mt-10">
            <h3 className="text-xl mb-3 font-medium text-white">
              The Transformative Power of Fashion
            </h3>
            <p className="w-[60%] max-lg:w-full font-normal tracking-wide">
              Research shows that dressing well not only boosts confidence but
              can also improve your mood, enhance creativity, and even
              positively influence others&apos; perceptions of you.
            </p>
          </article>
        </div>

        <div className="flex self-end max-lg:self-center max-sm:w-[90%]  w-[600px]">
          <ImageBlurComponent
            src={BannerImages.BannerImage}
            width={300}
            height={350}
            alt="listening music"
            className="w-full object-contain"
            sizes="(max-width:768px) 40vw, 60vw"
          />
        </div>
      </div>
    </div>
  );
};

export default ContentBase;
