"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/components/common/Footer";
import StickyBase from "@/components/common/Navbar/StickyBase";
import ProductList from "@/components/scenes/productPage/ProductList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";

const Pages = () => {
  const searchParams = useParams();
  const [page, setPage] = useState(1);
  const [productContainer, setProductsContainer] = useState([]);

  const useFetchQuery = useQuery({
    queryKey: ["products", searchParams.category],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5913/api/product/get-products/?category=men&page=${page}`
      );
      return res.data;
    },
    // refetch when the searchParams changes
  });
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
      const filteredProducts = useFetchQuery.data?.products.filter(
        (pro: ProductsProps) => {
          const params =
            searchParams.category === "all" ? "" : searchParams.category;
          return params === "" ? pro : pro.typeMain === params;
        }
      );
      setProductsContainer(filteredProducts);
    }
  }, [useFetchQuery.data, searchParams.category, useFetchQuery.isSuccess]);

  return (
    <main className="bg-white overflow-x-clip min-h-screen relative">
      <StickyBase customText="men" />
      {useFetchQuery.isLoading && !useFetchQuery.isError ? (
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
