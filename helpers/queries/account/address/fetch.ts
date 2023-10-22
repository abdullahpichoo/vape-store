import { useQuery } from "@tanstack/react-query";

import { addresses } from "@/contants/tags";
import { getAddresses } from "@/helpers/network/address";
import { AddressType } from "@/types/api/address";

export const useFetchAddresses = (
  userId: string,
  onSuccess?: (data: AddressType[]) => void,
  onError?: (error: unknown) => void
) =>
  useQuery<AddressType[]>(
    [addresses],
    async () => {
      const addressData = await getAddresses(userId);
      return addressData;
    },
    {
      onSuccess,
      onError,
    }
  );
