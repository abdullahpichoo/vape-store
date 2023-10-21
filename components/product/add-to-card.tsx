"use client";

import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { FAILED_TO_ADD_ITEM_TO_CART } from "@/contants/errorMsgs";
import { CART_ITEM_ADDED_SUCCESSFULLY } from "@/contants/successMsgs";
import useCartStore from "@/context/cartStore";
import { useAddItemToCart } from "@/helpers/queries/cart/mutate";
import { CartItemType } from "@/types/api/cart";
import { ProductType } from "@/types/api/product";

import Button from "../ui/btn";
import { Skeleton } from "../ui/skeleton";
import Spinner from "../ui/spinner";
import { useToast } from "../ui/toast/use-toast";

interface AddToCartProps {
  product: ProductType;
}

const AddToCart = (props: AddToCartProps) => {
  const { product } = props;
  const session = useSession();
  const { toast } = useToast();
  const [itemCount, setItemCount] = useState(0);

  const cartStore = useCartStore((state) => state.cart);
  const setCart = useCartStore((state) => state.setCart);

  const { mutate: addToCartMutation, isLoading } = useAddItemToCart(
    session.data?.user?.id,
    cartStore,
    (data) => {
      setCart({
        _id: data._id,
        userId: data.userId,
        items: data.items,
      });
      toast({
        title: CART_ITEM_ADDED_SUCCESSFULLY,
        description: `${product.name} has been added to cart!`,
      });
    },
    (error) => {
      toast({
        title: FAILED_TO_ADD_ITEM_TO_CART,
        description: `Failed to add ${product.name} to cart! ${error}`,
        variant: "destructive",
      });
    }
  );

  const addItemToCart = async () => {
    if (!session.data?.user?.id) return;
    const cartItem: CartItemType = {
      productId: product._id,
      productName: product.name,
      productBrand: product.brand,
      productPrice: product.price,
      productImage: product.images ? (product.images[0].url as string) : "",
      quantity: itemCount === 0 ? 1 : itemCount,
    };
    console.log("cart Item to be added", cartItem);
    await addToCartMutation(cartItem);
  };

  if (session.status === "loading") return <Skeleton className="h-[5rem]" />;

  if (session.status === "unauthenticated")
    return (
      <Link href={"/auth/sign-in"}>
        <Button size="sm" variant="black">
          Login
        </Button>
      </Link>
    );

  return (
    <>
      <div className="quantity flex items-center gap-5">
        <h5>Quantity:</h5>
        <div className="flex items-center gap-2 w-fit border-2 border-gray-300 px-3 py-2 rounded-2xl">
          <div
            className="text-[2rem] cursor-pointer hover:text-orange-1 duration-200 ease-in-out"
            onClick={() => {
              if (itemCount <= 0) return;
              setItemCount((prev) => prev - 1);
            }}
          >
            <FontAwesomeIcon icon={faMinusCircle} />
          </div>
          <input
            type="number"
            className="w-16 text-center"
            value={itemCount}
            readOnly
          />
          <div
            className="text-[2rem] cursor-pointer hover:text-orange-1 duration-200 ease-in-out"
            onClick={() => {
              if (itemCount >= props.product.countInStock) return;
              setItemCount((prev) => prev + 1);
            }}
          >
            <FontAwesomeIcon icon={faPlusCircle} />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <Button size="sm" variant="orange">
          Buy Now
        </Button>
        <Button size="sm" variant="black" onClick={addItemToCart}>
          <div className="flex items-center justify-center gap-4">
            {isLoading && <Spinner size="sm" color="black" />}
            <span>{isLoading ? "Adding..." : "Add to Cart"}</span>
          </div>
        </Button>
      </div>
    </>
  );
};

export default AddToCart;
