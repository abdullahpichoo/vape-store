"use client";

import Order from "@/components/account/order-history/order";
import ErrorPage from "@/components/error";
import { Skeleton } from "@/components/ui/skeleton";
import { FAILED_TO_FETCH_ORDER } from "@/contants/errorMsgs";
import { useFetchOrderById } from "@/helpers/queries/order/fetch";

import UpdateOrderStatus from "./update-status";

const AdminOrder = ({ params }: { params: { orderId: string } }) => {
  const { data: order, isLoading, error } = useFetchOrderById(params.orderId);

  if (isLoading)
    return (
      <div className="flex flex-col gap-5">
        <Skeleton className="w-full h-[5rem]" />
        <Skeleton className="w-full h-[25rem]" />
      </div>
    );

  if (error) return <ErrorPage message={FAILED_TO_FETCH_ORDER} />;

  return (
    <>
      {order && (
        <>
          <div className="flex justify-between items-center mb-5">
            <h2>Order</h2>
            <UpdateOrderStatus order={order} />
          </div>
          <Order order={order} />
        </>
      )}
    </>
  );
};

export default AdminOrder;
