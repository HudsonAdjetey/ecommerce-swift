"use client";
import dynamic from "next/dynamic";
const ImageBlur = dynamic(() => import("@/components/common/ImageBlur"), {
  ssr: false,
});
import StickyNav from "@/components/common/Navbar/StickyNav";
import React from "react";
import { MenImages } from "@/constants/img.constants";

const page = () => {
  return (
    <main className="bg-white min-h-screen">
      <StickyNav />
      <div className=" mt-10">
        <h1 className="text-5xl max-w-lg max-sm:max-w-md mx-auto max-sm:text-3xl">
          Adequate In Choices
        </h1>
        <div className="h-[400px] w-full">
          <ImageBlur
            alt=""
            src={MenImages.HeroMenLanding}
            className="w-full flex mt-10 h-full"
            sizes="(max-width:768px) 60vw, 80vw"
          />
        </div>
      </div>
    </main>
  );
};

export default page;
