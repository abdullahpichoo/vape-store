import { NextRequest, NextResponse } from "next/server";

import User from "@/backend/models/user";
import { Response } from "@/types";
import { UserType } from "@/types/api/user";
import { connectToDatabase } from "@/utils/database";
import { dbConnectionErrorResponse } from "@/utils/server/responseHandlers";
import {
  userAlreadyExistsResponse,
  userCreationFailedResponse,
} from "@/backend/utils/responses/user";
import { createUser } from "@/backend/controllers/retailer-controller";

export async function POST(req: NextRequest) {
  // Connecting to the database
  const isConnected = await connectToDatabase();
  if (!isConnected) {
    return dbConnectionErrorResponse;
  }

  const user: UserType = await req.json();
  if (!user) {
    return userCreationFailedResponse;
  }

  const existingUser = await User.findOne({ username: user.username });
  if (existingUser) {
    return userAlreadyExistsResponse;
  }
  try {
    const newUser = await createUser(user);
    const response: Response<UserType> = {
      success: true,
      status: 201,
      message: "User created successfully!",
      payLoad: newUser,
    };
    return NextResponse.json(
      {
        body: response,
      },
      { status: 201 }
    );
  } catch (error) {
    return userCreationFailedResponse;
  }
}
