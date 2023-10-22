import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import {
  getOrderById,
  updateOrder,
} from "@/backend/controllers/order-controller";
import { getSuccessResponse } from "@/backend/utils/responses";
import { unauthenticatedResponse } from "@/backend/utils/responses/auth";
import { failedToConnectToDatabaseResponse } from "@/backend/utils/responses/database";
import {
  failedToFetchOrderResponse,
  failedToUpdateOrderResponse,
  orderNotFoundResponse,
} from "@/backend/utils/responses/order";
import { ORDER_FETCHED_SUCCESSFULLY } from "@/contants/successMsgs";
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
    const order = await getOrderById(id);
    return getSuccessResponse<OrderType>(order, ORDER_FETCHED_SUCCESSFULLY);
  } catch (error) {
    return failedToFetchOrderResponse();
  }
};

export const PUT = async (
  req: NextRequest,
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

  const order = (await req.json()) as OrderType;

  if (!order || !id) return orderNotFoundResponse();

  const isConnected = await connectToDatabase();
  if (!isConnected) return failedToConnectToDatabaseResponse();

  try {
    const orderRes = await updateOrder(id, order);
    return getSuccessResponse<OrderType>(orderRes, ORDER_FETCHED_SUCCESSFULLY);
  } catch (error) {
    return failedToUpdateOrderResponse(error as string);
  }
};
