import { GitBranch } from "lucide-react";
import Link from "next/link";
import React from "react";
import CustomBtn from "../custom/CustomBtn";

const Footer = () => {
  return (
    <footer className="flex flex-col mt-20">
      <div className="flex items-center flex-wrap justify-between gap-6 p-10 border-b border-neutral-400">
        <div>
          <p className="text-2xl font-semibold">
            Shop From Us and Enjoy a big discount
          </p>
          <p className="text-lg">Be part of a brand community</p>
        </div>
        <div className="flex  items-center gap-4  max-sm:flex-1">
          <Link
            href={"/account"}
            className="lg:hover:underline max-sm:underline text-lg font-medium"
          >
            Account
          </Link>
          <CustomBtn />
        </div>
      </div>
      <div className="p-10 max-lg:flex-col justify-between flex gap-10 w-full">
        {/* logo */}
        <div className=" w-[20%]">
          <Link href={"/"} className="text-2xl font-medium">
            SwiftMart
          </Link>
          <p className="text-neutral-600 my-10">
            Shop from all your international brands
          </p>
        </div>
        {/* logo */}
        {/* links */}
        <div className="flex  flex-1 gap-6 max-md:grid max-md:grid-cols-2 max-sm:grid-cols-1 justify-between flex-wrap ">
          <ul className="space-y-2">
            <li className="font-medium">Products</li>
            <li>New Arrivals</li>
            <li>Men&apos;s collection</li>
            <li>Women&apos;s Collection</li>
            <li>All Shoes</li>
            <li>Trending Catalogue</li>
            <li>Clothing</li>
            <li>Shop by Sport</li>
          </ul>

          <ul className="space-y-2">
            <li className="font-medium">Help</li>
            <li>Get Help</li>
            <li>Order Status</li>
            <li>Returns</li>
            <li>Payment Options</li>
            <li>Customer Care</li>
            <li>Contact Us</li>
          </ul>
          <ul className="space-y-2">
            <li className="font-medium">Resources</li>
            <li>About Us</li>
            <li>News</li>
            <li>Purpose</li>
          </ul>
          <ul className="space-y-2">
            <li className="font-medium">Social</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
            <li>Github</li>
            <li>Gmail</li>
          </ul>
          <ul className="space-y-2">
            <li className="font-medium">Legal</li>
            <li>Terms</li>
            <li>Privacy</li>
            <li>Licenses</li>
          </ul>
        </div>
        {/* links */}
      </div>
      <div className="flex gap-2 items-center justify-between my-10 border-y p-5">
        <div>
          {/* copyright */}
          <p>&copy; 2021 SwiftMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
