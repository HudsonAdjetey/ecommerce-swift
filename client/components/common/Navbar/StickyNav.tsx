import Link from "next/link";
import React from "react";

const StickyNav = () => {
  return (
    <div className="flex items-center justify-between max-md:items-start py-4 sticky  bg-white z-[9999] px-4 2xl:px-10 max-md:flex-col gap-4">
      <p className="text-xl">Men</p>
      <ul className="flex text-sm font-medium text-neutral-600  items-center flex-1 justify-center space-x-6">
        <li>
          <Link hrefLang="en" href="/men/shoes">
            Shoes
          </Link>
        </li>
        <li>
          <Link hrefLang="en" href="/men/shoes">
            Clothing
          </Link>
        </li>
        <li>
          <Link hrefLang="en" href="/men/shoes">
            Accessories
          </Link>
        </li>
        <li>
          <Link hrefLang="en" href="/men/shoes">
            Flash Sales
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default StickyNav;
