"use client";

import Link from "next/link";

import { FAILED_TO_REMOVE_ITEM_FROM_CART } from "@/contants/errorMsgs";
import { CART_ITEM_REMOVED_SUCCESSFULLY } from "@/contants/successMsgs";
import useCartStore from "@/context/cartStore";
import { useFetchCart } from "@/helpers/queries/cart/fetch";
import { useRemoveItemFromCart } from "@/helpers/queries/cart/mutate";
import { CartItemType, CartType } from "@/types/api/cart";

import ErrorPage from "../error";
import Button from "../ui/btn";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "../ui/toast/use-toast";

import CartItems from "./cart-items";
import TotalBillDetails from "./total-bill-details";

interface ShoppingCartProps {
  userId: string;
  closeDrawer: () => void;
}

const ShoppingCart = (props: ShoppingCartProps) => {
  const { userId, closeDrawer } = props;
  const setCart = useCartStore((state) => state.setCart);
  const { toast } = useToast();

  const {
    data: cartData,
    isLoading,
    error,
  } = useFetchCart(
    userId,
    (data) => {
      setCart({
        _id: data._id,
        userId: data.userId,
        items: data.items,
      });
    },
    () => {
      console.log("Cart Fetch Failed");
    }
  );

  const { mutate: removeFromCartMutation, isLoading: isRemoving } =
    useRemoveItemFromCart(
      userId,
      cartData as CartType,
      (data) => {
        setCart({
          _id: data._id,
          userId: data.userId,
          items: data.items,
        });
        toast({
          title: CART_ITEM_REMOVED_SUCCESSFULLY,
          description: `Item has been removed from cart!`,
        });
      },
      (error) => {
        toast({
          title: FAILED_TO_REMOVE_ITEM_FROM_CART,
          description: `Failed to remove item from cart! ${error}`,
          variant: "destructive",
        });
      }
    );

  const removeItemFromCart = async (cartItem: CartItemType) => {
    if (!cartData) return;
    const payload: CartItemType = {
      productBrand: cartItem.productBrand,
      productId: cartItem.productId,
      productName: cartItem.productName,
      productPrice: cartItem.productPrice,
      productImage: cartItem.productImage,
      quantity: cartItem.quantity,
    };
    await removeFromCartMutation(payload);
  };

  if (isLoading)
    return (
      <div className="flex flex-col gap-5">
        <Skeleton className="w-full h-[10rem]" />
        <Skeleton className="w-full h-[10rem]" />
        <Skeleton className="w-full h-[10rem]" />
      </div>
    );

  if (isRemoving)
    return (
      <div className="flex flex-col gap-5">
        <Skeleton className="w-full h-[10rem]" />
        <Skeleton className="w-full h-[10rem]" />
        <Skeleton className="w-full h-[10rem]" />
      </div>
    );

  if (error) return <ErrorPage message="Failed to load shopping cart!" />;

  return (
    <>
      {cartData && cartData.items.length > 0 ? (
        <>
          <div className="flex flex-col justify-between items-center h-full">
            <CartItems
              cartData={cartData}
              removeItemFromCart={removeItemFromCart}
              deletable={true}
            />
            <TotalBillDetails cartData={cartData} closeDrawer={closeDrawer} />
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-5 items-center justify-center h-full">
          <h3 className="text-center">No products in cart!</h3>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
