"use client";
import CustomDropDown from "@/components/custom/CustomDropDown";
import CustomToolTip from "@/components/custom/CustomToolTip";
import {
  HelpCircle,
  Menu,
  Search,
  Ship,
  ShoppingBag,
  Store,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

const Navbar = () => {
  const [toggled, setToggled] = useState<boolean>(false);

  const handleToggled = useCallback(() => {
    setToggled((prev) => {
      const newToggled = !prev;
      if (!newToggled) {
        // handleReset();
      }
      return newToggled;
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && toggled) {
        handleToggled();
      }
    };
    //   resize screen
    const handleResize = () => {
      if (window.innerWidth >= 1024 && toggled) {
        handleToggled();
      }
    };
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (toggled && !target.closest(".content_nav")) {
        handleToggled();
      }
    };
    document.body.style.overflow = toggled ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [toggled, handleToggled]);

  return (
    <header className="bg-white px-4 h-[64px] 2xl:px-10 flex items-center justify-between shadow-sm sticky top-0 inset-x-0 z-[900]">
      {/* desktop */}
      <nav className="desktop relative flex items-center justify-between gap-10 w-full">
        {/* logo */}
        <Link href="/">
          <span className="text-2xl font-bold text-black">SwiftMart</span>
        </Link>
        {/* logo */}

        <div>
          <CustomDropDown />
        </div>

        <div className="flex items-center gap-4">
          <button
            className="w-[40px] h-[40px] flex items-center justify-center hover:bg-neutral-200 rounded-full"
            // onClick={handleToggleSearch}
          >
            <Search />
          </button>
          <div className="max-lg:hidden flex gap-3">
            <div>
              <CustomToolTip label="user">
                <User />
              </CustomToolTip>
            </div>
            <div>
              <CustomToolTip label="cart">
                <div className="relative">
                  <span>
                    <ShoppingBag />
                  </span>
                  <span className="absolute -top-3 -right-2 text-sm font-bold">
                    0
                  </span>
                </div>
              </CustomToolTip>
            </div>
          </div>
          <div className="hidden max-lg:inline-flex content_nav">
            <button
              className="w-[40px] h-[40px] flex  items-center justify-center hover:bg-neutral-200 rounded-full"
              onClick={handleToggled}
            >
              <Menu />
            </button>
            <MobileSidebar onClose={handleToggled} toggled={toggled} />
          </div>
        </div>

        {/* overlay */}
        {toggled && (
          <div className="fixed lg:hidden  inset-0 flex w-full   h-screen bg-neutral-400/20 z-50"></div>
        )}
        {/* overlay */}
      </nav>
      {/* desktop */}
    </header>
  );
};

export default Navbar;

export const MobileSidebar = ({
  toggled,
  onClose,
}: {
  toggled: boolean;
  onClose: () => void;
}) => {
  return (
    <div
      className={`fixed inset-y-0 right-0 transform ${
        toggled ? "translate-x-0 sidebarToggled" : "translate-x-full"
      } max-sm:w-3/4 w-1/2 sidebar_webkit !overflow-y-scroll p-5 bg-white h-screen z-[9990] transition-transform duration-300 ease-in-out  lg:hidden overflow-hidden`}
    >
      <button
        className=" w-[40px] h-[40px] flex items-center justify-center hover:bg-neutral-200 mb-8 ml-auto rounded-full"
        onClick={onClose}
      >
        <X />
      </button>

      <div className="mt-10">
        <div>
          <h2 className="text-lg text-black/50 mb-3">
            Shop Right from <span className="text-black/80">SwiftMart</span> for
            all your best products.{" "}
            <Link className="text-black" href={"/read-more"}>
              Learn More About SwiftMart
            </Link>
          </h2>
        </div>
        <div className="my-5 flex gap-3">
          <button className="px-6 py-2 bg-black text-white rounded-full hover:bg-neutral-800">
            Shop Now
          </button>
          <button className="px-6 py-2 border-black border-2  rounded-full">
            Sign In
          </button>
        </div>

        <div className="flex flex-col space-y-4 my-10">
          <Link href={"/about"} className="flex items-center gap-4">
            <span>
              <HelpCircle />
            </span>
            <span className="text-base">Help</span>
          </Link>
          <Link href={"/contact"} className="flex items-center gap-4">
            <span>
              <ShoppingBag />
            </span>
            <span className="text-base">Cart</span>
          </Link>
          <Link href={"/contact"} className="flex items-center gap-4">
            <span>
              <Ship />
            </span>
            <span className="text-base">Orders</span>
          </Link>
          <Link href={"/contact"} className="flex items-center gap-4">
            <span>
              <Store />
            </span>
            <span className="text-base">Create Store</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
