import { NextResponse } from "next/server";
import type { NextResponse as TNextResponse } from "next/server";

import { Response } from "@/types";

export const responseGenerator = (message: string) => {
  return {
    body: {
      success: false,
      status: 400,
      message: message,
    },
  };
};

export function getSuccessResponse<T>(
  payLoad: T | T[],
  message: string,
  status?: number
): TNextResponse<{
  body: Response<T>;
}> {
  const response: Response<T> = {
    success: true,
    status: status ? status : 200,
    message: message,
    payLoad: payLoad,
  };
  const res = NextResponse.json(
    {
      body: response,
    },
    { status: status ? status : 200 }
  );
  return res;
}

export function getErrorResponse(
  errorMsg: string,
  status = 400
): TNextResponse<{
  body: Response<null>;
}> {
  const response: Response<null> = {
    success: false,
    status: status,
    message: errorMsg,
  };
  const res = NextResponse.json(
    {
      body: response,
    },
    { status: status }
  );
  return res;
}
