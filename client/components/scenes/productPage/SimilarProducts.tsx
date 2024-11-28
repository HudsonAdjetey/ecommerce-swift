// "use client";
// import React from "react";
// import dynamic from "next/dynamic";
// import { useRouter } from "next/navigation";
// import { productsContainer } from "@/dummy/products";
// const ImageBlurComponent = dynamic(
//   () => import("@/components/common/ImageBlur")
// );
// const SimilarProducts = () => {
//   const router = useRouter();

//   return (
//     <section className="p-10 container">
//       <p className="text-2xl max-sm:text-2xl">You Might Also Like</p>

//       <div className="grid-cols-4 gap-6 my-10 max-lg:grid-cols-2 grid">
//         {productsContainer.slice(0, 4)?.map((product, idx) => {
//           return (
//             <div
//               onClick={() => {
//                 // <pathname>?sort=asc
//                 router.replace(
//                   `/products/${product.category}/?id=${product.id}`
//                 );
//               }}
//               key={idx}
//               className="product-card flex flex-col "
//             >
//               {/* Main product image */}
//               <ImageBlurComponent
//                 src={product.image}
//                 alt={product.name}
//                 width={300}
//                 height={300}
//                 className="w-full"
//               />

//               {/* Brand and product variants */}
//               <div className="mt-3 flex max-lg:flex-col max-lg:items-start items-center justify-between">
//                 <p className="text-orange-400 font-medium mb-4">
//                   {product.brand}
//                 </p>
//               </div>

//               {/* Product details */}
//               <div>
//                 <h3 className="text-lg  text-neutral-900 font-medium">
//                   {product.name}
//                 </h3>
//                 <p className="">
//                   GHS{" "}
//                   {product.price.toLocaleString("en", {
//                     minimumFractionDigits: 2,
//                   })}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default SimilarProducts;

import React from "react";

const SimilarProducts = () => {
  return <div>SimilarProducts</div>;
};

export default SimilarProducts;
