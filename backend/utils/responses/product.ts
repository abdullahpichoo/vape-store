import {
  FAILED_TO_CREATE_PRODUCT,
  FAILED_TO_DELETE_PRODUCT,
  FAILED_TO_GET_PRODUCTS,
  FAILED_TO_UPDATE_PRODUCT,
  PRODUCT_NOT_FOUND,
} from "@/contants/errorMsgs";

import { getErrorResponse } from ".";

export const productCreationFailedResponse = () => {
  return getErrorResponse(FAILED_TO_CREATE_PRODUCT);
};

export const productUpdateFailedResponse = () => {
  return getErrorResponse(FAILED_TO_UPDATE_PRODUCT);
};

export const productDeletionFailedResponse = () => {
  return getErrorResponse(FAILED_TO_DELETE_PRODUCT);
};

export const productNotFoundResponse = () => {
  return getErrorResponse(PRODUCT_NOT_FOUND);
};

export const failedToFetchProductsResponse = () => {
  return getErrorResponse(FAILED_TO_GET_PRODUCTS);
};
