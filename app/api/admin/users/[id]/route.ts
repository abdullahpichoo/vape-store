import { NextRequest } from "next/server";

import { getUserById, updateUser } from "@/backend/controllers/user-controller";
import { getSuccessResponse } from "@/backend/utils/responses";
import { failedToConnectToDatabaseResponse } from "@/backend/utils/responses/database";
import {
  userNotFoundResponse,
  userUpdateFailedResponse,
} from "@/backend/utils/responses/user";
import {
  USER_FETCHED_SUCCESSFULLY,
  USER_UPDATED_SUCCESSFULLY,
} from "@/contants/successMsgs";
import { UserType } from "@/types/api/user";
import { connectToDatabase } from "@/utils/database";

// GET api/admin/retailers/:id
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
  if (!id) return userNotFoundResponse();

  const isConnected = await connectToDatabase();
  if (!isConnected) return failedToConnectToDatabaseResponse();

  try {
    const user = await getUserById(id);
    return getSuccessResponse<UserType>(user, USER_FETCHED_SUCCESSFULLY);
  } catch (err) {
    return userNotFoundResponse();
  }
};

// PUT api/admin/retailers/:id
export const PUT = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  const { id } = params;
  const user = (await req.json()) as UserType;

  if (!user || !id) return userNotFoundResponse();

  const isConnected = await connectToDatabase();
  if (!isConnected) return failedToConnectToDatabaseResponse();

  try {
    const updatedUser = await updateUser(id, user);
    return getSuccessResponse<UserType>(updatedUser, USER_UPDATED_SUCCESSFULLY);
  } catch (err) {
    return userUpdateFailedResponse();
  }
};
