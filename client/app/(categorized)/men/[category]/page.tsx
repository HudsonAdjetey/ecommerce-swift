import Footer from "@/components/common/Footer";
import StickyBase from "@/components/common/Navbar/StickyBase";
import React from "react";

const page = () => {
  return (
    <main className="bg-white min-h-screen ">
      <StickyBase />
      <Footer />
    </main>
  );
};

export default page;
