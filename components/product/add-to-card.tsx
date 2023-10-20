"use client";

import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { ProductType } from "@/types/api/product";

import Button from "../ui/btn";
import { Skeleton } from "../ui/skeleton";

interface AddToCartProps {
  product: ProductType;
}

const AddToCart = (props: AddToCartProps) => {
  const session = useSession();
  const [itemCount, setItemCount] = useState(0);

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
      <div className="quantity">
        <div className="flex items-center gap-2 w-fit border-2 border-gray-300 px-3 py-2 rounded-2xl">
          <div
            className="text-[2rem] cursor-pointer hover:text-orange-1 duration-200 ease-in-out"
            onClick={() => {
              setItemCount((prev) => prev - 1);
            }}
          >
            <FontAwesomeIcon icon={faMinusCircle} />
          </div>
          <input type="number" className="w-16 text-center" value={itemCount} />
          <div
            className="text-[2rem] cursor-pointer hover:text-orange-1 duration-200 ease-in-out"
            onClick={() => {
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
        <Button size="sm" variant="black">
          Add to Cart
        </Button>
      </div>
    </>
  );
};

export default AddToCart;
