import OrdersTable from "@/components/dashboard/orders/orders-table";
import { adminOrdersApiRoute } from "@/routes/api";
import { Pagination as PaginationT, SearchParams } from "@/types";
import { OrderTableType, OrderType } from "@/types/api/order";
import { convertSearchParamsToURL, formatDate } from "@/utils/client";

const getData = async (
  params: SearchParams
): Promise<{
  orders: OrderTableType[];
  pagination: PaginationT;
}> => {
  try {
    const urlParams = convertSearchParamsToURL("", params);
    console.log("url Params", urlParams);
    const response = await fetch(adminOrdersApiRoute(urlParams), {
      credentials: "include",
      cache: "no-cache",
    });

    const res = await response.json();

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
  } catch {
    throw new Error();
  }
};

const AdminOrders = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  console.log("searchParams", searchParams);
  const { orders, pagination } = await getData(searchParams);
  console.log("pagination", pagination);

  return (
    <>
      <OrdersTable data={orders} pagination={pagination} />
    </>
  );
};

export default AdminOrders;
