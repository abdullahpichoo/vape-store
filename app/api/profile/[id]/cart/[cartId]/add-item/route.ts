import { NextRequest } from "next/server";

import { addItem } from "@/backend/controllers/cart-controller";
import { getSuccessResponse } from "@/backend/utils/responses";
import { cartItemCreationFailedResponse } from "@/backend/utils/responses/cart";
import { CART_ITEM_ADDED_SUCCESSFULLY } from "@/contants/successMsgs";
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

  if (!cartId || !cartItem) return cartItemCreationFailedResponse();

  try {
    const cart = await addItem(cartId, cartItem);
    return getSuccessResponse<CartType>(cart, CART_ITEM_ADDED_SUCCESSFULLY);
  } catch {
    return cartItemCreationFailedResponse();
  }
};
