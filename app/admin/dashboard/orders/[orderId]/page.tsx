import { headers } from "next/headers";

import Order from "@/components/account/order-history/order";
import { adminOrderByIdApiRoute } from "@/routes/api";
import { OrderType } from "@/types/api/order";

import UpdateOrderStatus from "./update-status";

const getData = async (orderId: string): Promise<OrderType> => {
  try {
    const response = await fetch(adminOrderByIdApiRoute(orderId), {
      headers: headers(),
      credentials: "include",
      next: {
        tags: ["order", orderId],
      },
    });

    const responseData = await response.json();
    console.log("Res", responseData);
    return responseData.body.payLoad;
  } catch (err) {
    throw new Error(err as string);
  }
};

const AdminOrder = async ({ params }: { params: { orderId: string } }) => {
  const order = await getData(params.orderId);
  console.log("Order", order);

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h2>Order</h2>
        <UpdateOrderStatus order={order} />
      </div>
      <Order order={order} />
    </>
  );
};

export default AdminOrder;
