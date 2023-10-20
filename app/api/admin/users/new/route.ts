import { NextRequest } from "next/server";

import { serverSession } from "@/app/api/auth/[...nextauth]/route";
import { createUser } from "@/backend/controllers/user-controller";
import User from "@/backend/models/user";
import { getSuccessResponse } from "@/backend/utils/responses";
import { unauthenticatedResponse } from "@/backend/utils/responses/auth";
import { failedToConnectToDatabaseResponse } from "@/backend/utils/responses/database";
import {
  userAlreadyExistsResponse,
  userCreationFailedResponse,
} from "@/backend/utils/responses/user";
import { USER_CREATED_SUCCESSFULLY } from "@/contants/successMsgs";
import { UserType } from "@/types/api/user";
import { connectToDatabase } from "@/utils/database";

export async function POST(req: NextRequest) {
  const session = await serverSession();
  if (!session) return unauthenticatedResponse();

  const user: UserType = await req.json();
  if (!user) return userCreationFailedResponse();

  const isConnected = await connectToDatabase();
  if (!isConnected) return failedToConnectToDatabaseResponse();

  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) return userAlreadyExistsResponse();

  try {
    const newUser = await createUser(user);
    return getSuccessResponse<UserType>(newUser, USER_CREATED_SUCCESSFULLY);
  } catch (error) {
    return userCreationFailedResponse();
  }
}
