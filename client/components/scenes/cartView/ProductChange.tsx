import React from "react";

const ProductChange = ({
  quantity,
  price,
}: {
  quantity: number;
  price: number;
}) => {
  console.log(price);
  return (
    <div className="flex   items-center  max-md:mt-4 max-md:w-full ">
      <div className="flex self-center gap-3">
        <button className="w-12 p-2 h-7 flex items-center justify-center border border-neutral-400 rounded-xl font-semibold">
          +
        </button>
        <span className="text-xl ">{quantity}</span>
        <button className="w-12 p-2 h-7 flex items-center justify-center border border-neutral-400 rounded-xl font-semibold">
          -
        </button>
      </div>
      <div className="flex items-center gap-1">
        <p className="text-custom-black text-lg">{"size"}</p>
        <p className="text-2xl bg-red-500">Ghs {price}</p>
      </div>
    </div>
  );
};

export default ProductChange;
