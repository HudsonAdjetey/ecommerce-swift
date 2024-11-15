import React from "react";
import dynamic from "next/dynamic";
import { HeroImgs } from "@/constants/img.constants";
const ImageBlur = dynamic(() => import("@/components/common/ImageBlur"), {
  ssr: false,
});

const Hero = () => {
  return (
    <section>
      <div>
        <div className="h-screen relative overflow-hidden">
          <ImageBlur
            src={HeroImgs.NikeShop}
            alt="hero image of a sneaker"
            width={1000}
            height={100}
            className="w-full h-full"
            sizes="(max-width: 768px) 40vw, 60vw"
          />

          <span className="absolute inset-0 bg-black/30" />
          <figure className="absolute top-1/2 inset-x-0 p-10">
            <figcaption>
              <h1 className="text-6xl text-white font-bold max-md:text-4xl max-md:font-semibold mb-3">
                Nike Shop
              </h1>
              <p className="text-xl text-white">
                We have all your wearables on our website
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Hero;
