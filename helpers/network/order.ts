import { addOrderApiRoute, adminOrdersApiRoute } from "@/routes/api";
import { Pagination } from "@/types";
import { OrderPayloadType, OrderType } from "@/types/api/order";

export const fetchAdminOrders = async (params: string) => {
  try {
    const response = await fetch(adminOrdersApiRoute(params), {
      credentials: "include",
    });

    const responseData = await response.json();
    return responseData;
  } catch {
    throw new Error();
  }
};

export const createOrder = async (
  userId: string,
  data: OrderPayloadType
): Promise<OrderType> => {
  try {
    const response = await fetch(addOrderApiRoute(userId), {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    return responseData.body.payLoad;
  } catch {
    throw new Error();
  }
};
