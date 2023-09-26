import User from "@/models/user";
import { Response } from "@/types";
import { UserType } from "@/types/api/user";
import { connectToDatabase } from "@/utils/database";
import { dbConnectionErrorResponse } from "@/utils/server/responseHandlers";
import { userNotFoundResponse } from "@/utils/server/user/responses";
import { NextRequest, NextResponse } from "next/server";

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
  // Connecting to the database
  const isConnected = await connectToDatabase();
  if (!isConnected) {
    return dbConnectionErrorResponse;
  }

  console.log("Params", params);
  const { id } = params;

  const user = (await User.findById(id)) as UserType;
  if (!user) {
    return userNotFoundResponse;
  }

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
  const { username, email, password } = await req.json();

  const user = await User.findById(id);
  if (!user) {
    return userNotFoundResponse;
  }

  user.username = username;

  const updatedUser = await user.save();

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
};
