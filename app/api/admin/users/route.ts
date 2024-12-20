import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import {
  getAllUsers,
  getPaginatedUsers,
} from "@/backend/controllers/user-controller";
import { getSuccessResponse } from "@/backend/utils/responses";
import { unauthenticatedResponse } from "@/backend/utils/responses/auth";
import { failedToConnectToDatabaseResponse } from "@/backend/utils/responses/database";
import { failedToFetchUsersResponse } from "@/backend/utils/responses/user";
import { USERS_FETCHED_SUCCESSFULLY } from "@/contants/successMsgs";
import { UserType } from "@/types/api/user";
import { connectToDatabase } from "@/utils/database";

export const GET = async (req: NextRequest) => {
  const token = await getToken({ req });
  if (!token || token.role !== "admin") return unauthenticatedResponse();

  const searchParams = req.nextUrl.searchParams;

  const isConnected = await connectToDatabase();
  if (!isConnected) return failedToConnectToDatabaseResponse();

  try {
    const { users, pagination } = await getPaginatedUsers(searchParams);
    return getSuccessResponse<UserType[]>(
      users,
      USERS_FETCHED_SUCCESSFULLY,
      pagination
    );
  } catch (error) {
    return failedToFetchUsersResponse();
  }
};
