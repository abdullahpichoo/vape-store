"use client";

import ErrorPage from "@/components/error";
import { FAILED_TO_GET_PRODUCTS } from "@/contants/errorMsgs";

const error = () => {
  return <ErrorPage message={FAILED_TO_GET_PRODUCTS} />;
};

export default error;
