import { UNAUTHENTICATED } from "@/contants/errorMsgs";

import { getErrorResponse } from ".";

export const unauthenticatedResponse = () => {
  return getErrorResponse(UNAUTHENTICATED);
};
