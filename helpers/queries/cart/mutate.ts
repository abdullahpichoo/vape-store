import { useMutation } from "@tanstack/react-query";

import { cart } from "@/contants/tags";
import { addToCart, removeFromCart } from "@/helpers/network/cart";
import { queryClient } from "@/lib/react-query";
import { CartItemType, CartType } from "@/types/api/cart";

export const useAddItemToCart = (
  userId: string,
  cartData: CartType,
  onSuccess?: (data: CartType) => void,
  onError?: (error: unknown) => void
) =>
  useMutation({
    mutationFn: async (cartItem: CartItemType) => {
      if (!userId) return;
      console.log("CartData", cartData);
      const res = await addToCart(userId, cartData._id, cartItem);
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([cart]);
      onSuccess && onSuccess(data);
    },
    onError,
  });

export const useRemoveItemFromCart = (
  userId: string,
  cartData: CartType,
  onSuccess?: (data: CartType) => void,
  onError?: (error: unknown) => void
) =>
  useMutation({
    mutationFn: async (cartItem: CartItemType) => {
      if (!cartData) return;
      const res = await removeFromCart(userId, cartData._id, cartItem);
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([cart]);
      onSuccess && onSuccess(data);
    },
    onError,
  });
