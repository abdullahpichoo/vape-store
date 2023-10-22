import { NextRequest } from "next/server";

import { createOrder } from "@/backend/controllers/order-controller";
import { getSuccessResponse } from "@/backend/utils/responses";
import { failedToConnectToDatabaseResponse } from "@/backend/utils/responses/database";
import { failedToCreateOrderResponse } from "@/backend/utils/responses/order";
import { ORDER_CREATED_SUCCESSFULLY } from "@/contants/successMsgs";
import { OrderType } from "@/types/api/order";
import { connectToDatabase } from "@/utils/database";

export async function POST(req: NextRequest) {
  const order: OrderType = await req.json();
  if (!order) return failedToCreateOrderResponse();

  const isConnected = await connectToDatabase();
  if (!isConnected) return failedToConnectToDatabaseResponse();

  try {
    const createdOrder = await createOrder(order);
    return getSuccessResponse<OrderType>(
      createdOrder,
      ORDER_CREATED_SUCCESSFULLY
    );
  } catch (error) {
    return failedToCreateOrderResponse();
  }
}
