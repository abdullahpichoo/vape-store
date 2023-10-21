"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { FAILED_TO_REMOVE_ITEM_FROM_CART } from "@/contants/errorMsgs";
import { CART_ITEM_REMOVED_SUCCESSFULLY } from "@/contants/successMsgs";
import useCartStore from "@/context/cartStore";
import { useFetchCart } from "@/helpers/queries/cart/fetch";
import { useRemoveItemFromCart } from "@/helpers/queries/cart/mutate";
import { CartItemType, CartType } from "@/types/api/cart";

import ErrorPage from "../error";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "../ui/toast/use-toast";

interface ShoppingCartProps {
  userId: string;
}

const ShoppingCart = (props: ShoppingCartProps) => {
  const { userId } = props;
  const setCart = useCartStore((state) => state.setCart);
  const { toast } = useToast();

  const {
    data: cartData,
    isLoading,
    error,
  } = useFetchCart(userId, (data) => {
    setCart({
      _id: data._id,
      userId: data.userId,
      items: data.items,
    });
  });

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
        <div className="flex flex-col gap-5">
          {cartData.items.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center justify-between gap-5"
            >
              <div className="flex gap-5">
                <div className="flex flex-col gap-5">
                  <Link href={`/product/${item.productId}`}>
                    <h6 className="text-xl font-semibold">
                      {item.productName}
                    </h6>
                  </Link>
                  <div className="flex gap-5">
                    <div className="flex gap-5 items-center">
                      <button className="text-3xl font-bold">-</button>
                      <h6 className="text-2xl font-semibold">
                        {item.quantity}
                      </h6>
                      <button className="text-3xl font-bold">+</button>
                    </div>
                    <h6 className="text-xl font-semibold">
                      ${item.productPrice * item.quantity}
                    </h6>
                  </div>
                </div>
              </div>
              <Button
                variant={"destructive"}
                onClick={() => removeItemFromCart(item)}
              >
                <FontAwesomeIcon icon={faClose} />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <h3 className="text-center">No products in cart!</h3>
      )}
    </>
  );
};

export default ShoppingCart;
