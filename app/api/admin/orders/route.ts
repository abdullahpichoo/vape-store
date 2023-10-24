import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import {
  getAllOrders,
  getAllOrdersServer,
} from "@/backend/controllers/order-controller";
import { getSuccessResponse } from "@/backend/utils/responses";
import { unauthenticatedResponse } from "@/backend/utils/responses/auth";
import { failedToConnectToDatabaseResponse } from "@/backend/utils/responses/database";
import { failedToFetchOrdersResponse } from "@/backend/utils/responses/order";
import { ORDERS_FETCHED_SUCCESSFULLY } from "@/contants/successMsgs";
import { OrderType } from "@/types/api/order";
import { connectToDatabase } from "@/utils/database";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  console.log("Search Params Server", searchParams.toString());

  const isConnected = await connectToDatabase();
  if (!isConnected) return failedToConnectToDatabaseResponse();

  try {
    const { orders, pagination } = await getAllOrdersServer(searchParams);
    return getSuccessResponse<OrderType[]>(
      orders,
      ORDERS_FETCHED_SUCCESSFULLY,
      pagination
    );
  } catch (error) {
    return failedToFetchOrdersResponse();
  }
};
