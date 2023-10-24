"use client";

import { useMemo } from "react";

import OrdersTable from "@/components/dashboard/orders/orders-table";
import ErrorPage from "@/components/error";
import { Skeleton } from "@/components/ui/skeleton";
import { FAILED_TO_FETCH_ORDERS } from "@/contants/errorMsgs";
import { useFetchAdminOrders } from "@/helpers/queries/order/fetch";
import { SearchParams } from "@/types";
import { convertSearchParamsToURL } from "@/utils/client";

const AdminOrders = ({ searchParams }: { searchParams: SearchParams }) => {
  const { data, isLoading, error } = useFetchAdminOrders(
    convertSearchParamsToURL("", searchParams)
  );

  const renderTable = useMemo(() => {
    return (
      <>
        {data && (
          <OrdersTable
            data={data.orders}
            pagination={data.pagination}
            params={searchParams}
          />
        )}
      </>
    );
  }, [data, searchParams]);

  if (isLoading)
    return (
      <div className="flex flex-col gap-5">
        <Skeleton className="w-full h-[5rem]" />
        <Skeleton className="w-full h-[25rem]" />
      </div>
    );

  if (error)
    return <ErrorPage message={(FAILED_TO_FETCH_ORDERS + error) as string} />;

  return <>{renderTable}</>;
};

export default AdminOrders;
