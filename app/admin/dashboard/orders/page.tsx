import OrdersTable from "@/components/dashboard/orders/orders-table";
import { fetchAdminOrders } from "@/helpers/network/order";
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
    const res = await fetchAdminOrders(urlParams);
    console.log("Res", res);

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

    console.log("filtetedOrders", filteredOrders);

    return {
      orders: filteredOrders,
      pagination: res.body.pagination,
    };
  } catch (err) {
    console.log("Err", err);
    throw new Error(err as string);
  }
};

const AdminOrders = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { orders, pagination } = await getData(searchParams);

  return (
    <>
      <OrdersTable data={orders} pagination={pagination} />{" "}
    </>
  );
};

export default AdminOrders;
