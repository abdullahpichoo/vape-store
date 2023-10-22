import { useMutation } from "@tanstack/react-query";

import { addresses } from "@/contants/tags";
import { createAddress } from "@/helpers/network/address";
import { queryClient } from "@/lib/react-query";
import { AddressFormValues, AddressType } from "@/types/api/address";

export const useCreateAddress = (
  userId: string,
  onSuccess?: (data: AddressType) => void,
  onError?: (error: unknown) => void
) =>
  useMutation({
    mutationFn: async (address: AddressFormValues) => {
      if (!userId) return;
      const res = await createAddress(userId, address);
      console.log("Res", res);
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([addresses]);
      onSuccess && data && onSuccess(data);
    },
    onError,
  });
