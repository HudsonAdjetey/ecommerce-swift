"use client";
import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import React, { useState } from "react";

const ImageBlur: React.FC<ImageProps> = ({
  className,
  src,
  width,
  height,
  alt,
  sizes,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Image
      className={cn(
        "transition duration-300 object-cover object-center",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setIsLoading(false)}
      src={src}
      width={width}
      height={height}
      alt={alt || "An image is being loaded"}
      loading="lazy"
      placeholder="blur"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      sizes={sizes}
      {...props}
    />
  );
};

export default ImageBlur;
