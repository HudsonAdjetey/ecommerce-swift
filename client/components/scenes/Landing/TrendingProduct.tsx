import ProductCardMin from "@/components/custom/Product-1-card";
import { LandingPageContent } from "@/dummy";
import React from "react";

const TrendingProduct = () => {
  return (
    <div>
      <ProductCardMin arr={LandingPageContent} />
    </div>
  );
};

export default TrendingProduct;
