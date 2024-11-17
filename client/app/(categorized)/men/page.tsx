"use client";
import dynamic from "next/dynamic";
const ImageBlur = dynamic(() => import("@/components/common/ImageBlur"), {
  ssr: false,
});
import React from "react";
import {
  HeroMenEssential,
  MenGrid,
  MenImages,
  productsImages,
} from "@/constants/img.constants";
import GridImageContent from "@/components/common/GridImageContent";
import CardBoard from "@/components/custom/Card";
import Footer from "@/components/common/Footer";

const page = () => {
  return (
    <main className="bg-white min-h-screen">
      <div className="pt-10">
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
      <div className="container">
        <p className="text-2xl max-sm:text-xl mb-5 mt-16">
          Shop the Essentials
        </p>

        <div className="flex item-center gap-5 max-md:flex-col">
          <div className="flex flex-col gap-8">
            <ImageBlur
              src={HeroMenEssential.HeroMenEssentialShoe}
              alt="men's shoe essential"
              className=" w-full"
            />
            <span className="text-xl max-sm:text-base font-medium">Shoe</span>
          </div>
          <div className="flex select-none flex-col gap-8">
            <ImageBlur
              src={HeroMenEssential.HeroMenEssentialWear}
              alt="men's shoe essential"
              className=" w-ful "
            />
            <span className="text-xl max-sm:text-base font-medium">
              Clothing
            </span>
          </div>
          <div className="flex flex-col gap-8">
            <ImageBlur
              src={HeroMenEssential.HeroMenEssentialBag}
              alt="men's shoe essential"
              className=" w-full"
            />
            <span className="text-xl max-sm:text-base font-medium">Bag</span>
          </div>
        </div>
      </div>
      <div className="grid mt-20 grid-cols-1 md:grid-cols-2">
        <GridImageContent btnContent="Go Shop Now" imgUrl={MenGrid.MenGrid1} />
        <GridImageContent btnContent="Go Shop Now" imgUrl={MenGrid.MenGrid2} />
        <GridImageContent btnContent="Go Shop Now" imgUrl={MenGrid.MenGrid3} />
        <GridImageContent btnContent="Go Shop Now" imgUrl={MenGrid.MenGrid4} />
      </div>
      <div className="grid container mb-32 mt-20 grid-cols-4 gap-7 max-md:grid-cols-1">
        <CardBoard
          alt="Nike air pegasus"
          link="/men/air-pegasus"
          price="Ghs 120.00"
          src={productsImages.NIKE_AIR_PEGASUS_BLACK_Men}
          title="Nike Air Pegasus"
        />
        <CardBoard
          alt="nocta"
          link="/men/nocta"
          price="Ghs 124.00"
          src={productsImages.NOCTA_BLUE}
          title="Nocta blue"
        />
        <CardBoard
          alt="Nike air pegasus"
          link="/men/air-pegasus"
          price="Ghs 120.00"
          src={productsImages.VAPORFLY_MEN_BLUE}
          title="Nike Air Pegasus"
        />
        <CardBoard
          alt="Nike air pegasus"
          link="/men/air-pegasus"
          price="Ghs 120.00"
          src={productsImages.HI_SHOE_BLACK}
          title="Nike Air Pegasus"
        />
      </div>
      <Footer />
    </main>
  );
};

export default page;
