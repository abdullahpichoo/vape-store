import { useQuery } from "@tanstack/react-query";

import { adminOrders, orders } from "@/contants/tags";
import { fetchAdminOrders, fetchUserOrders } from "@/helpers/network/order";
import { Pagination } from "@/types";
import { OrderTableType, OrderType } from "@/types/api/order";
import { formatDate } from "@/utils/client";

type AdminOrders = {
  orders: OrderTableType[];
  pagination: Pagination;
};

export const useFetchOrders = (
  userId: string,
  onSuccess?: (data: OrderType[]) => void,
  onError?: (error: unknown) => void
) =>
  useQuery<OrderType[]>(
    [orders, userId],
    async () => {
      const res = await fetchUserOrders(userId);
      return res;
    },
    {
      onSuccess,
      onError,
    }
  );

export const useFetchAdminOrders = (
  params: string,
  onSuccess?: (data: AdminOrders) => void,
  onError?: (error: unknown) => void
) =>
  useQuery<AdminOrders>(
    [adminOrders, params],
    async () => {
      const res = await fetchAdminOrders(params);

      const filteredOrders: OrderTableType[] = res.body.payLoad.map(
        (order: OrderType) => {
          return {
            _id: order._id,
            user: order.user.email,
            totalPrice: order.totalPrice,
            status: order.status,
            createdAt: order.createdAt
              ? formatDate(new Date(order.createdAt))
              : "",
          };
        }
      );

      return {
        orders: filteredOrders,
        pagination: res.body.pagination,
      };
    },
    {
      onSuccess,
      onError,
    }
  );
