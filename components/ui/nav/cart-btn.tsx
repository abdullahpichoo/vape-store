"use client";

import { faCartShopping, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

import ShoppingCart from "@/components/shopping-cart";
import useCartStore from "@/context/cartStore";

import Button from "../btn";
import { Separator } from "../separator";
import { Skeleton } from "../skeleton";

const CartBtn = () => {
  const session = useSession();
  const cart = useCartStore((state) => state.cart);

  const [drawerOpen, setDrawerOpen] = useState(false);

  if (session.status === "loading")
    return <Skeleton className="w-full h-[3rem]" />;

  return (
    <>
      <div
        role="button"
        className="cart-btn bg-orange-3 flex gap-3 lg:gap-8 px-4 py-2 lg:px-8 lg:py-3.5 rounded-xl group hover:cursor-pointer"
        onClick={() => setDrawerOpen(true)}
      >
        <div className="flex items-center gap-3">
          <FontAwesomeIcon
            icon={faCartShopping}
            className=" group-hover:scale-110 transition-all ease-in-out duration-200"
          />
          <h6 className="font-medium hidden lg:block">Cart</h6>
        </div>
        <div className="items-count text-[1rem] lg:text-[1.2rem] text-white px-4 py-2 bg-black rounded-full group-hover:scale-110 transition-all ease-in-out duration-200">
          {cart.items.length}
        </div>
      </div>

      <div
        className={`backdrop absolute top-0 left-0 z-30 w-full h-[100vh] bg-black opacity-50 ease-in-out duration-300 transition-all ${
          drawerOpen ? "block" : "hidden"
        }`}
      />

      <div
        className={`top-0 right-0 w-[70vw] sm:w-[60vw] lg:w-[40vw] bg-white px-10 py-14 text-white fixed h-[100vh] overflow-y-auto z-40 ease-in-out duration-300 transition-all transform ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex item-center justify-between">
          <h4>Shopping Cart</h4>
          <div className="flex justify-start">
            <FontAwesomeIcon
              icon={faClose}
              className="text-[2.5rem] text-black cursor-pointer"
              onClick={() => setDrawerOpen(false)}
            />
          </div>
        </div>
        <div className="mt-5 mb-10">
          <Separator />
        </div>

        {session && session.status === "authenticated" && session.data?.user ? (
          <ShoppingCart
            userId={session.data.user.id}
            closeDrawer={() => {
              setDrawerOpen(false);
            }}
          />
        ) : (
          <div className="flex flex-col gap-5 items-center justify-center h-full">
            <h1>Your Cart is Empty</h1>
            <h6>Login to see the items in your cart</h6>
            <Link href={"auth/sign-in"}>
              <Button variant="black" size="sm">
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartBtn;
