"use client";
import { ArrowLeft } from "lucide-react";
import React from "react";
import ProductInfo from "./ProductInfo";
import ProductChange from "./ProductChange";
import ProductPricing from "./ProductPricing";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Footer from "@/components/common/Footer";

const CartComp = () => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };
  return (
    <section className="container bg-white py-10">
      <div className="flex gap-3 items-center justify-between">
        <h1 className="text-3xl font-medium text-black/90">My Cart</h1>
        <button className="  flex items-center gap-3 px-3 py-2 border border-neutral-400 rounded-full">
          <span className="max-sm:hidden">
            <ArrowLeft size={20} />
          </span>
          <span className="max-sm:text-sm font-medium">Continue Shopping</span>
        </button>
      </div>
      <div className="flex items-center max-md:items-start mt-10 justify-between max-md:flex-col">
        <ProductInfo handleCopy={handleCopy} />
        <ProductChange />
        <ProductPricing />
      </div>
      <div className="flex items-center max-md:flex-col gap-10 bg-neutral-100 shadow-md  p-4 max-md:items-start justify-between my-10">
        <div>
          <h3 className="text-lg font-medium mb-5">Choose shipping mode</h3>
          <RadioGroup>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="shipping" id="radio1" />
              <Label htmlFor="radio1" className="space-x-2">
                <span>Store pickup</span>
                <span className="font-semibold text-sm">FREE</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="homeDelivery" id="radio2" />
              <Label htmlFor="radio2" className="space-x-2">
                <span>Delivery at home -</span>
                <span className="font-medium text-base">GHs 20</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
        <article className=" md:basis-[300px]">
          <div className="space-y-3">
            <div className="flex items-center gap-10">
              <p>Subtotal</p>
              <p>Ghs 1203</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Shipping</p>
              <p>Ghs 20</p>
            </div>
          </div>
          <button className="flex mt-5 w-full items-center gap-5 justify-between bg-black text-white py-3 px-4 rounded-lg hover:black/90">
            <span>Checkout</span>
            <span>(GHs 1223)</span>
          </button>
        </article>
      </div>

      <Footer />
    </section>
  );
};

export default CartComp;
