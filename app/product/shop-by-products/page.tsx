"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ReactPaginate from "react-paginate";

import ErrorPage from "@/components/error";
import Heading from "@/components/ui/heading";
import { FAILED_TO_GET_PRODUCTS } from "@/contants/errorMsgs";
import {
  ProductsFilterParams,
  useFetchFilteredProducts,
} from "@/helpers/queries/products/categories/fetch";

import FilterForm from "./filter-form";
import FilteredProducts from "./filtered-products";
import Loading from "./loading";

const ShopByProducts = () => {
  const searchParams = useSearchParams();

  const [params, setParams] = useState<ProductsFilterParams>({
    categories: searchParams.get("categories")
      ? [
          {
            value: searchParams.get("categories") || "",
            label: searchParams.get("categories") || "",
          },
        ]
      : [],
    priceRange: {
      min: 1,
      max: 1000,
    },
    pageNumber: 1,
  });

  const {
    data: productsData,
    isLoading,
    isError,
  } = useFetchFilteredProducts(params);

  const onChangeParams = (params: ProductsFilterParams) => {
    setParams(params);
  };

  return (
    <section className=" sm:-mx-20 md:-mx-32 xl:-mx-[28rem]">
      <div className="mb-12">
        <Heading size="xl">All Products</Heading>
      </div>

      <section className="grid grid-cols-12 gap-5 relative">
        <FilterForm params={params} onChangeParams={onChangeParams} />

        <div className="col-span-12 lg:col-span-10">
          {isLoading ? (
            <>
              <Loading />
            </>
          ) : (
            <>
              {isError ? (
                <ErrorPage message={FAILED_TO_GET_PRODUCTS} />
              ) : (
                <>
                  <FilteredProducts productsData={productsData.products} />
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={(e) => {
                      const selectedPage = e.selected + 1;
                      setParams({
                        ...params,
                        pageNumber: selectedPage,
                      });
                    }}
                    pageRangeDisplayed={5}
                    pageCount={productsData.pagination.totalPages}
                    previousLabel="< previous"
                    className="pagination flex justify-end items-center gap-2 my-5 w-full flex-wrap"
                    activeClassName="active-page"
                    forcePage={productsData.pagination.currentPage - 1}
                  />
                </>
              )}
            </>
          )}
        </div>
      </section>
    </section>
  );
};

export default ShopByProducts;
