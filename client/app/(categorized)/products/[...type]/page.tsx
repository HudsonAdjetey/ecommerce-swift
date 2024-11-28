// "use client";
// import Footer from "@/components/common/Footer";
// import InfoCustomer from "@/components/scenes/productPage/InfoCustomer";
// import InfoDisplay from "@/components/scenes/productPage/InfoDisplay";
// import SimilarProducts from "@/components/scenes/productPage/SimilarProducts";
// import TabsDescription from "@/components/scenes/productPage/TabsDescription";
// import { informationProducts, productsContainer } from "@/dummy/products";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// const Page = () => {
//   const searchId = useSearchParams().get("id");

//   const [activeProduct, setActiveProduct] = useState<ActiveProductType>({
//     id: "",
//     name: "",
//     color: "",
//     quantity: 1,
//     size: "",
//     image: "",
//     price: 0,
//     total: 0,
//   });

//   const [selectedSize, setSelectedSize] = useState<string>("");
//   const currentProduct = productsContainer.find(
//     (product) => product.id === searchId
//   );
//   const [activeId, setActiveId] = useState(currentProduct?.id);

//   const productInfo = informationProducts.find(
//     (info) => info.refId === currentProduct?.id
//   );

//   useEffect(() => {
//     setActiveId(currentProduct?.id);
//   }, [currentProduct?.id]);

//   // handleActiveId
//   const handleActiveId = (id: string) => {
//     setActiveId(id);
//   };

//   useEffect(() => {
//     if (currentProduct) {
//       const selectedPro =
//         currentProduct.id === activeId
//           ? currentProduct
//           : currentProduct.variants?.find((vari) => vari.id === activeId);

//       if (selectedPro) {
//         setActiveProduct({
//           id: selectedPro.id,
//           name: selectedPro.name,
//           color: selectedPro.color,
//           quantity: currentProduct.quantity || 1,
//           size: selectedSize || currentProduct.sizesAvailable[0],
//           image: selectedPro.image,
//           price: currentProduct.price,
//           total: currentProduct.price,
//           alt: selectedPro.alt,
//           category: currentProduct.category,
//         });
//       }
//     }
//   }, [currentProduct, selectedSize, activeId]);

//   return (
//     <main className="bg-white">
//       {/* Top section for product view */}
//       <InfoDisplay
//         activeProduct={activeProduct}
//         currentProduct={currentProduct}
//         selectedSize={selectedSize}
//         setSelectedSize={setSelectedSize}
//         activId={activeId}
//         handleActiveId={handleActiveId}
//       />
//       {/* Product description */}
//       <TabsDescription info={productInfo} />

//       {/* Recommended products */}
//       <SimilarProducts />

//       {/* Customer information */}
//       <InfoCustomer />

//       {/* Footer */}
//       <Footer />
//     </main>
//   );
// };

// export default Page;

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page