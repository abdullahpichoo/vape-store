"use client";

import { useCallback } from "react";

import ErrorPage from "@/components/error";
import Heading from "@/components/ui/heading";
import { Skeleton } from "@/components/ui/skeleton";
import { FAILED_TO_GET_PRODUCTS } from "@/contants/errorMsgs";
import { useFetchFilteredProducts } from "@/helpers/queries/products/categories/fetch";
import { ProductFilterFormValues } from "@/types/api/product";

import FilteredProducts from "./filtered-products";

const ShopByProducts = () => {
  const {
    data: productsData,
    isLoading,
    isError,
  } = useFetchFilteredProducts("");

  const onFilterChange = useCallback((values: ProductFilterFormValues) => {
    const { categories, priceRange } = values;
    const categoriesQuery = categories
      ? categories.map((category) => `categories=${category.value}`).join("&")
      : "";
    const priceRangeQuery =
      priceRange && priceRange.min && priceRange.max
        ? `priceRange=${priceRange.min}-${priceRange.max}`
        : "";
    const query = `${categoriesQuery}&${priceRangeQuery}`;
    console.log("Query", query);
  }, []);

  return (
    <section>
      <Heading size="xl">All Products</Heading>
      {isLoading ? (
        <>
          <div className="flex gap-5">
            <Skeleton className="w-full h-[20rem]" />
            <Skeleton className="w-full h-[20rem]" />
            <Skeleton className="w-full h-[20rem]" />
            <Skeleton className="w-full h-[20rem]" />
          </div>
        </>
      ) : (
        <>
          {isError ? (
            <ErrorPage message={FAILED_TO_GET_PRODUCTS} />
          ) : (
            <>
              <FilteredProducts
                productsData={productsData}
                onFilterChange={onFilterChange}
              />
            </>
          )}
        </>
      )}
    </section>
  );
};

export default ShopByProducts;
