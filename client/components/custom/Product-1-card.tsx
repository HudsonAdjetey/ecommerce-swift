import React from "react";
import SwiperCustom from "./swiper-custom";
import CardBoard from "./Card";

const ProductCardMin = ({ arr }: { arr: LandingProductsProps[] }) => {
  return (
    <>
      {arr.length > 0 ? (
        <div className="max-sm:my-10 my-20 container">
          <SwiperCustom textContent="Amazing Taste In Fashion">
            <div className="flex gap-7 w-full">
              {Array.from(arr).map((item, idx) => {
                return (
                  <CardBoard
                    key={idx}
                    src={item.variants.image}
                    title={item.productName}
                    alt={item.productName}
                    link={item.productName}
                    price={item.variants.price}
                    id={item.productId}
                    typeMain={item.typeMain}
                    category={item.category}
                    className="flex max-sm:w-[280px] max-sm:h-[280px] w-[380px] h-[380px]"
                  />
                );
              })}
            </div>
          </SwiperCustom>
        </div>
      ) : null}
    </>
  );
};

export default ProductCardMin;
