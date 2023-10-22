"use client";

import { useSession } from "next-auth/react";

import ErrorPage from "@/components/error";
import CartItems from "@/components/shopping-cart/cart-items";
import TotalBillDetails from "@/components/shopping-cart/total-bill-details";
import { Skeleton } from "@/components/ui/skeleton";
import useCartStore from "@/context/cartStore";

const Checkout = () => {
  const session = useSession();
  const cartData = useCartStore((state) => state.cart);

  if (session.status === "loading")
    return (
      <>
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-6 flex flex-col gap-5">
            <Skeleton className="w-full h-[15rem]" />
            <Skeleton className="w-full h-[15rem]" />
            <Skeleton className="w-full h-[15rem]" />
          </div>
          <div className="col-span-6">
            <Skeleton className="w-full h-[25rem]" />
          </div>
        </div>
      </>
    );

  if (session.status === "unauthenticated")
    return <ErrorPage message="You need to login to view this page!" />;

  return (
    <>
      {session.data?.user?.id &&
        (cartData && cartData.items.length > 0 ? (
          <>
            <div className="flex gap-10 justify-between items-start h-full">
              <CartItems
                cartData={cartData}
                removeItemFromCart={() => {}}
                deletable={false}
              />
              <TotalBillDetails cartData={cartData} />
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-5 items-center justify-center h-full">
            <h3 className="text-center">No products in cart!</h3>
          </div>
        ))}
    </>
  );
};

export default Checkout;
