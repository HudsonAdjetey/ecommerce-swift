import React from "react";
import SwiperCustom from "./swiper-custom";
import CardBoard from "./Card";

const ProductCardMin = ({ arr }: { arr: ProductListLandingProps[] }) => {
  return (
    <div className="max-sm:my-10 my-20 container">
      <SwiperCustom textContent="Amazing Taste In Fashion">
        <div className="flex gap-7 w-full">
          {Array.from(arr).map((item, idx) => {
            return (
              <CardBoard
                key={idx}
                src={item.src}
                title={item.title}
                alt={item.alt}
                link={item.alt}
                price={item.price}
                className="flex max-sm:w-[280px] max-sm:h-[280px] w-[380px] h-[380px]"
              />
            );
          })}
        </div>
      </SwiperCustom>
    </div>
  );
};

export default ProductCardMin;
