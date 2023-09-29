import { getAddresses } from "@/backend/controllers/address-controller";
import {
  getErrorResponse,
  getSuccessResponse,
} from "@/backend/utils/responses";
import { profileNotFoundResponse } from "@/backend/utils/responses/profile";
import { FAILED_TO_GET_ADDRESSES } from "@/contants/errorMsgs";
import { AddressType } from "@/types/api/address";
import { connectToDatabase } from "@/utils/database";
import { dbConnectionErrorResponse } from "@/utils/server/responseHandlers";

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
  if (!isConnected) return dbConnectionErrorResponse;

  try {
    const userAddresses = await getAddresses(userId);
    return getSuccessResponse<AddressType>(
      userAddresses,
      "Address for user fetched successfully!"
    );
  } catch (err) {
    return getErrorResponse(FAILED_TO_GET_ADDRESSES);
  }
};
