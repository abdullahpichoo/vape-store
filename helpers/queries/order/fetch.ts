import { useQuery } from "@tanstack/react-query";

import { adminOrders } from "@/contants/tags";
import { fetchUserOrders } from "@/helpers/network/order";
import { OrderType } from "@/types/api/order";

export const useFetchOrders = (
  userId: string,
  onSuccess?: (data: OrderType[]) => void,
  onError?: (error: unknown) => void
) =>
  useQuery<OrderType[]>(
    [adminOrders],
    async () => {
      const res = await fetchUserOrders(userId);
      return res;
    },
    {
      onSuccess,
      onError,
    }
  );
