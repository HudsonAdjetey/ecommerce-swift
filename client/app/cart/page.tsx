import Navbar from "@/components/common/Navbar/nav";
import CartComp from "@/components/scenes/cartView/CartComp";
import React from "react";

const page = () => {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <CartComp />
    </main>
  );
};

export default page;
