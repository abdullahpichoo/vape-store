import { getUserById } from "@/backend/controllers/user-controller";
import {
  getErrorResponse,
  getSuccessResponse,
} from "@/backend/utils/responses";
import { failedToConnectToDatabaseResponse } from "@/backend/utils/responses/database";
import { profileNotFoundResponse } from "@/backend/utils/responses/profile";
import { PROFILE_NOT_FOUND } from "@/contants/errorMsgs";
import { PROFILE_FETCHED_SUCCESSFULLY } from "@/contants/successMsgs";
import { UserType } from "@/types/api/user";
import { connectToDatabase } from "@/utils/database";

// GET: /api/profile/[id]
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
  const { id } = params;
  if (!id) return profileNotFoundResponse();

  const isConnected = await connectToDatabase();
  if (!isConnected) return failedToConnectToDatabaseResponse();

  try {
    const user = await getUserById(id);
    const response = getSuccessResponse<UserType>(
      user,
      PROFILE_FETCHED_SUCCESSFULLY
    );
    return response;
  } catch (err) {
    return getErrorResponse(PROFILE_NOT_FOUND);
  }
};
