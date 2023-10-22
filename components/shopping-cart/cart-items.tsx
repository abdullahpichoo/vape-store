import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { CartItemType, CartType } from "@/types/api/cart";

import Img from "../ui/image";

interface CartItemsProps {
  cartData: CartType;
  removeItemFromCart: (cartItem: CartItemType) => void;
  deletable: boolean;
}

const CartItems = (props: CartItemsProps) => {
  const { cartData, removeItemFromCart, deletable } = props;

  return (
    <>
      <div className="flex flex-col gap-5 w-full">
        {cartData.items.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-6 gap-5 border-t-none border-x-0 border-b-2 border-b-gray-200 pb-5"
          >
            <div className="col-span-2 w-full flex justify-center">
              <Img
                src={item.productImage}
                alt={item.productName}
                className="w-[8rem] h-[8rem] md:w-[15rem] md:h-[15rem] object-contain flex flex-col justify-center items-center"
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
                {deletable && (
                  <div
                    className="text-[1.2rem] bg-red-200 px-4 py-1.5 rounded-xl text-red-500 cursor-pointer hover:scale-105 duration-100 ease-in"
                    onClick={() => removeItemFromCart(item)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CartItems;
