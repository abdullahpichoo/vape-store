import { addAddressApiRoute, addressesApiRoute } from "@/routes/api";
import { AddressFormValues, AddressType } from "@/types/api/address";

export const getAddresses = async (userId: string): Promise<AddressType[]> => {
  try {
    const response = await fetch(addressesApiRoute(userId), {
      credentials: "include",
    });

    const data = await response.json();
    return data.body.payLoad;
  } catch {
    throw new Error();
  }
};

export const createAddress = async (
  userId: string,
  data: AddressFormValues
): Promise<AddressType> => {
  try {
    const response = await fetch(addAddressApiRoute(userId), {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    return responseData.body.payLoad;
  } catch {
    throw new Error();
  }
};
