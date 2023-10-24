"use client";

import { useSession } from "next-auth/react";

import ConfirmOrder from "@/components/checkout/confirm-order";
import ErrorPage from "@/components/error";
import CartItems from "@/components/shopping-cart/cart-items";
import Heading from "@/components/ui/heading";
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
      <Heading size="lg">Checkout</Heading>
      {session.data?.user?.id &&
        (cartData && cartData.items.length > 0 ? (
          <>
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-6">
                <h3 className="mb-5">Cart Items</h3>
                <CartItems
                  cartData={cartData}
                  removeItemFromCart={() => {}}
                  deletable={false}
                />
              </div>
              <div className="col-span-6 place-self-start w-full">
                {cartData && cartData.items?.length > 0 && (
                  <ConfirmOrder
                    cartData={cartData}
                    user={{
                      userId: session.data.user.id,
                      email: session.data.user.email,
                    }}
                  />
                )}
              </div>
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
