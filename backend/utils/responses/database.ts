import { MONGODB_CONNECTION_ERROR } from "@/contants/errorMsgs";

import { getErrorResponse } from ".";

export const failedToConnectToDatabaseResponse = () => {
  return getErrorResponse(MONGODB_CONNECTION_ERROR);
};
