import { getAddresses } from "@/backend/controllers/address-controller";
import {
  getErrorResponse,
  getSuccessResponse,
} from "@/backend/utils/responses";
import { failedToConnectToDatabaseResponse } from "@/backend/utils/responses/database";
import { profileNotFoundResponse } from "@/backend/utils/responses/profile";
import { FAILED_TO_GET_ADDRESSES } from "@/contants/errorMsgs";
import { ADDRESSES_FETCHED_SUCCESSFULLY } from "@/contants/successMsgs";
import { AddressType } from "@/types/api/address";
import { connectToDatabase } from "@/utils/database";

export const GET = async (
  _: any,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  const { id: userId } = params;
  if (!userId) return profileNotFoundResponse;

  const isConnected = await connectToDatabase();
  if (!isConnected) return failedToConnectToDatabaseResponse();

  try {
    const userAddresses = await getAddresses(userId);
    return getSuccessResponse<AddressType>(
      userAddresses,
      ADDRESSES_FETCHED_SUCCESSFULLY
    );
  } catch (err) {
    return getErrorResponse(FAILED_TO_GET_ADDRESSES);
  }
};
