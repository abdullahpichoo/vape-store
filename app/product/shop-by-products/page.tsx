"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactPaginate from "react-paginate";
import Select from "react-select";

import ErrorPage from "@/components/error";
import Button from "@/components/ui/btn";
import Card from "@/components/ui/card";
import InputController from "@/components/ui/form/input-controller";
import Heading from "@/components/ui/heading";
import { Skeleton } from "@/components/ui/skeleton";
import { FAILED_TO_GET_PRODUCTS } from "@/contants/errorMsgs";
import { categories } from "@/contants/product/categories";
import {
  ProductsFilterParams,
  useFetchFilteredProducts,
} from "@/helpers/queries/products/categories/fetch";
import { ProductFilterFormValues } from "@/types/api/product";

import FilteredProducts from "./filtered-products";
import Loading from "./loading";

const ShopByProducts = () => {
  const [params, setParams] = useState<ProductsFilterParams>({
    categories: [],
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

  const { handleSubmit, control } = useForm<ProductFilterFormValues>({
    defaultValues: {
      categories: [],
      priceRange: {
        min: 1,
        max: 1000,
      },
    },
  });

  const onFilterChange = (values: ProductFilterFormValues) => {
    const { categories, priceRange } = values;
    setParams({
      ...params,
      categories: categories,
      priceRange: {
        min: priceRange.min,
        max: priceRange.max,
      },
    });
  };

  return (
    <section className=" sm:-mx-20 md:-mx-32 xl:-mx-[28rem]">
      <div className="mb-12">
        <Heading size="xl">All Products</Heading>
      </div>

      <section className="grid grid-cols-12 gap-5 relative">
        <Card className="filter sticky top-0 z-[500] col-span-12 lg:col-span-2 h-fit">
          <form action="" onSubmit={handleSubmit(onFilterChange)}>
            <div className="categories-filter flex flex-col sm:flex-row lg:flex-col justify-between align-middle gap-5">
              <h5>Filters</h5>
              <div className="form-item flex flex-col gap-2 w-full">
                <label
                  htmlFor={"categories"}
                  className="font-semibold text-neutral-600 ms-1 text-[1.2rem] md:text-[1.6rem]"
                >
                  Categories
                </label>
                <Controller
                  control={control}
                  name={"categories"}
                  render={({ field }) => (
                    <Select
                      isMulti
                      {...field}
                      options={categories}
                      className="z-[100]"
                    />
                  )}
                />
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col justify-center items-center gap-2">
                <InputController
                  control={control}
                  name={"priceRange.min"}
                  type="number"
                  label="Min Price (USD)"
                  placeholder="$1"
                />
                <InputController
                  control={control}
                  name={"priceRange.max"}
                  type="number"
                  label="Max Price (USD)"
                  placeholder="$500"
                />
              </div>
            </div>
            <div className="my-5 text-center lg:text-start">
              <Button variant="black" size="sm">
                Apply Filter
              </Button>
            </div>
          </form>
        </Card>
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
