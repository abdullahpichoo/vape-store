import { responseGenerator } from ".";
import { NextResponse } from "next/server";
import {
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
  FAILED_TO_UPDATE_USER,
  FAILED_TO_CREATE_USER,
  FAILED_TO_FETCH_USERS,
} from "@/contants/errorMsgs";

export const userAlreadyExistsResponse = NextResponse.json(
  responseGenerator(USER_ALREADY_EXISTS),
  { status: 400 }
);

export const userCreationFailedResponse = NextResponse.json(
  responseGenerator(FAILED_TO_CREATE_USER),
  { status: 400 }
);

export const userUpdateFailedResponse = NextResponse.json(
  responseGenerator(FAILED_TO_UPDATE_USER),
  { status: 400 }
);

export const userNotFoundResponse = NextResponse.json(
  responseGenerator(USER_NOT_FOUND),
  { status: 400 }
);

export const failedToFetchUsersResponse = NextResponse.json(
  responseGenerator(FAILED_TO_FETCH_USERS),
  { status: 400 }
);
