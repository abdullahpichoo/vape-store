import {
  FAILED_TO_CREATE_ORDER,
  FAILED_TO_FETCH_ORDER,
  FAILED_TO_FETCH_ORDERS,
  FAILED_TO_UPDATE_ORDER,
  ORDER_NOT_FOUND,
} from "@/contants/errorMsgs";

import { getErrorResponse } from ".";

export const failedToFetchOrdersResponse = (err?: string) => {
  return getErrorResponse(FAILED_TO_FETCH_ORDERS + err);
};

export const failedToFetchOrderResponse = (err?: string) => {
  return getErrorResponse(FAILED_TO_FETCH_ORDER + err);
};

export const failedToCreateOrderResponse = (err?: string) => {
  return getErrorResponse(FAILED_TO_CREATE_ORDER + err);
};

export const failedToUpdateOrderResponse = (err?: string) => {
  return getErrorResponse(FAILED_TO_UPDATE_ORDER + err);
};

export const orderNotFoundResponse = (err?: string) => {
  return getErrorResponse(ORDER_NOT_FOUND + err);
};
