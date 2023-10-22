import { getOrdersByUserId } from "@/backend/controllers/order-controller";
import { getSuccessResponse } from "@/backend/utils/responses";
import { failedToConnectToDatabaseResponse } from "@/backend/utils/responses/database";
import {
  failedToFetchOrdersResponse,
  orderNotFoundResponse,
} from "@/backend/utils/responses/order";
import { ORDERS_FETCHED_SUCCESSFULLY } from "@/contants/successMsgs";
import { OrderType } from "@/types/api/order";
import { connectToDatabase } from "@/utils/database";

export const GET = async (
  _: any,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  const { id } = params;
  if (!id) return orderNotFoundResponse();

  const isConnected = await connectToDatabase();
  if (!isConnected) return failedToConnectToDatabaseResponse();

  try {
    const orders = await getOrdersByUserId(id);
    return getSuccessResponse<OrderType[]>(orders, ORDERS_FETCHED_SUCCESSFULLY);
  } catch (error) {
    return failedToFetchOrdersResponse(error as string);
  }
};
