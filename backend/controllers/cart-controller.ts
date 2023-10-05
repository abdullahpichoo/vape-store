import {
  CART_NOT_FOUND,
  FAILED_TO_ADD_ITEM_TO_CART,
  FAILED_TO_CREATE_CART,
  FAILED_TO_REMOVE_ITEM_FROM_CART,
} from "@/contants/errorMsgs";
import { CartItemType, CartType } from "@/types/api/cart";

import Cart from "../models/cart";

export const createCart = async (userId: string): Promise<CartType> => {
  try {
    const cart = await Cart.findOne({ userId: userId });
    if (cart) {
      return cart;
    }
    try {
      const newCart = (await Cart.create({
        userId: userId,
        items: [],
      })) as CartType;
      return newCart;
    } catch (err) {
      throw new Error(FAILED_TO_CREATE_CART);
    }
  } catch (err) {
    throw new Error(FAILED_TO_CREATE_CART);
  }
};

export const addItem = async (
  cartId: string,
  cartItem: CartItemType
): Promise<CartType> => {
  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      throw new Error(CART_NOT_FOUND);
    }

    const existingItem = cart.items?.find(
      (item: CartItemType) => item.productId.toString() === cartItem.productId
    );
    if (existingItem) {
      existingItem.quantity += cartItem.quantity;
    } else {
      console.log("Adding Item", cartItem);
      cart.items.push(cartItem);
    }

    await cart.save();
    return cart;
  } catch (err) {
    throw new Error(FAILED_TO_ADD_ITEM_TO_CART);
  }
};

export const removeItem = async (
  cartId: string,
  cartItem: CartItemType
): Promise<CartType> => {
  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      throw new Error(CART_NOT_FOUND);
    }

    const existingItemIndex = cart.items.findIndex(
      (item: CartItemType) => item.productId.toString() === cartItem.productId
    );

    if (existingItemIndex !== -1) {
      cart.items.splice(existingItemIndex, 1);
    }

    await cart.save();
    return cart;
  } catch (err) {
    throw new Error(FAILED_TO_REMOVE_ITEM_FROM_CART);
  }
};

export const reduceItemQuantity = async (
  cartId: string,
  cartItem: CartItemType
): Promise<CartType> => {
  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      throw new Error(CART_NOT_FOUND);
    }

    const existingItemIndex = cart.items.findIndex(
      (item: CartItemType) => item.productId.toString() === cartItem.productId
    );

    console.log("Existing Item Index", existingItemIndex);

    if (existingItemIndex !== -1) {
      const existingItem = cart.items[existingItemIndex];
      console.log("Existing Item", existingItem);

      if (existingItem.quantity <= 1) {
        cart.items.splice(existingItemIndex, 1);
      } else {
        existingItem.quantity -= 1;
      }
    }

    await cart.save();
    return cart;
  } catch (err) {
    throw new Error(FAILED_TO_REMOVE_ITEM_FROM_CART);
  }
};
