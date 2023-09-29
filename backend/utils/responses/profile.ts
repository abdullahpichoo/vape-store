import { PROFILE_NOT_FOUND } from "@/contants/errorMsgs";

import { getErrorResponse } from ".";

export const profileNotFoundResponse = () => {
  return getErrorResponse(PROFILE_NOT_FOUND);
};
