// "use client";
// import CartBtn from "@/components/custom/CartBtn";
// import { ArrowRightIcon, Heart } from "lucide-react";
// import dynamic from "next/dynamic";
// import { StaticImageData } from "next/image";
// import Link from "next/link";
// import { useState } from "react";

// const CustomImageBlur = dynamic(() => import("@/components/common/ImageBlur"), {
//   ssr: false,
// });

// interface InfoDisplayProps {
//   currentProduct?: ProductContainerType;
//   activeProduct: ActiveProductType;
//   selectedSize: string;
//   setSelectedSize: (size: string) => void;
//   activId?: number;
//   handleActiveId: (id: string) => void;
// }

// const InfoDisplay: React.FC<InfoDisplayProps> = ({
//   currentProduct,
//   activeProduct,
//   selectedSize,
//   setSelectedSize,
//   handleActiveId,
//   activId,
// }) => {
//   const [activeImage, setActiveImage] = useState<StaticImageData | undefined>(
//     currentProduct?.image
//   );

//   return currentProduct ? (
//     <section className="flex gap-10 bg-[#EFEFEF] max-lg:flex-col p-10 w-full">
//       <section className="lg:w-1/2 flex flex-col gap-10 items-center">
//         <div className="h-[400px] ">
//           <CustomImageBlur
//             src={activeImage || ""}
//             alt={currentProduct.name}
//             className="w-full h-full object-contain"
//             sizes="(max-width:768px) 45vw"
//             width={300}
//             height={400}
//           />
//         </div>
//         <div className="flex items-center gap-3 flex-wrap">
//           <button
//             className={`w-[90px] h-[60px] ${
//               Number(currentProduct.id) === activId
//                 ? "border-[3px]  border-black"
//                 : "border-2 border-gray-500"
//             } rounded-md overflow-hidden`}
//             onClick={() => {
//               setActiveImage(currentProduct.image);
//               handleActiveId(currentProduct.id);
//             }}
//           >
//             <CustomImageBlur
//               src={currentProduct.image}
//               alt={currentProduct.name}
//               className="w-full h-full object-cover"
//               width={90}
//               height={90}
//               sizes="(max-width:768px) 35vw, 45vw"
//             />
//           </button>
//           {currentProduct.variants &&
//             currentProduct.variants.map((vari) => {
//               return (
//                 <button
//                   key={vari.id}
//                   className={`w-[90px] h-[60px] ${
//                     vari.id === activId
//                       ? "border-[3px]  border-black"
//                       : "border-2 border-gray-500"
//                   } rounded-md overflow-hidden`}
//                   onClick={() => {
//                     setActiveImage(vari.image);
//                     handleActiveId(Number(vari.id));
//                   }}
//                 >
//                   <CustomImageBlur
//                     src={vari.image}
//                     alt={vari.name}
//                     className="w-full h-full object-cover"
//                     width={90}
//                     height={90}
//                     sizes="(max-width:768px) 35vw, 45vw"
//                   />
//                 </button>
//               );
//             })}
//         </div>
//       </section>

//       <section className="lg:w-1/2 flex-col">
//         <div className="mb-6">
//           <h1 className="text-3xl font-semibold">{activeProduct.name}</h1>
//         </div>
//         <div>
//           <p className="text-base text-neutral-800 font-medium">Select Size</p>
//           <ul className="mt-5 mb-10 grid lg:grid-cols-4 max-sm:grid-cols-4 gap-3 w-1/2 max-sm:w-full">
//             {currentProduct.sizesAvailable.map((size) => (
//               <li
//                 key={size}
//                 className={`w-[50px] p-2 h-[50px] text-lg text-center flex items-center justify-center rounded-sm cursor-pointer ${
//                   selectedSize === size
//                     ? "bg-white drop-shadow-md transition-all duration-150"
//                     : ""
//                 }`}
//                 onClick={() => setSelectedSize(size)}
//               >
//                 {size}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <aside className="flex items-center gap-5">
//           <CartBtn
//             className="bg-black text-white w-[200px] max-sm:w-[80%]"
//             product={{
//               ...activeProduct,
//               size: selectedSize,
//               totalPrice: activeProduct.price,
//             }}
//           />
//           <h2 className="text-2xl font-semibold">${activeProduct.price}</h2>
//         </aside>

//         <div className="my-10">
//           <div className="flex justify-between gap-3 mb-5">
//             <Link
//               href="#"
//               className="lg:hover:underline max-sm:underline flex items-center gap-3"
//             >
//               <span>View Product Details</span>
//               <ArrowRightIcon color="gray" className="max-sm:hidden" />
//             </Link>
//             <Link
//               href="#"
//               className="lg:hover:underline max-sm:underline flex items-center gap-3"
//             >
//               <span>Reviews</span>
//               <ArrowRightIcon color="gray" className="max-sm:hidden" />
//             </Link>
//           </div>

//           <div className="my-10">
//             <div className="flex max-sm:flex-col-reverse items-center gap-3 justify-between">
//               <Link
//                 href="#"
//                 className="lg:hover:underline max-sm:underline flex items-center gap-3"
//               >
//                 <span>Get Help</span>
//                 <ArrowRightIcon color="gray" className="max-sm:hidden" />
//               </Link>
//               <button className="text-lg max-sm:w-full flex items-center gap-3 bg-white text-black py-4 px-4 w-[200px] justify-center font-medium rounded-full">
//                 <Heart color="gray" fill="gray" />
//                 Favorite
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </section>
//   ) : (
//     <>No products available</>
//   );
// };

// export default InfoDisplay;
import React from 'react'

const InfoDisplay = () => {
  return (
    <div>InfoDisplay</div>
  )
}

export default InfoDisplay