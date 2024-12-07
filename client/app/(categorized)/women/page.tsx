"use client";
import dynamic from "next/dynamic";
const ImageBlur = dynamic(() => import("@/components/common/ImageBlur"));
import React from "react";
import {
  HeroEssentialWome,
  MenImages,
  WomenMenGrid,
} from "@/constants/img.constants";
import GridImageContent from "@/components/common/GridImageContent";
import Footer from "@/components/common/Footer";

const page = () => {
  return (
    <main className="bg-white min-h-screen">
      <div className="pt-10">
        <h1 className="text-5xl max-w-lg max-sm:max-w-md mx-auto max-sm:text-3xl">
          Grand In Style
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
      <div className="container">
        <p className="text-2xl max-sm:text-xl mb-5 mt-16">
          Shop the Essentials
        </p>

        <div className="flex item-center gap-5 max-md:flex-col">
          <div className="flex flex-col gap-8">
            <ImageBlur
              src={HeroEssentialWome.HeroWomeEssentialShoe}
              alt="men's shoe essential"
              className=" w-full"
            />
            <span className="text-xl max-sm:text-base font-medium">Shoe</span>
          </div>
          <div className="flex select-none flex-col gap-8">
            <ImageBlur
              src={HeroEssentialWome.HeroWomenEssentialWear}
              alt="men's shoe essential"
              className=" w-ful "
            />
            <span className="text-xl max-sm:text-base font-medium">
              Clothing
            </span>
          </div>
          <div className="flex flex-col gap-8">
            <ImageBlur
              src={HeroEssentialWome.HeroWomenEssentialAccessories}
              alt="men's shoe essential"
              className=" w-full"
            />
            <span className="text-xl max-sm:text-base font-medium">
              Accessories
            </span>
          </div>
        </div>
      </div>
      <div className="grid mt-20 grid-cols-1 md:grid-cols-2">
        <GridImageContent
          btnContent="Go Shop Now"
          imgUrl={WomenMenGrid.WomenMenGrid1}
        />
        <GridImageContent
          btnContent="Go Shop Now"
          imgUrl={WomenMenGrid.WomenMenGrid2}
        />
      </div>
 
      <Footer />
    </main>
  );
};

export default page;
