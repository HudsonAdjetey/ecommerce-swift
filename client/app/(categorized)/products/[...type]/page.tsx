"use client";
import Footer from "@/components/common/Footer";
import InfoCustomer from "@/components/scenes/productPage/InfoCustomer";
import InfoDisplay from "@/components/scenes/productPage/InfoDisplay";
import SimilarProducts from "@/components/scenes/productPage/SimilarProducts";
import TabsDescription from "@/components/scenes/productPage/TabsDescription";
import { informationProducts, productsContainer } from "@/dummy/products";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const searchId = useSearchParams().get("id");
  const [productContainer, setProductContainer] = useState<
    ProductsProps | undefined
  >(undefined);
  const fetchProductById = useQuery({
    queryKey: ["product", searchId],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5913/api/product/get-productsId/${searchId}`
      );

      return await response.data;
    },
    refetchInterval: 3600000,
  });
  const [loading, setIsLoading] = useState(false);
  const searchType = useSearchParams().get("type");
  const [activeProduct, setActiveProduct] = useState<ActiveProductType>({
    id: "",
    name: "",
    color: "",
    quantity: 1,
    size: "",
    image: "",
    price: 0,
    total: 0,
  });

  const [selectedSize, setSelectedSize] = useState<string>("");

  useEffect(() => {
    if (fetchProductById.isSuccess && fetchProductById.data) {
      if (
        fetchProductById.data.products.typeMain === searchType &&
        fetchProductById.data.products._id === searchId
      ) {
        setProductContainer(fetchProductById.data.products);
      } else {
        setProductContainer(undefined);
      }
    }
  }, [fetchProductById.data, searchType, fetchProductById.isSuccess]);

  useEffect(() => {
    if (fetchProductById.isLoading) {
      setIsLoading(true);
    } else if (fetchProductById.isSuccess || fetchProductById.isError) {
      setIsLoading(false);
    }
  }, [
    fetchProductById.isLoading,
    fetchProductById.isSuccess,
    fetchProductById.isError,
  ]);

  return (
    <main className="bg-white">
      {/* Top section for product view */}
      <InfoDisplay
        activeProduct={activeProduct}
        currentProduct={productContainer ? productContainer : undefined}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        isLoading= {loading}
      />
      {/* Product description */}
      <TabsDescription info={productContainer} />

      {/* Recommended products */}
      <SimilarProducts />

      {/* Customer information */}
      <InfoCustomer />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Page;
