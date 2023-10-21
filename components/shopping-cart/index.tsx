"use client";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { FAILED_TO_REMOVE_ITEM_FROM_CART } from "@/contants/errorMsgs";
import { CART_ITEM_REMOVED_SUCCESSFULLY } from "@/contants/successMsgs";
import useCartStore from "@/context/cartStore";
import { useFetchCart } from "@/helpers/queries/cart/fetch";
import { useRemoveItemFromCart } from "@/helpers/queries/cart/mutate";
import { CartItemType, CartType } from "@/types/api/cart";

import ErrorPage from "../error";
import Button from "../ui/btn";
import Img from "../ui/image";
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
            <div className="flex flex-col gap-5">
              {cartData.items.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-6 gap-5 border-t-none border-x-0 border-b-2 border-b-gray-200 pb-5"
                >
                  <div className="col-span-2">
                    <Img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="col-span-4 flex flex-col gap-2 lg:gap-4">
                    <Link href={`/product/${item.productId}`}>
                      <h5 className="hover:underline">{item.productName}</h5>
                    </Link>
                    <div className="flex justify-between items-center">
                      <h6 className="text-gray-500">
                        Price: <span>${item.productPrice}</span>
                      </h6>
                      <h6 className="text-gray-500">
                        Qty: <span>{item.quantity}</span>
                      </h6>
                    </div>
                    <div className="flex justify-between items-center">
                      <h5 className="">
                        Total: <span>${item.quantity * item.productPrice}</span>
                      </h5>
                      <div
                        className="text-[1.2rem] bg-red-200 px-4 py-1.5 rounded-xl text-red-500 cursor-pointer hover:scale-105 duration-100 ease-in"
                        onClick={() => removeItemFromCart(item)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="total-items-details px-8 py-5 border-gray-300 border-2 rounded-xl w-full">
              <div className="flex justify-between items-center">
                <h5 className="text-gray-500">Total Items:</h5>
                <h5 className="text-gray-500">{cartData.items.length}</h5>
              </div>
              <div className="flex justify-between items-center">
                <h5 className="text-gray-500">Total Price:</h5>
                <h5 className="text-gray-500">
                  $
                  {cartData.items.reduce(
                    (acc, item) => acc + item.quantity * item.productPrice,
                    0
                  )}
                </h5>
              </div>

              <div className="flex justify-between items-center">
                <h5 className="text-gray-500">Shipping:</h5>
                <h5 className="text-gray-500">$0</h5>
              </div>
              <div className="flex justify-between items-center">
                <h4 className="">Grand Total:</h4>
                <h4 className="">
                  $
                  {cartData.items.reduce(
                    (acc, item) => acc + item.quantity * item.productPrice,
                    0
                  )}
                </h4>
              </div>
              <div className="flex justify-end mt-5">
                <Button size="sm" variant="orange">
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h3 className="text-center">No products in cart!</h3>
      )}
    </>
  );
};

export default ShoppingCart;
