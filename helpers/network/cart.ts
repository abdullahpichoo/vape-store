import { cart } from "@/contants/tags";
import {
  addToCartApiRoute,
  cartApiRoute,
  removeItemFromCartApi,
} from "@/routes/api";
import { CartItemType, CartType } from "@/types/api/cart";

export const getCart = async (userId: string): Promise<CartType> => {
  try {
    const response = await fetch(cartApiRoute(userId), {
      next: { revalidate: 3600, tags: [cart] },
    });

    const data = await response.json();
    return data.body.payLoad;
  } catch {
    throw new Error();
  }
};

export const addToCart = async (
  userId: string,
  cartId: string,
  cartItem: CartItemType
) => {
  try {
    const response = await fetch(addToCartApiRoute(userId, cartId), {
      method: "POST",
      body: JSON.stringify(cartItem),
    });

    const data = await response.json();
    return data.body.payLoad;
  } catch {
    throw new Error();
  }
};

export const removeFromCart = async (
  userId: string,
  cartId: string,
  cartItem: CartItemType
) => {
  try {
    const response = await fetch(removeItemFromCartApi(userId, cartId), {
      method: "POST",
      body: JSON.stringify(cartItem),
    });

    const data = await response.json();
    return data.body.payLoad;
  } catch {
    throw new Error();
  }
};
