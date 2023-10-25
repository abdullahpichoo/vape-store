"use client";

import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

import OrdersTable from "@/components/dashboard/orders/orders-table";
import ErrorPage from "@/components/error";
import { Skeleton } from "@/components/ui/skeleton";
import { FAILED_TO_FETCH_ORDERS } from "@/contants/errorMsgs";
import { useFetchAdminOrders } from "@/helpers/queries/order/fetch";
import { SearchParams } from "@/types";
import { convertSearchParamsToURL } from "@/utils/client";

const AdminOrders = () => {
  const [searchBy, setSearchBy] = useState({
    searchBy: "",
    search: "",
  });
  const [params, setParams] = useState<SearchParams>({
    pageSize: "10",
    pageNumber: "1",
    sortBy: "createdAt",
    orderBy: "desc",
    searchBy: "",
    search: "",
  });
  const [query] = useDebounce(searchBy, 750);

  useEffect(() => {
    if (!query.search) {
      setParams((prev) => ({
        ...prev,
        searchBy: "",
        search: "",
      }));
    } else {
      setParams((prev) => ({
        ...prev,
        searchBy: query.searchBy,
        search: query.search,
      }));
    }
  }, [query]);

  const { data, isLoading, error } = useFetchAdminOrders(
    convertSearchParamsToURL("", params)
  );

  const getParams = (params: SearchParams) => {
    setParams(params);
  };

  const renderTable = useMemo(() => {
    return (
      <>
        {data && (
          <OrdersTable
            data={data.orders}
            pagination={data.pagination}
            params={params}
            setParams={getParams}
          />
        )}
      </>
    );
  }, [data, params]);

  if (isLoading)
    return (
      <div className="flex flex-col gap-5">
        <Skeleton className="w-full h-[5rem]" />
        <Skeleton className="w-full h-[25rem]" />
      </div>
    );

  if (error)
    return <ErrorPage message={(FAILED_TO_FETCH_ORDERS + error) as string} />;

  return (
    <>
      <div className="container mx-auto">
        <h2 className="mb-5">Orders</h2>
        <div className="flex flex-col sm:flex-row gap-10 mb-5">
          <div className="form-item flex flex-col gap-2">
            <label
              htmlFor="name"
              className="font-semibold text-neutral-600 ms-1 text-[1.2rem] md:text-[1.6rem]"
            >
              Search by User
            </label>
            <input
              id="name"
              type="text"
              className="px-8 py-2 rounded-xl text-[1.4rem] md:text-[1.6rem] focus:outline-orange-1"
              placeholder="Enter User Email"
              onChange={(e) => {
                setSearchBy({
                  searchBy: "user.email",
                  search: e.target.value,
                });
              }}
              defaultValue={
                searchBy.searchBy === "user.email" ? searchBy.search : ""
              }
            />
          </div>
        </div>
        {renderTable}
      </div>
    </>
  );
};

export default AdminOrders;
