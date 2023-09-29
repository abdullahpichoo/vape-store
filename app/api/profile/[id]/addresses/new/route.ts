import { NextRequest } from "next/server";

import { createAddress } from "@/backend/controllers/address-controller";
import {
  getErrorResponse,
  getSuccessResponse,
} from "@/backend/utils/responses";
import { FAILED_TO_CREATE_ADDRESS } from "@/contants/errorMsgs";
import { ADDRESS_CREATED_SUCCESSFULLY } from "@/contants/successMsgs";
import { AddressType } from "@/types/api/address";
import { connectToDatabase } from "@/utils/database";
import { dbConnectionErrorResponse } from "@/utils/server/responseHandlers";

export const POST = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  const { id: userId } = params;
  const address = (await req.json()) as AddressType;

  if (!address || !userId) return getErrorResponse(FAILED_TO_CREATE_ADDRESS);
  address.userId = userId;

  console.log("address", address);

  const isConnected = await connectToDatabase();
  if (!isConnected) return dbConnectionErrorResponse;

  try {
    const newAddress = await createAddress(address);
    return getSuccessResponse<AddressType>(
      newAddress,
      ADDRESS_CREATED_SUCCESSFULLY
    );
  } catch (err) {
    return getErrorResponse(FAILED_TO_CREATE_ADDRESS);
  }
};

// Payload
// {
//     "street": "147 Negroaurora Lane",
//     "city": "Alberqueue",
//     "state": "Alabama",
//     "phoneNo": "1235465",
//     "zipCode": "123",
//     "country": "USA"
//   }
