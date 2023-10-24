import { useState } from "react";

import { FAILED_TO_GET_ADDRESSES } from "@/contants/errorMsgs";
import { ORDER_CREATED_SUCCESSFULLY } from "@/contants/successMsgs";
import { useFetchAddresses } from "@/helpers/queries/account/address/fetch";
import { useCreateOrder } from "@/helpers/queries/order/mutate";
import { AddressType } from "@/types/api/address";
import { CartType } from "@/types/api/cart";
import { OrderPayloadType, orderStatus } from "@/types/api/order";

import ErrorPage from "../error";
import TotalBillDetails from "../shopping-cart/total-bill-details";
import { Skeleton } from "../ui/skeleton";
import Spinner from "../ui/spinner";
import { useToast } from "../ui/toast/use-toast";

interface ConfirmOrderProps {
  user: {
    userId: string;
    email: string;
  };
  cartData: CartType;
}

const ConfirmOrder = (props: ConfirmOrderProps) => {
  const { user, cartData } = props;
  const { toast } = useToast();

  const [selectedAddress, setSelectedAddress] = useState<AddressType>();

  const { data: addresses, isLoading, error } = useFetchAddresses(user.userId);

  const {
    mutate: createOrder,
    isLoading: isCreatingOrder,
    error: orderCreationError,
  } = useCreateOrder(
    user.userId,
    (data) => {
      console.log("Order Created", data);
      toast({
        title: ORDER_CREATED_SUCCESSFULLY,
        description: `Order has been created successfully!`,
      });
    },
    () => {
      toast({
        title: "Order Creation Failed",
        description: `Failed to create order! ${orderCreationError}`,
      });
    }
  );

  const buyNowHandler = async () => {
    if (!selectedAddress) return;

    const orderData: OrderPayloadType = {
      user: user,
      items: cartData.items,
      shippingAddress: selectedAddress,
      status: orderStatus.ORDERED,
      totalPrice: cartData.items.reduce(
        (acc, item) => acc + item.quantity * item.productPrice,
        0
      ),
    };

    await createOrder(orderData);
  };

  if (isLoading)
    return (
      <>
        <div className="flex flex-col gap-5">
          <Skeleton className="w-full h-[10rem]" />
          <Skeleton className="w-full h-[10rem]" />
          <Skeleton className="w-full h-[10rem]" />
        </div>
      </>
    );

  if (error)
    return (
      <>
        <ErrorPage message={FAILED_TO_GET_ADDRESSES} />
      </>
    );
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full relative">
        {addresses && addresses.length > 0 ? (
          <>
            {addresses.map((address) => (
              <>
                <h6 className="text-start my-4">Please Select An Address</h6>
                <div
                  key={address._id}
                  className={`flex items-center gap-8 border-2 rounded-xl border-gray-200 w-full px-5 py-3 ${
                    selectedAddress?._id === address._id
                      ? "border-orange-500"
                      : ""
                  }`}
                  role="button"
                  onClick={() => setSelectedAddress(address)}
                >
                  <div className="flex flex-col">
                    <div>
                      <h6>{address.street}</h6>
                      <p className="font-semibold text-gray-500">
                        {address.city}, {address.state}, {address.zipCode},{" "}
                        {address.country}
                      </p>
                    </div>
                    <div>
                      <h6>
                        Phone Number:{" "}
                        <span className=" text-gray-500">
                          {address.phoneNo}
                        </span>
                      </h6>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </>
        ) : (
          <div className="flex flex-col gap-5 items-center justify-center h-full">
            <h3 className="text-center">No addresses found!</h3>
          </div>
        )}
        <div className="my-10 w-full">
          <TotalBillDetails
            cartData={cartData}
            closeDrawer={() => {}}
            onCheckout={buyNowHandler}
            disableCheckout={selectedAddress === undefined ? true : false}
          />
        </div>
      </div>
      {isCreatingOrder && (
        <div className="w-full h-full absolute top-0 left-0 bg-orange-3 bg-opacity-25 flex flex-col items-center justify-center">
          <Spinner size="xl" color="black" />
          <h6>Placing Order...</h6>
        </div>
      )}
    </>
  );
};

export default ConfirmOrder;
