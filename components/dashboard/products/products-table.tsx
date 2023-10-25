"use client";

import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faSort,
  faEdit,
  faEllipsis,
  faLocationArrow,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { Pagination, SearchParams } from "@/types";
import { ProductType } from "@/types/api/product";

interface ProductsTableProps {
  data: ProductType[];
  pagination: Pagination;
  params: SearchParams;
  setParams: (params: SearchParams) => void;
}

const ProductsTable = (props: ProductsTableProps) => {
  const { data, pagination, params, setParams } = props;

  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: "_id",
      header: "#",
      cell: ({ row }) => {
        return <p>{row.index + 1}</p>;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "price",
      header: () => {
        return (
          <div
            className="flex items-center px-5 py-1.5 rounded-lg hover:bg-neutral-200 ease-in duration-200 cursor-pointer"
            role="button"
            onClick={() => {
              setParams({
                ...params,
                sortBy: "price",
                orderBy: params.orderBy === "asc" ? "desc" : "asc",
              });
            }}
          >
            <span>Price</span>
            <FontAwesomeIcon icon={faSort} className="text-lg ml-2" />
          </div>
        );
      },
    },
    {
      accessorKey: "countInStock",
      header: () => {
        return (
          <div
            className="flex items-center px-5 py-1.5 rounded-lg hover:bg-neutral-200 ease-in duration-200 cursor-pointer"
            role="button"
            onClick={() => {
              setParams({
                ...params,
                sortBy: "countInStock",
                orderBy: params.orderBy === "asc" ? "desc" : "asc",
              });
            }}
          >
            <span>Stock</span>
            <FontAwesomeIcon icon={faSort} className="text-lg ml-2" />
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "brand",
      header: "Brand",
    },
    {
      accessorKey: "trending",
      header: "Trending",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="text-xl text-center w-fit px-5 py-1.5 rounded-lg hover:bg-neutral-200 ease-in duration-200 cursor-pointer">
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href={`/product/${product._id}`}>
                    <span className="mr-2">
                      <FontAwesomeIcon icon={faLocationArrow} />
                    </span>
                    <span className="font-semibold text-black">View</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-yellow-600">
                  <Link href={`/admin/dashboard/products/${product._id}/edit`}>
                    <span className="mr-2">
                      <FontAwesomeIcon icon={faEdit} />
                    </span>
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Link
                    href={`/admin/dashboard/products/${product._id}/delete`}
                  >
                    <span className="mr-2">
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                    Delete
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
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
                    setParams({
                      ...params,
                      pageNumber: "1",
                    });
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
                    setParams({
                      ...params,
                      pageNumber: !!pagination.prevPage
                        ? pagination.prevPage.toString()
                        : pagination.totalPages.toString(),
                    });
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
                    setParams({
                      ...params,
                      pageNumber: !!pagination.nextPage
                        ? pagination.nextPage.toString()
                        : "1",
                    });
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
                    setParams({
                      ...params,
                      pageNumber: pagination.totalPages.toString(),
                    });
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

export default ProductsTable;
