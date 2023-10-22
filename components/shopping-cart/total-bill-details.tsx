import Link from "next/link";

import { CartType } from "@/types/api/cart";

import Button from "../ui/btn";

interface TotalBillDetailsProps {
  cartData: CartType;
  closeDrawer: () => void;
}

const TotalBillDetails = (props: TotalBillDetailsProps) => {
  const { cartData, closeDrawer } = props;

  return (
    <>
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
          <Link href={"/checkout"} onClick={() => closeDrawer()}>
            <Button size="sm" variant="orange">
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TotalBillDetails;
