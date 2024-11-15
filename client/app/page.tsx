"use client";
import Navbar from "@/components/common/Navbar/nav";
import Hero from "@/components/scenes/Hero";
import React from "react";
const page = () => {
  return (
    <main className="bg-white min-h-screen w-full">
      <Navbar />
      <Hero />
    </main>
  );
};

export default page;
