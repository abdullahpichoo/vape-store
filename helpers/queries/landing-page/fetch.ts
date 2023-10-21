import { useQuery } from "@tanstack/react-query";

import { bestSelling, featured } from "@/contants/tags";
import { getProducts } from "@/helpers/network/products";
import { ProductType } from "@/types/api/product";

export const useBestSellingProducts = (inView: boolean) =>
  useQuery<ProductType[]>(
    [bestSelling],
    async () => {
      const payloadProducts = await getProducts();
      return payloadProducts;
    },
    {
      retry: 5,
      enabled: inView,
    }
  );

export const useFeaturedProducts = (inView: boolean) =>
  useQuery<ProductType[]>(
    [featured],
    async () => {
      const payloadProducts = await getProducts();
      return payloadProducts;
    },
    {
      retry: 5,
      enabled: inView,
    }
  );
