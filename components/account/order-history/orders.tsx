import Link from "next/link";

import ErrorPage from "@/components/error";
import Button from "@/components/ui/btn";
import Img from "@/components/ui/image";
import { Skeleton } from "@/components/ui/skeleton";
import { FAILED_TO_FETCH_ORDERS } from "@/contants/errorMsgs";
import { useFetchOrders } from "@/helpers/queries/order/fetch";

interface OrdersProps {
  userId: string;
}

const Orders = (props: OrdersProps) => {
  const { userId } = props;

  const { data: ordersData, isLoading, error } = useFetchOrders(userId);

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
        <ErrorPage message={FAILED_TO_FETCH_ORDERS} />
      </>
    );
  return (
    <>
      <div className="flex flex-col gap-10">
        {ordersData && ordersData.length > 0 ? (
          ordersData.map((order) => (
            <>
              <div className="px-8 py-4 border border-gray-300 rounded-xl flex flex-col gap-5 hover:border-orange-1 duration-150 ease-in">
                <div className="grid grid-cols-12">
                  <div className="col-span-12 sm:col-span-10">
                    <h6>
                      ID :{" "}
                      <span className="font-semibold text-gray-600">
                        {order._id}
                      </span>
                    </h6>
                  </div>
                  <div className="col-span-12 sm:col-span-2">
                    <h6
                      className={`capitalize ${
                        order.status === "ORDERED"
                          ? "text-orange-1"
                          : order.status === "DELIVERED"
                          ? "text-green-600"
                          : "text-orange-2"
                      }`}
                    >
                      {order.status}
                    </h6>
                  </div>
                </div>
                <div className="grid grid-cols-12">
                  <div className="col-span-12 sm:col-span-10 flex flex-col">
                    <h6 className="text-gray-500">Address</h6>
                    <p>
                      {order.shippingAddress.street},{" "}
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state},{" "}
                      {order.shippingAddress.zipCode}
                    </p>
                  </div>
                  <div className="col-span-12 sm:col-span-2 flex flex-col items-start">
                    <h6 className="text-gray-500">Bill</h6>
                    <p>{order.totalPrice}</p>
                  </div>
                </div>
                <div className="product-images">
                  <div className="grid grid-cols-12 gap-4">
                    {order.items.map((item) => (
                      <div
                        className="col-span-6 flex gap-3"
                        key={item.productId}
                      >
                        <Img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-[8rem] h-[8rem] object-contain flex items-center justify-center"
                        />
                        <div className="details flex justify-center items-start flex-col gap-3">
                          <p className="text-gray-500 text-[1.2rem] font-semibold">
                            {item.productName}
                          </p>
                          <p className="text-gray-500 text-[1.2rem] font-semibold">
                            {item.quantity} x ${item.productPrice}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ))
        ) : (
          <>
            <div className="flex flex-col items-center justify-center gap-3">
              <h2 className="text-2xl font-semibold">No Orders Found</h2>
              <p className="text-gray-500">
                {"You haven't placed any orders yet. "}
              </p>

              <Link href="/">
                <Button variant="black" size="sm">
                  Start shopping
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Orders;
