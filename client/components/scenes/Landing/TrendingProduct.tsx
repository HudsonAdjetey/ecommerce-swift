"use client";
import ProductCardMin from "@/components/custom/Product-1-card";
import { api } from "@/lib/actions/api.action";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const TrendingProduct = () => {
  const [trendingContainer, setTrendingContainer] = useState<
    LandingProductsProps[] | []
  >([]);
  const trendingQuery = useQuery({
    queryKey: ["trendingproducts"],
    queryFn: async () => {
      const res = await api.get(
        "/product/product-trending"
      );
      return res.data;
    },
  });

  useEffect(() => {
    if (trendingQuery.data) {
      setTrendingContainer(trendingQuery.data.trendingProducts);
    }
  }, [trendingQuery.data]);

  return (
    <div>
      <ProductCardMin arr={trendingContainer} />
    </div>
  );
};

export default TrendingProduct;
