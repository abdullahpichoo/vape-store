import User from "@/backend/models/user";
import { Response } from "@/types";
import { UserType } from "@/types/api/user";
import { connectToDatabase } from "@/utils/database";
import { dbConnectionErrorResponse } from "@/utils/server/responseHandlers";
import {
  userNotFoundResponse,
  userUpdateFailedResponse,
} from "@/backend/utils/responses/user";
import { NextRequest, NextResponse } from "next/server";
import {
  getUserById,
  updateUser,
} from "@/backend/controllers/retailer-controller";

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
  if (!id) {
    return userNotFoundResponse;
  }

  // Connecting to the database
  const isConnected = await connectToDatabase();
  if (!isConnected) {
    return dbConnectionErrorResponse;
  }

  try {
    const user = await getUserById(id);
    const response: Response<UserType> = {
      success: true,
      status: 200,
      message: "User found successfully!",
      payLoad: user,
    };
    return NextResponse.json(
      {
        body: response,
      },
      { status: 200 }
    );
  } catch (err) {
    return userNotFoundResponse;
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
  // Connecting to the database
  const isConnected = await connectToDatabase();
  if (!isConnected) {
    return dbConnectionErrorResponse;
  }

  const { id } = params;
  const user = (await req.json()) as UserType;

  if (!user || !id) {
    return userNotFoundResponse;
  }
  try {
    const updatedUser = await updateUser(id, user);
    const response: Response<UserType> = {
      success: true,
      status: 200,
      message: "User updated successfully!",
      payLoad: updatedUser,
    };
    return NextResponse.json(
      {
        body: response,
      },
      { status: 200 }
    );
  } catch (err) {
    return userUpdateFailedResponse;
  }
};
