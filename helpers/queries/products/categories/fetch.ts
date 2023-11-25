import { useQuery } from "@tanstack/react-query";

import { products } from "@/contants/tags";
import { getFilteredProducts } from "@/helpers/network/products";
import { Pagination } from "@/types";
import { ProductType } from "@/types/api/product";

type Products = {
  products: ProductType[];
  pagination: Pagination;
};

export type ProductsFilterParams = {
  categories: {
    label: string;
    value: string;
  }[];
  priceRange: {
    min: number;
    max: number;
  };
  pageNumber: number;
};

const convertFilterParamsToURL = (params: ProductsFilterParams) => {
  let url = "";

  url += `?pageNumber=${params.pageNumber}`;

  if (params.categories.length > 0) {
    params.categories.map((category) => {
      url += `&categories=${category.value}`;
    });
  }

  if (params.priceRange.min !== 0 || params.priceRange.max !== 0) {
    url += `&minPrice=${params.priceRange.min}&maxPrice=${params.priceRange.max}`;
  }

  return url;
};

export const useFetchFilteredProducts = (
  params: ProductsFilterParams,
  onSuccess?: (data: Products) => void,
  onError?: (error: unknown) => void
) => {
  const paramsURL = convertFilterParamsToURL(params);
  return useQuery<Products>(
    [products, paramsURL],
    async () => {
      const { products, pagination } = await getFilteredProducts(paramsURL);

      return { products, pagination };
    },
    {
      onSuccess,
      onError,
    }
  );
};
