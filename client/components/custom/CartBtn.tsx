"use client";
import { addToCart } from "@/lib/features/cartSlice";
import { useAuth } from "@clerk/nextjs";
import React, { useCallback, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks";

type ItemToCart = {
  productId: string;
  variantId: string;
  price: number;
  image: StaticImageData | string;
  size: string;
  name: string;
};

const CartBtn = React.memo(
  ({
    product,
    className,
  }: {
    product: {
      productId: string;
      variantId: string;
      size: string;
      name: string;
      image: string;
    };
    className: string;
  }) => {
    const [display, setDisplay] = React.useState(false);
    const dispatch = useAppDispatch();
    const auth = useAuth();

    const addProductToCart = useMutation({
      mutationKey: ["user", auth?.userId],
      mutationFn: async (data: { data: CartProps[] }) => {
        if (!auth.isSignedIn) {
          return;
        }
        try {
          const response = await axios.post(`/api/user/${auth.userId}`, data);
          return response.data;
        } catch (error) {
          console.error("Failed to add product to cart:", error);
          alert("Failed to add product to cart. Please try again.");
        }
      },
    });

    const handleAddToCart = useCallback(async () => {
      if (product.size === "") {
        alert("Please select a size for this product.");
        return;
      }

      if (auth.isSignedIn && product.productId && product.variantId) {
        try {
          const res = await addProductToCart.mutateAsync({
            productId: product.productId,
            variantId: product.variantId,
          });
          console.log(res.data);
          return res.data.cart;
        } catch (error) {
          console.error("Failed to add product to cart:", error);
          alert("Failed to add product to cart. Please try again.");
        }
      }

      // Trigger display of relative content
      setDisplay(true);
    }, [product, addProductToCart, auth.isSignedIn]);

    useEffect(() => {
      if (display) {
        const timer = setTimeout(() => setDisplay(false), 3000);
        return () => clearTimeout(timer);
      }
    }, [display]);

    return (
      <>
        <button
          onClick={handleAddToCart}
          className={cn(
            "flex items-center gap-3 justify-center py-4 px-2 rounded-full font-semibold",
            className
          )}
        >
          <ShoppingBag size={20} />
          <span>Add to Cart</span>
        </button>

        {/* Content shown for a few seconds after adding to cart */}
        {display && (
          <div className="relative-content  fixed w-full h-screen inset-0 z-[99999]  flex ">
            {/* Relative content goes here */}
            <div className="w-full bg-black/40  relative  ">
              <div className="absolute bg-white rounded-md backdrop-blur-sm  top-[4rem] w-[350px] p-3 max-sm:w-fit right-0">
                <h3 className="text-xl my-3">Added to cart</h3>
                <div className="flex gap-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={100}
                    height={100}
                    priority
                    className="object-cover"
                  />
                  <div>
                    <p className="text-2xl mb-3">{product.name}</p>
                    <p className="text-xl">
                      <span>Price: </span>
                      <span className="font-semibold">${product.price}</span>
                    </p>
                    <div>
                      <p className="text-xl">
                        <span>Size: </span>
                        <span className="font-semibold">{product.size}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="my-10 flex ">
                  <button className="w-full hover:black/80 bg-black text-white text-center py-4  rounded-full text-lg ">
                    Checkout (
                    {cart && cart.reduce((acc, item) => acc + item.quantity, 0)}
                    )
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);
CartBtn.displayName = "CartBtn";
export default CartBtn;
