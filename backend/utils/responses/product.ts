import { NextResponse } from "next/server";

import {
  FAILED_TO_CREATE_PRODUCT,
  FAILED_TO_DELETE_PRODUCT,
  FAILED_TO_GET_PRODUCTS,
  FAILED_TO_UPDATE_PRODUCT,
  PRODUCT_NOT_FOUND,
} from "@/contants/errorMsgs";

import { responseGenerator } from ".";

export const productCreationFailedResponse = NextResponse.json(
  responseGenerator(FAILED_TO_CREATE_PRODUCT),
  { status: 400 }
);

export const productUpdateFailedResponse = NextResponse.json(
  responseGenerator(FAILED_TO_UPDATE_PRODUCT),
  { status: 400 }
);

export const productDeletionFailedResponse = NextResponse.json(
  responseGenerator(FAILED_TO_DELETE_PRODUCT),
  { status: 400 }
);

export const productNotFoundResponse = NextResponse.json(
  responseGenerator(PRODUCT_NOT_FOUND),
  { status: 400 }
);

export const failedToFetchProductsResponse = NextResponse.json(
  responseGenerator(FAILED_TO_GET_PRODUCTS),
  { status: 400 }
);
