import React from "react";

const ProductChange = () => {
  return (
    <div className="flex items-center justify-between max-md:mt-4 max-md:w-full ">
      <div className="flex gap-3">
        <button className="w-12 p-2 h-7 flex items-center justify-center border border-neutral-400 rounded-xl font-semibold">
          +
        </button>
        <span className="text-xl ">1</span>
        <button className="w-12 p-2 h-7 flex items-center justify-center border border-neutral-400 rounded-xl font-semibold">
          -
        </button>
      </div>
      <div className="max-md:flex hidden items-center  gap-1">
        <p className="text-custom-black text-lg">x1</p>
        <p className="text-2xl">Ghs4500</p>
      </div>
    </div>
  );
};

export default ProductChange;
