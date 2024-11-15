"use client";
import Navbar from "@/components/common/Navbar/nav";
import DescriptionHome from "@/components/scenes/Landing/DescriptionHome";
import Hero from "@/components/scenes/Landing/Hero";
import ProductGallery from "@/components/scenes/Landing/ProductGallery";
import React from "react";
const page = () => {
  return (
    <main className="bg-white min-h-screen w-full">
      <Navbar />
      <Hero />
      <DescriptionHome />
      <ProductGallery />
    </main>
  );
};

export default page;
