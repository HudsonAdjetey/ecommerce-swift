import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import Link from "next/link";
import { Eye } from "lucide-react";
import { StaticImageData } from "next/image";

const ImageBlurComponent = dynamic(
  () => import("@/components/common/ImageBlur")
);

const CardBoard = ({
  src,
  alt,
  title,
  price,
  link,
  className,
}: {
  src: string | StaticImageData;
  alt: string;
  title: string;
  price: string;
  link: string;
  className?: string;
}) => {
  return (
    <div>
      <div
        className={` ${className} flex relative overflow-hidden rounded-lg shadow-md`}
      >
        <ImageBlurComponent
          src={src}
          alt={alt}
          width={500}
          height={600}
          className="h-full w-full"
          sizes="(max-width: 768px) 46vw, 55vw"
        />
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          className="absolute inset-0 flex items-end p-4  max-sm:hidden"
        >
          <button className=" flex items-center gap-3 justify-center bg-white py-4 px-2 rounded-full w-full font-semibold">
            <span>
              <Eye size={20} />
            </span>
            <span> View Product</span>
          </button>
        </motion.div>
      </div>
      <article className="mt-5">
        <p className="text-xl max-sm:text-lg max-sm:font-medium max-sm:leading-6 mt-4 font-semibold text-neutral-800">
          {title}
        </p>
        <p className="text-lg max-sm:text-base font-medium text-neutral-700">
          {price}
        </p>
        <Link href={link} className="hidden max-sm:flex hover:underline mt-2">
          View Product
        </Link>
      </article>
    </div>
  );
};

export default CardBoard;
