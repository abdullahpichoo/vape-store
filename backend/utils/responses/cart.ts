import {
  CART_NOT_FOUND,
  FAILED_TO_ADD_ITEM_TO_CART,
  FAILED_TO_CREATE_CART,
  FAILED_TO_FETCH_CART,
  FAILED_TO_REMOVE_ITEM_FROM_CART,
} from "@/contants/errorMsgs";

import { getErrorResponse } from ".";

export const cartNotFoundResponse = () => {
  return getErrorResponse(CART_NOT_FOUND);
};

export const cartFetchFailedResponse = () => {
  return getErrorResponse(FAILED_TO_FETCH_CART);
};

export const cartCreationFailedResponse = () => {
  return getErrorResponse(FAILED_TO_CREATE_CART);
};

export const cartItemCreationFailedResponse = () => {
  return getErrorResponse(FAILED_TO_ADD_ITEM_TO_CART);
};

export const cartItemDeleteFailedResponse = () => {
  return getErrorResponse(FAILED_TO_REMOVE_ITEM_FROM_CART);
};
