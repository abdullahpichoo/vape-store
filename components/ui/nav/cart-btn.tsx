"use client";

import { faCartShopping, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useState } from "react";

import ShoppingCart from "@/components/shopping-cart";

import Button from "../btn";
import { Skeleton } from "../skeleton";

const CartBtn = () => {
  const session = useSession();

  const [drawerOpen, setDrawerOpen] = useState(false);

  if (session.status === "loading")
    return <Skeleton className="w-full h-[3rem]" />;

  return (
    <>
      <div
        role="button"
        className="cart-btn bg-orange-3 flex gap-8 px-8 py-3.5 rounded-xl group hover:cursor-pointer"
        onClick={() => setDrawerOpen(true)}
      >
        <div className="flex items-center gap-3">
          <FontAwesomeIcon
            icon={faCartShopping}
            className="w-9 group-hover:scale-110 transition-all ease-in-out duration-200"
          />
          <h6 className="font-medium">Cart</h6>
        </div>
        <div className="items-count text-white px-5 py-2 bg-black rounded-full group-hover:scale-110 transition-all ease-in-out duration-200">
          0
        </div>
      </div>

      <div
        className={`backdrop absolute top-0 left-0 z-30 w-[100vw] h-[100vh] bg-black opacity-50 ease-in-out duration-300 transition-all ${
          drawerOpen ? "block" : "hidden"
        }`}
      />

      <div
        className={`top-0 right-0 w-[60vw] md:w-[40vw] bg-white px-20 py-14 text-white fixed h-full z-40 ease-in-out duration-300 transition-all transform ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex item-center justify-between">
          <h4>Shopping Cart</h4>
          <div className="flex justify-start">
            <FontAwesomeIcon
              icon={faClose}
              className="text-[3rem] text-black cursor-pointer"
              onClick={() => setDrawerOpen(false)}
            />
          </div>
        </div>
        {session && session.status === "authenticated" && session.data?.user ? (
          <ShoppingCart userId={session.data.user.id} />
        ) : (
          <div className="flex flex-col gap-5 items-center justify-center h-full">
            <h1>Your Cart is Empty</h1>
            <h6>Login to see the items in your cart</h6>
            <Button variant="black" size="sm">
              Login
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartBtn;
