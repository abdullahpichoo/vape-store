import { useQuery } from "@tanstack/react-query";

import { products } from "@/contants/tags";
import {
  getFilteredProducts,
  getPaginatedProducts,
} from "@/helpers/network/products";
import { Pagination } from "@/types";
import { ProductType } from "@/types/api/product";

type Products = {
  products: ProductType[];
  pagination: Pagination;
};

export const useFetchFilteredProducts = (
  params: string,
  onSuccess?: (data: ProductType[]) => void,
  onError?: (error: unknown) => void
) =>
  useQuery<ProductType[]>(
    [products, params],
    async () => {
      const products = await getFilteredProducts(params);

      return products;
    },
    {
      onSuccess,
      onError,
    }
  );
