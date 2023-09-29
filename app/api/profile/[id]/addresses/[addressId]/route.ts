import { NextRequest } from "next/server";

import {
  deleteAddress,
  updateAddress,
} from "@/backend/controllers/address-controller";
import {
  getErrorResponse,
  getSuccessResponse,
} from "@/backend/utils/responses";
import {
  FAILED_TO_DELETE_ADDRESS,
  FAILED_TO_UPDATE_ADDRESS,
} from "@/contants/errorMsgs";
import {
  ADDRESS_DELETED_SUCCESSFULLY,
  ADDRESS_UPDATED_SUCCESSFULLY,
} from "@/contants/successMsgs";
import { AddressType } from "@/types/api/address";
import { connectToDatabase } from "@/utils/database";
import { dbConnectionErrorResponse } from "@/utils/server/responseHandlers";

export const PUT = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      addressId: string;
    };
  }
) => {
  const { addressId } = params;
  const address = (await req.json()) as AddressType;

  console.log("address", address);

  if (!address || !addressId) return getErrorResponse(FAILED_TO_UPDATE_ADDRESS);

  const isConnected = await connectToDatabase();
  if (!isConnected) return dbConnectionErrorResponse;

  try {
    const updatedAddress = await updateAddress(addressId, address);
    return getSuccessResponse<AddressType>(
      updatedAddress,
      ADDRESS_UPDATED_SUCCESSFULLY
    );
  } catch (err) {
    return getErrorResponse(FAILED_TO_UPDATE_ADDRESS);
  }
};

export const DELETE = async (
  _: any,
  { params }: { params: { addressId: string } }
) => {
  const { addressId } = params;
  if (!addressId) return getErrorResponse(FAILED_TO_DELETE_ADDRESS);

  const isConnected = await connectToDatabase();
  if (!isConnected) return dbConnectionErrorResponse;

  try {
    const address = await deleteAddress(addressId);
    return getSuccessResponse<AddressType>(
      address,
      ADDRESS_DELETED_SUCCESSFULLY
    );
  } catch (err) {
    return getErrorResponse(FAILED_TO_DELETE_ADDRESS);
  }
};
