import React from "react";
import Footer from "@/components/common/Footer";
import StickyBase from "@/components/common/Navbar/StickyBase";
import ProductList from "@/components/scenes/productPage/ProductList";
import { productsDummy } from "@/dummy/products";

const Pages = () => {
  return (
    <main className="bg-white min-h-screen ">
      <StickyBase customText="Men" />
      <ProductList products={productsDummy} />
      <Footer />
    </main>
  );
};

export default Pages;
