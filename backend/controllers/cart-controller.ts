import {
  CART_NOT_FOUND,
  FAILED_TO_ADD_ITEM_TO_CART,
  FAILED_TO_CREATE_CART,
  FAILED_TO_REMOVE_ITEM_FROM_CART,
  ITEM_NOT_IN_STOCK,
  PRODUCT_NOT_FOUND,
} from "@/contants/errorMsgs";
import { CartItemType, CartType } from "@/types/api/cart";
import { ProductType } from "@/types/api/product";

import Cart from "../models/cart";
import Product from "../models/product";

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
    const product = (await Product.findById(cartItem.productId)) as ProductType;

    if (!product) {
      throw new Error(PRODUCT_NOT_FOUND);
    }
    if (!cart) {
      throw new Error(CART_NOT_FOUND);
    }

    if (cartItem.quantity > product.countInStock) {
      console.log("cart item", cartItem, cart);
      throw new Error(ITEM_NOT_IN_STOCK);
    }

    const existingItem = cart.items?.find(
      (item: CartItemType) => item.productId.toString() === cartItem.productId
    );

    if (existingItem && existingItem.quantity >= product.countInStock) {
      console.log("cart item existing", cartItem, cart);
      throw new Error(ITEM_NOT_IN_STOCK);
    }

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
