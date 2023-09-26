import { USER_ALREADY_EXISTS, USER_NOT_FOUND } from "@/contants/errorMsgs";
import { NextResponse } from "next/server";

export const userAlreadyExistsResponse = NextResponse.json(
  {
    body: {
      success: false,
      status: 400,
      message: USER_ALREADY_EXISTS,
    },
  },
  { status: 400 }
);

export const userNotFoundResponse = NextResponse.json(
  {
    body: {
      success: false,
      status: 400,
      message: USER_NOT_FOUND,
    },
  },
  { status: 400 }
);
