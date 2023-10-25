import {
  addOrderApiRoute,
  adminOrderByIdApiRoute,
  adminOrdersApiRoute,
  ordersApiRoute,
  userOrderByIdApiRoute,
} from "@/routes/api";
import { OrderPayloadType, OrderType } from "@/types/api/order";

export const fetchAdminOrders = async (params: string) => {
  try {
    const response = await fetch(adminOrdersApiRoute(params), {
      credentials: "include",
    });

    const responseData = await response.json();
    return responseData;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const fetchUserOrders = async (userId: string): Promise<OrderType[]> => {
  try {
    const response = await fetch(ordersApiRoute(userId), {
      credentials: "include",
    });

    const responseData = await response.json();
    return responseData.body.payLoad;
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

export const updateOrder = async (
  orderId: string,
  data: OrderPayloadType
): Promise<OrderType> => {
  try {
    const response = await fetch(adminOrderByIdApiRoute(orderId), {
      method: "PUT",
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

export const fetchOrderById = async (orderId: string): Promise<OrderType> => {
  try {
    const response = await fetch(adminOrderByIdApiRoute(orderId), {
      credentials: "include",
    });

    const responseData = await response.json();
    return responseData.body.payLoad;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const fetchUserOrderById = async (
  userId: string,
  orderId: string
): Promise<OrderType> => {
  try {
    const response = await fetch(userOrderByIdApiRoute(userId, orderId), {
      credentials: "include",
    });

    const responseData = await response.json();
    return responseData.body.payLoad;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const fetchAdminOrderById = async (
  orderId: string
): Promise<OrderType> => {
  try {
    const response = await fetch(adminOrderByIdApiRoute(orderId), {
      credentials: "include",
    });

    const responseData = await response.json();
    console.log("Res", responseData);
    return responseData.body.payLoad;
  } catch (err) {
    throw new Error(err as string);
  }
};
