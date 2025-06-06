"use client";
import Footer from "@/components/common/Footer";
import InfoCustomer from "@/components/scenes/productPage/InfoCustomer";
import InfoDisplay from "@/components/scenes/productPage/InfoDisplay";
import SimilarProducts from "@/components/scenes/productPage/SimilarProducts";
import TabsDescription from "@/components/scenes/productPage/TabsDescription";
import { api } from "@/lib/actions/api.action";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const searchId = useSearchParams().get("id");
  const auth = useAuth();
  const [productContainer, setProductContainer] = useState<
    ProductsProps | undefined
  >(undefined);
  const [recommededProduct, setRecommendedProducts] = useState<
    RecommendataionProps[] | []
  >([]);
  const fetchProductById = useQuery({
    queryKey: ["product", searchId],
    queryFn: async () => {
      const token = await auth.getToken();
      const response = await api.get(
        `product/get-productsId/${searchId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return await response.data;
    },
    refetchInterval: 3600000,
  });
  const searchType = useSearchParams().get("type");

  const [selectedSize, setSelectedSize] = useState<string>("");

  useEffect(() => {
    if (fetchProductById.isSuccess && fetchProductById.data) {
      if (
        fetchProductById.data.products.typeMain === searchType &&
        fetchProductById.data.products._id === searchId
      ) {
        setProductContainer(fetchProductById.data.products);
        setRecommendedProducts(fetchProductById.data.recommendations);
      } else {
        setProductContainer(undefined);
      }
    }
  }, [fetchProductById.data, searchType, fetchProductById.isSuccess, searchId]);

  return (
    <main className="bg-white">
      {/* Top section for product view */}
      <InfoDisplay
        currentProduct={productContainer ? productContainer : undefined}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        isLoading={fetchProductById.isLoading ? true : false}
      />
      {/* Product description */}
      <TabsDescription info={productContainer} />

      {/* Recommended products */}
      <SimilarProducts
        recommendedProducts={recommededProduct ? recommededProduct : []}
      />

      {/* Customer information */}
      <InfoCustomer />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Page;
