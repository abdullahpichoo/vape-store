import { NextResponse } from "next/server";

import { getAllUsers } from "@/backend/controllers/retailer-controller";
import { failedToFetchUsersResponse } from "@/backend/utils/responses/user";
import { connectToDatabase } from "@/utils/database";
import { dbConnectionErrorResponse } from "@/utils/server/responseHandlers";

export const GET = async () => {
  // Connecting to the database
  const isConnected = await connectToDatabase();
  if (!isConnected) {
    return dbConnectionErrorResponse;
  }

  try {
    const users = await getAllUsers();
    const response = {
      message: "Products fetched successfully",
      status: 200,
      success: true,
      payLoad: users,
    };

    return NextResponse.json(
      {
        body: response,
      },
      { status: 200 }
    );
  } catch (error) {
    return failedToFetchUsersResponse;
  }
};
