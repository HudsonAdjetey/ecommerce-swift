import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface SwiperProps {
  children: React.ReactNode;
  textContent?: string;
  cls?: string;
}
const SwiperCustom: React.FC<SwiperProps> = ({
  children,
  textContent,
  cls,
}) => {
  const swiperRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // checking if ther is overflow and then, update the state of the button

  const updateScrollButtons = () => {
    if (swiperRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = swiperRef.current;
      const isOverflowing = scrollWidth > clientWidth;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);

      //   Disable scrolling btns when no overflowing is visible
      if (!isOverflowing) {
        setCanScrollLeft(false);
        setCanScrollRight(false);
      }
    }
  };

  const scrollBy = (offset: number) => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy({
        left: offset,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const swiperElement = swiperRef.current;
    if (swiperElement) {
      swiperElement.addEventListener("scroll", updateScrollButtons);
      window.addEventListener("scroll", updateScrollButtons);
    }
    return () => {
      swiperElement &&
        swiperElement.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("scroll", updateScrollButtons);
    };
  }, []);

  return (
    <div className="relative">
      <div className="my-5 flex items-center justify-between gap-10">
        <p className="text-4xl max-sm:text-2xl">{textContent}</p>
        <div className="flex space-x-6 max-sm:hidden items-center">
          <button
            onClick={() => scrollBy(-200)}
            className={`${
              !canScrollLeft ? "opacity-50 cursor-not-allowed" : ""
            }  w-[50px] font-bold h-[50px] bg-neutral-300 flex items-center justify-center hover:bg-neutral-200 rounded-full`}
            disabled={!canScrollLeft}
          >
            <ArrowLeft />
          </button>
          <button
            className={`${
              !canScrollRight ? "opacity-50 cursor-not-allowed" : ""
            }  w-[50px] font-bold h-[50px] bg-neutral-300 flex items-center justify-center hover:bg-neutral-200 rounded-full`}
            disabled={!canScrollRight}
            onClick={() => scrollBy(200)}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <div
        className="overflow-x-auto pb-10 pt-2 gap-8  flex  space-x-4  scrollbar-hide"
        ref={swiperRef}
      >
        {children}
      </div>
    </div>
  );
};

export default SwiperCustom;
