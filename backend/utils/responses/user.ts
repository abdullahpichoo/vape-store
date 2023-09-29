import {
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
  FAILED_TO_UPDATE_USER,
  FAILED_TO_CREATE_USER,
  FAILED_TO_FETCH_USERS,
} from "@/contants/errorMsgs";

import { getErrorResponse } from ".";

export const userAlreadyExistsResponse = () => {
  return getErrorResponse(USER_ALREADY_EXISTS);
};

export const userCreationFailedResponse = () => {
  return getErrorResponse(FAILED_TO_CREATE_USER);
};

export const userUpdateFailedResponse = () => {
  return getErrorResponse(FAILED_TO_UPDATE_USER);
};

export const userNotFoundResponse = () => {
  return getErrorResponse(USER_NOT_FOUND);
};

export const failedToFetchUsersResponse = () => {
  return getErrorResponse(FAILED_TO_FETCH_USERS);
};
