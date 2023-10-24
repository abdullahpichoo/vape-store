"use client";

import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Pagination } from "@/types";
import { OrderTableType } from "@/types/api/order";

import { DataTable } from "./data-table";

interface OrdersTableProps {
  data: OrderTableType[];
  pagination: Pagination;
}

const OrdersTable = (props: OrdersTableProps) => {
  const { data, pagination } = props;

  const [params, setParams] = useState({
    sortBy: "createdAt",
    orderBy: "asc",
    searchBy: "",
  });

  const router = useRouter();

  const columns: ColumnDef<OrderTableType>[] = [
    {
      accessorKey: "user",
      header: "User",
    },
    {
      accessorKey: "totalPrice",
      header: "Total Price",
    },
    {
      accessorKey: "status",
      header: () => {
        return (
          <div
            className="flex items-center px-5 py-1.5 rounded-lg hover:bg-neutral-200 ease-in duration-200 cursor-pointer"
            role="button"
            onClick={() => {
              setParams({
                ...params,
                sortBy: "status",
                orderBy: params.orderBy === "asc" ? "desc" : "asc",
              });
              router.push(
                `/admin/dashboard/orders?pageNumber=${
                  pagination.currentPage
                }&pageSize=10&sortBy=status&orderBy=${
                  params.orderBy === "asc" ? "desc" : "asc"
                }`
              );
            }}
          >
            <span>Status</span>
            <FontAwesomeIcon icon={faSort} className="text-lg ml-2" />
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: () => {
        return (
          <div
            className="flex items-center px-5 py-1.5 rounded-lg hover:bg-neutral-200 ease-in duration-200 cursor-pointer"
            role="button"
            onClick={() => {
              setParams({
                ...params,
                sortBy: "createdAt",
                orderBy: params.orderBy === "asc" ? "desc" : "asc",
              });
              router.push(
                `/admin/dashboard/orders?pageNumber=${
                  pagination.currentPage
                }&pageSize=10&sortBy=createdAt&orderBy=${
                  params.orderBy === "asc" ? "desc" : "asc"
                }`
              );
            }}
          >
            <span>Order Date</span>
            <FontAwesomeIcon icon={faSort} className="text-lg ml-2" />
          </div>
        );
      },
    },

    {
      accessorKey: "actions",
      header: "Actions",
      id: "actions",
    },
  ];

  return (
    <>
      {data && (
        <>
          <DataTable data={data} columns={columns} />
          <div className="flex items-center justify-between px-8 py-5 border-neutral-100 border-2 rounded-lg font-hind">
            <div className="flex items-center space-x-6 lg:space-x-8">
              <div className="flex w-[100px] text-muted-foreground items-center justify-center text-2xl font-medium">
                Page {pagination.currentPage} of {pagination.totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-4 lg:flex"
                  onClick={() => {
                    router.push(`/admin/dashboard/orders?pageNumber=1
                    }&pageSize=10&sortBy=${params.sortBy}&orderBy=${params.orderBy}`);
                  }}
                  disabled={
                    pagination.currentPage === 1 || pagination.prevPage === 0
                  }
                >
                  <span className="sr-only">Go to first page</span>
                  <FontAwesomeIcon
                    icon={faAnglesLeft}
                    className="text-2xl text-orange-1"
                  />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-4"
                  onClick={() => {
                    router.push(
                      `/admin/dashboard/orders?pageNumber=${
                        !!pagination.prevPage
                          ? Number(pagination.prevPage)
                          : Number(pagination.totalPages)
                      }&pageSize=10&sortBy=${params.sortBy}&orderBy=${
                        params.orderBy
                      }`
                    );
                  }}
                  disabled={
                    pagination.currentPage === 1 || pagination.prevPage === 0
                  }
                >
                  <span className="sr-only">Go to previous page</span>
                  <FontAwesomeIcon icon={faAngleLeft} className="text-2xl" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-4"
                  onClick={() => {
                    router.push(
                      `/admin/dashboard/orders?pageNumber=${
                        !!pagination.nextPage ? Number(pagination.nextPage) : 1
                      }&pageSize=10&sortBy=${params.sortBy}&orderBy=${
                        params.orderBy
                      }`
                    );
                  }}
                  disabled={pagination.nextPage === 0}
                >
                  <span className="sr-only">Go to next page</span>
                  <FontAwesomeIcon icon={faAngleRight} className="text-2xl" />
                </Button>
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-4 lg:flex"
                  onClick={() => {
                    router.push(
                      `/admin/dashboard/orders?pageNumber=${Number(
                        pagination.totalPages
                      )}&pageSize=10&sortBy=${params.sortBy}&orderBy=${
                        params.orderBy
                      }`
                    );
                  }}
                  disabled={pagination.nextPage === 0}
                >
                  <span className="sr-only">Go to last page</span>
                  <FontAwesomeIcon
                    icon={faAnglesRight}
                    className="text-2xl text-orange-1"
                  />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrdersTable;
