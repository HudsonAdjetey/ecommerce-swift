import React from "react";
import dynamic from "next/dynamic";
import { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

const ImageBlur = dynamic(() => import("@/components/common/ImageBlur"), {
  ssr: false,
});
const GridImageContent: React.FC<{
  imgUrl: StaticImageData;
  textFirstString?: string;
  textSecond?: string;
  btnContent?: string;
  href?: string;
  cls?: string;
}> = ({ imgUrl, cls, textFirstString, textSecond, btnContent, href }) => {
  return (
    <div className="relative h-[550px]  max-md:h-[450px] w-full">
      <ImageBlur
        src={imgUrl}
        alt=""
        className="w-full h-full"
        sizes="(max-width: 768px) 50vw, 70vw object-cover"
      />

      <figure className="inset-0 bg-black/30 p-5 flex items-end absolute">
        <figcaption className="text-white flex-col gap-6  items-start m-5">
          <div>
            <p className="text-xl font-semibold">{textFirstString}</p>
            <p className="text-lg font-medium">{textSecond}</p>
          </div>
          <div className="mt-10">
            <a
              href={href}
              className={cn(
                "cs_btncustom mt-6 py-4 text-sm font-semibold",
                cls
              )}
            >
              {btnContent}
            </a>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default GridImageContent;
