import { useQuery } from "@tanstack/react-query";

import { cart } from "@/contants/tags";
import { getCart } from "@/helpers/network/cart";
import { CartType } from "@/types/api/cart";

export const useFetchCart = (
  userId: string,
  onSuccess?: (data: CartType) => void,
  onError?: (error: unknown) => void
) =>
  useQuery<CartType>(
    [cart],
    async () => {
      const cartData = await getCart(userId);
      return cartData;
    },
    {
      onSuccess,
      onError,
    }
  );
