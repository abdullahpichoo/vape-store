import { NextRequest } from "next/server";

import { removeItem } from "@/backend/controllers/cart-controller";
import { getSuccessResponse } from "@/backend/utils/responses";
import { cartItemDeleteFailedResponse } from "@/backend/utils/responses/cart";
import { CART_ITEM_REMOVED_SUCCESSFULLY } from "@/contants/successMsgs";
import { CartItemType, CartType } from "@/types/api/cart";

export const POST = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      cartId: string;
    };
  }
) => {
  const { cartId } = params;
  const cartItem = (await req.json()) as CartItemType;

  if (!cartId || !cartItem) return cartItemDeleteFailedResponse();

  try {
    const cart = await removeItem(cartId, cartItem);
    return getSuccessResponse<CartType>(cart, CART_ITEM_REMOVED_SUCCESSFULLY);
  } catch {
    return cartItemDeleteFailedResponse();
  }
};
