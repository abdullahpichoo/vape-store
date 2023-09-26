import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import User from "@/models/user";
import { Response } from "@/types";
import { UserType } from "@/types/api/user";
import { connectToDatabase } from "@/utils/database";
import { dbConnectionErrorResponse } from "@/utils/server/responseHandlers";
import { userAlreadyExistsResponse } from "@/utils/server/user/responses";

export async function POST(req: NextRequest) {
  // Connecting to the database
  const isConnected = await connectToDatabase();
  if (!isConnected) {
    return dbConnectionErrorResponse;
  }

  const { username, email, password } = await req.json();

  const existingUser = await User.findOne({ username: username });
  if (existingUser) {
    return userAlreadyExistsResponse;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await User.create({
    username: username,
    email: email,
    password: hashedPassword,
  });

  console.log("New User", newUser);
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
}
