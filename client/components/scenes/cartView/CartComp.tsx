"use client";
import React, { useState } from "react";
import ProductInfo from "./ProductInfo";
// import ProductPricing from "./ProductPricing";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Footer from "@/components/common/Footer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

const CartComp = () => {
  const { getToken, userId } = useAuth();
  const [shipping, setShipping] = useState<string>("storePickup");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      const token = await getToken();
      const response = await axios.get(
        `http://localhost:5913/api/cart/get-product-cart/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
  });

  const updateMutation = useMutation({
    mutationKey: ["cart", userId],
    mutationFn: async (data: { variantId: string; quantity: number }) => {
      const token = await getToken();
      const res = await axios.put(
        "http://localhost:5913/api/cart/update-product-cart",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
  });

  // handling increment and decrement functionality
  const handleIncrement = (variantId: string, currentQuantity: number) => {
    const newQuantity = currentQuantity + 1;
    updateMutation.mutate({ variantId, quantity: newQuantity });
  };

  const handleDecrement = (variantId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      updateMutation.mutate({ variantId, quantity: newQuantity });
    }
  };

  const cartContainer = data?.cart;

  const handleCopy = (productId: string) => {
    navigator.clipboard.writeText(productId);
    alert("Copied to clipboard!");
  };

  if (isLoading) {
    return (
      <div className="w-screen min-h-screen overflow-x-clip flex items-center justify-center bg-white">
        <div className="loaders" />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading cart. Please try again later.</div>;
  }

  return (
    <section className="container bg-white py-10">
      <div className="flex gap-3 items-center justify-between">
        <h1 className="text-3xl font-medium text-black/90">My Cart</h1>
        {/* <button className="flex items-center gap-3 px-3 py-2 border border-neutral-400 rounded-full">
          <span className="max-sm:hidden">
            <ArrowLeft size={20} />
          </span>
          <span className="max-sm:text-sm font-medium">Continue Shopping</span>
        </button> */}
      </div>

      <div className="relative overflow-x-clip">
        <div>
          {cartContainer
            ? cartContainer.items.map(
                (cart: CartListItemsPageProps, idx: string) => (
                  <div
                    className="flex items-center max-md:items-start mt-10 justify-between max-md:flex-col"
                    key={idx}
                  >
                    <ProductInfo
                      handleCopy={handleCopy}
                      src={cart.image}
                      productName={cart.productName}
                      variantId={cart.variantId}
                      color={cart.color ?? "red"}
                    />
                    <div className="flex self-center gap-3">
                      <button
                        className="w-12 p-2 h-7 flex items-center justify-center border border-neutral-400 rounded-xl font-semibold"
                        onClick={() =>
                          handleIncrement(cart.variantId, cart.quantity)
                        }
                      >
                        +
                      </button>
                      <span className="text-xl ">{cart.quantity}</span>
                      <button
                        onClick={() =>
                          handleDecrement(cart.variantId, cart.quantity)
                        }
                        className="w-12 p-2 h-7 flex items-center justify-center border border-neutral-400 rounded-xl font-semibold"
                      >
                        -
                      </button>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-2">
                        <p className="text-custom-black ">{cart.quantity}X</p>
                        <p className="text-lg ">Ghs {cart.price}</p>
                      </div>
                      <p className="text-neutral-700 font-semibold">
                        Ghs {cart.subtotal}
                      </p>
                    </div>
                  </div>
                )
              )
            : "No products"}
        </div>

        {/* <ProductPricing /> */}
      </div>

      <div className="flex items-center max-md:flex-col gap-10 bg-neutral-100 shadow-md p-4 max-md:items-start justify-between my-10">
        <div>
          <h3 className="text-lg font-medium mb-5">Choose shipping mode</h3>
          <RadioGroup value={shipping} onValueChange={setShipping}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="storePickup" id="radio1" />
              <Label htmlFor="radio1" className="space-x-2">
                <span>Store pickup</span>
                <span className="font-semibold text-sm">FREE</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="homeDelivery" id="radio2" />
              <Label htmlFor="radio2" className="space-x-2">
                <span>Delivery at home -</span>
                <span className="font-medium text-base">Ghs 20</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <article className="md:basis-[300px]">
          <div className="space-y-3">
            <div className="flex items-center gap-10">
              <p>Subtotal</p>
              <p>Ghs {cartContainer?.totalPrice}</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Total</p>
              <p>Ghs {cartContainer?.totalPrice}</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Shipping</p>
              <p>Ghs {shipping === "homeDelivery" ? 20 : 0}</p>
            </div>
          </div>

          <button className="flex mt-5 w-full items-center gap-5 justify-between bg-black text-white py-3 px-4 rounded-lg hover:bg-black/90">
            <span>Checkout</span>
            <span>
              {cartContainer
                ? shipping === "homeDelivery"
                  ? "Ghs " + cartContainer.totalPrice + 20
                  : "Ghs " + cartContainer.totalPrice
                : shipping === "homeDelivery"
                ? 20
                : 0}
            </span>
          </button>
        </article>
      </div>

      <Footer />
    </section>
  );
};

export default CartComp;
