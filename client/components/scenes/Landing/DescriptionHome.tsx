"use client";
import React from "react";
import CustomBtn from "@/components/custom/CustomBtn";
import dynamic from "next/dynamic";
import { HeroImgs } from "@/constants/img.constants";
const ImageBlur = dynamic(() => import("@/components/common/ImageBlur"), {
  ssr: false,
});
const DescriptionHome = () => {
  return (
    <section className=" bg-white container">
      <div
        aria-orientation="horizontal"
        className="my-10 sm:my-20  flex flex-col items-center text-center px-4 "
      >
        <h2 className="text-5xl font-semibold mb-3 tracking-tight">
          All your Desires
        </h2>
        <p className="text-xl max-w-md ">
          Our Mission is to provide you with a wide range of products
        </p>
        <div className="flex gap-6 justify-center my-6">
          <CustomBtn className="hover:bg-black/90" />
          <CustomBtn className="bg-white text-black font-medium border-neutral-400 border hover:bg-transparent" />
        </div>
      </div>

      <div className=" max-lg:flex-col items-center mb-10 gap-10 justify-between flex">
        <div className="w-[40%] relative lg:h-[450px] max-lg:w-full rounded-lg flex ">
          <ImageBlur
            src={HeroImgs.DescHome}
            alt="Sub intro image of a puma sneaker"
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 40vw, 50vw"
          />
          <figure className="absolute inset-0 flex items-end p-4">
            <figcaption>
              <CustomBtn
                textString="Explore Now"
                className="hover:bg-white hover:text-black"
              />
            </figcaption>
          </figure>
        </div>
        <div className="w-1/2 max-lg:w-full mb-10 ">
          <h3 className="text-3xl">Shop the Latest Puma Today</h3>
          <p className="text-base font-medium my-3 max-w-md ">
            Puma is a premium brand shoe that offers an unparalled performance
            and comfort
          </p>
          <h3 className="text-2xl mt-6 mb-4 font-medium">
            Unleash Your Style with Stylish Wears
          </h3>
          <p className="text-base font-normal mt-2 max-w-xl  max-md:w-full">
            Step into the future of comfort and performance with Puma smart
            wear. Combining iconic design with cutting-edge cushioning
            technology, Puma sneakers deliver unbeatable comfort, whether
            you&apos;re hitting the streets or just keeping it casual. Explore a
            variety of bold colors and sleek styles that let you express your
            individuality while staying on top of your game. Elevate your look
            with the perfect fusion of fashion and function.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DescriptionHome;
