"use client";

import ErrorPage from "@/components/error";
import { PRODUCT_NOT_FOUND } from "@/contants/errorMsgs";

const error = () => {
  return <ErrorPage message={PRODUCT_NOT_FOUND} />;
};

export default error;
