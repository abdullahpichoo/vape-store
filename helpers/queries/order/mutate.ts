import { useMutation } from "@tanstack/react-query";

import { cart, orders } from "@/contants/tags";
import { createOrder, updateOrder } from "@/helpers/network/order";
import { queryClient } from "@/lib/react-query";
import { OrderPayloadType, OrderType } from "@/types/api/order";

export const useCreateOrder = (
  userId: string,
  onSuccess?: (data: OrderPayloadType) => void,
  onError?: (error: unknown) => void
) =>
  useMutation({
    mutationFn: async (order: OrderPayloadType) => {
      if (!userId) return;
      const res = await createOrder(userId, order);
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([orders]);
      queryClient.invalidateQueries([cart]);
      onSuccess && data && onSuccess(data);
    },
    onError,
  });

export const useUpdateOrder = (
  orderId: string,
  onSuccess?: (data: OrderType) => void,
  onError?: (error: unknown) => void
) =>
  useMutation({
    mutationFn: async (order: OrderPayloadType) => {
      if (!orderId) return;
      const res = await updateOrder(orderId, order);
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([orders]);
      onSuccess && data && onSuccess(data);
    },
    onError,
  });
