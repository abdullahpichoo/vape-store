import { useQuery } from "@tanstack/react-query";

import { adminOrders } from "@/contants/tags";
import { fetchAdminOrders } from "@/helpers/network/order";
import { Pagination, SearchParams } from "@/types";
import { OrderTableType, OrderType } from "@/types/api/order";
import { convertSearchParamsToURL, formatDate } from "@/utils/client";

type AdminOrders = {
  orders: OrderTableType[];
  pagination: Pagination;
};

export const useFetchAdminOrders = (
  searchParams: SearchParams,
  onSuccess?: (data: AdminOrders) => void,
  onError?: (error: unknown) => void
) =>
  useQuery<AdminOrders>(
    [adminOrders],
    async () => {
      const params = convertSearchParamsToURL("", searchParams);
      console.log("params", params);
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
