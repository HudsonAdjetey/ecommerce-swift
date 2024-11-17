"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const menLink = [
  { title: "Shirts", path: "/men/shirts" },
  { title: "Pants", path: "/men/pants" },
  { title: "Accessories", path: "/men/accessories" },
  { title: "T-Shirts", path: "/men/t-shirts" },
  { title: "Shorts", path: "/men/shorts" },
  { title: "Jackets", path: "/men/jackets" },
  { title: "Shoes", path: "/men/shoes" },
  { title: "Swimwear", path: "/men/swimwear" },
];

const womenLink = [
  { title: "Dresses", path: "/women/dresses" },
  { title: "Skirts", path: "/women/skirts" },
  { title: "Pants", path: "/women/pants" },
  { title: "Accessories", path: "/women/accessories" },
  { title: "Shirts", path: "/women/shirts" },
  { title: "Jackets", path: "/women/jackets" },
  { title: "Shoes", path: "/women/shoes" },
  { title: "Swimwear", path: "/women/swimwear" },
];

const kidLink = [
  { title: "T-Shirts", path: "/kids/t-shirts" },
  { title: "Pants", path: "/kids/pants" },
  { title: "Shorts", path: "/kids/shorts" },
  { title: "Socks", path: "/kids/socks" },
  { title: "Swimwear", path: "/kids/swimwear" },
  { title: "Accessories", path: "/kids/accessories" },
];

const collectionLink = [
  { title: "New Arrivals", path: "/collection/new-arrivals" },
  { title: "Best Sellers", path: "/collection/best-sellers" },
  { title: "Sale", path: "/collection/sale" },
  { title: "Gifts", path: "/collection/gifts" },
];

const CustomDropDown = () => {
  return (
    <div className="lg:flex hidden">
      <NavLinkContainer />
    </div>
  );
};

export default CustomDropDown;

export const NavLinkContainer = () => {
  return (
    <NavigationMenu className="z-[90]">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-gray-600 hover:text-black text-sm font-medium">
            <Link href={"/men"}>Men</Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white">
            <ul className=" w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2  lg:w-[600px]  grid ">
              {menLink.map((link, idx) => {
                return (
                  <li className="text-sm" key={idx}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.path}
                        className="text-gray-600 text-sm hover:text-custom-black"
                      >
                        {link.title}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-gray-600 hover:text-black text-sm font-medium">
            <Link href={"/women"}>Women</Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white">
            <ul className=" w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2  lg:w-[600px]  grid ">
              {womenLink.map((link, idx) => {
                return (
                  <li key={idx}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.path}
                        className="text-sm text-gray-600 hover:text-custom-black"
                      >
                        {link.title}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-gray-600 hover:text-black text-sm font-medium">
            Kids
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white">
            <ul className=" w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2  lg:w-[600px]  grid ">
              {kidLink.map((link, idx) => {
                return (
                  <li key={idx}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.path}
                        className=" text-sm text-gray-600 hover:text-custom-black"
                      >
                        {link.title}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-gray-600 hover:text-black text-sm font-medium">
            Collections
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white">
            <ul className=" w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2  lg:w-[600px]  grid ">
              {collectionLink.map((link, idx) => {
                return (
                  <li key={idx}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.path}
                        className=" text-sm text-gray-600 hover:text-custom-black"
                      >
                        {link.title}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
