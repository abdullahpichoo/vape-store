import { useQuery } from "@tanstack/react-query";

import { products } from "@/contants/tags";
import { getPaginatedProducts } from "@/helpers/network/products";
import { Pagination } from "@/types";
import { ProductType } from "@/types/api/product";

type AdminProducts = {
  products: ProductType[];
  pagination: Pagination;
};

export const useFetchAdminProducts = (
  params: string,
  onSuccess?: (data: AdminProducts) => void,
  onError?: (error: unknown) => void
) =>
  useQuery<AdminProducts>(
    [products, params],
    async () => {
      const { products, pagination } = await getPaginatedProducts(params);

      return {
        products,
        pagination,
      };
    },
    {
      onSuccess,
      onError,
    }
  );
