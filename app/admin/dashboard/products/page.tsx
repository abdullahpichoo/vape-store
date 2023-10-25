"use client";

import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

import ProductsTable from "@/components/dashboard/products/products-table";
import ErrorPage from "@/components/error";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FAILED_TO_GET_PRODUCTS } from "@/contants/errorMsgs";
import { useFetchAdminProducts } from "@/helpers/queries/products/fetch";
import { SearchParams } from "@/types";
import { convertSearchParamsToURL } from "@/utils/client";

export default function DashboardProducts() {
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

  const {
    data: productsData,
    isLoading,
    error,
  } = useFetchAdminProducts(convertSearchParamsToURL("", params));

  const getParams = (params: SearchParams) => {
    setParams(params);
  };

  const renderTable = useMemo(() => {
    return (
      <>
        {productsData && (
          <ProductsTable
            data={productsData.products}
            pagination={productsData.pagination}
            params={params}
            setParams={getParams}
          />
        )}
      </>
    );
  }, [productsData, params]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="w-full h-[5rem]" />
        <Skeleton className="w-full h-[30rem]" />
      </div>
    );
  }

  if (error) {
    return <ErrorPage message={FAILED_TO_GET_PRODUCTS} />;
  }

  return (
    <>
      <div className="container mx-auto py-5">
        <div className="flex justify-between items-center mb-4">
          <h2>Products</h2>
          <Link href={"/admin/dashboard/products/add"}>
            <Button size={"lg"}>
              <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />{" "}
              <span className="hidden sm:inline-block">Add Product</span>
            </Button>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row gap-10 mb-5">
          <div className="form-item flex flex-col gap-2">
            <label
              htmlFor="name"
              className="font-semibold text-neutral-600 ms-1 text-[1.2rem] md:text-[1.6rem]"
            >
              Search by Name
            </label>
            <input
              id="name"
              type="text"
              className="px-8 py-2 rounded-xl text-[1.4rem] md:text-[1.6rem] focus:outline-orange-1"
              placeholder="Enter Product Name"
              onChange={(e) => {
                setSearchBy({
                  searchBy: "name",
                  search: e.target.value,
                });
              }}
              defaultValue={searchBy.searchBy === "name" ? searchBy.search : ""}
            />
          </div>
          <div className="form-item flex flex-col gap-2">
            <label
              htmlFor="name"
              className="font-semibold text-neutral-600 ms-1 text-[1.2rem] md:text-[1.6rem]"
            >
              Search by Brand
            </label>
            <input
              id="name"
              type="text"
              className="px-8 py-2 rounded-xl text-[1.4rem] md:text-[1.6rem] focus:outline-orange-1"
              placeholder="Enter Brand Name"
              onChange={(e) => {
                setSearchBy({
                  searchBy: "brand",
                  search: e.target.value,
                });
              }}
              defaultValue={
                searchBy.searchBy === "brand" ? searchBy.search : ""
              }
            />
          </div>
        </div>
        {renderTable}
      </div>
    </>
  );
}
