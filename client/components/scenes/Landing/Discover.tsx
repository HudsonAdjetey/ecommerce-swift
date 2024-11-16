import ImageBlur from "@/components/common/ImageBlur";
import { BannerImages } from "@/constants/img.constants";
import React from "react";

const Discover = () => {
  return (
    <article className="max-sm:mt-20 mt-32  ">
      <h3 className="text-5xl text-center max-sm:text-3xl">
        Discover More Than Just Fashion
      </h3>
      <ImageBlur
        src={BannerImages.BannerImage2}
        width={1000}
        height={460}
        alt="line up sneakers"
        className="w-full h-[400px] mt-10"
        sizes="(max-width:768px) 60vw, 80vw"
      />
    </article>
  );
};

export default Discover;
