import { MONGODB_CONNECTION_ERROR } from "@/contants/errorMsgs";
import { NextResponse } from "next/server";

export const dbConnectionErrorResponse = NextResponse.json(
  {
    body: {
      success: false,
      status: 500,
      message: MONGODB_CONNECTION_ERROR,
    },
  },
  { status: 500 }
);
