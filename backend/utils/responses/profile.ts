import { NextResponse } from "next/server";

import { PROFILE_NOT_FOUND } from "@/contants/errorMsgs";

import { responseGenerator } from ".";

export const profileNotFoundResponse = NextResponse.json(
  responseGenerator(PROFILE_NOT_FOUND),
  { status: 400 }
);
