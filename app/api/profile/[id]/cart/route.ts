import Cart from "@/backend/models/cart";
import { getSuccessResponse } from "@/backend/utils/responses";
import {
  cartFetchFailedResponse,
  cartNotFoundResponse,
} from "@/backend/utils/responses/cart";
import { failedToConnectToDatabaseResponse } from "@/backend/utils/responses/database";
import { CART_FETCHED_SUCCESSFULLY } from "@/contants/successMsgs";
import { CartType } from "@/types/api/cart";
import { connectToDatabase } from "@/utils/database";

// GET: /api/profile/[id]/cart
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
  const { id: userId } = params;
  if (!userId) return cartNotFoundResponse();

  const isConnected = await connectToDatabase();
  if (!isConnected) return failedToConnectToDatabaseResponse();

  try {
    const cart = await Cart.findOne({ userId: userId });
    return getSuccessResponse<CartType>(cart, CART_FETCHED_SUCCESSFULLY);
  } catch (err) {
    return cartFetchFailedResponse();
  }
};
