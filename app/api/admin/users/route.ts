import { getAllUsers } from "@/backend/controllers/user-controller";
import { getSuccessResponse } from "@/backend/utils/responses";
import { failedToConnectToDatabaseResponse } from "@/backend/utils/responses/database";
import { failedToFetchUsersResponse } from "@/backend/utils/responses/user";
import { USERS_FETCHED_SUCCESSFULLY } from "@/contants/successMsgs";
import { UserType } from "@/types/api/user";
import { connectToDatabase } from "@/utils/database";

export const GET = async () => {
  const isConnected = await connectToDatabase();
  if (!isConnected) return failedToConnectToDatabaseResponse();

  try {
    const users = await getAllUsers();
    return getSuccessResponse<UserType[]>(users, USERS_FETCHED_SUCCESSFULLY);
  } catch (error) {
    return failedToFetchUsersResponse();
  }
};