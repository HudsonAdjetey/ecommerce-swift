"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/components/common/Footer";
import StickyBase from "@/components/common/Navbar/StickyBase";
import ProductList from "@/components/scenes/productPage/ProductList";
import { productsDummy } from "@/dummy/products";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Pages = () => {
  const [page, setPage] = useState(1);
  const useFetchQuery = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5913/api/product/get-products/?category=men&page=${page}`
      );
      return res.data;
    },
  });
  const [productContainer, setProductsContainer] = useState([]);
  const handleScroll = () => {
    const bottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight;
    if (bottom) {
      setPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (useFetchQuery.data && useFetchQuery.isSuccess) {
      setProductsContainer(useFetchQuery.data.products);
    }
  }, [useFetchQuery.data, productContainer]);
  console.log(productContainer);

  return (
    <main className="bg-white overflow-x-clip min-h-screen relative">
      <StickyBase customText="Men" />
      {useFetchQuery.isLoading ? (
        <div className="w-screen min-h-screen overflow-hidden absolute inset-0 flex items-center justify-center bg-white ">
          <div className="loaders " />
        </div>
      ) : (
        <ProductList products={productContainer} />
      )}

      <Footer />
    </main>
  );
};

export default Pages;
