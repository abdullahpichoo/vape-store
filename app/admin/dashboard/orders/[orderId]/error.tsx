"use client";

import ErrorPage from "@/components/error";
import { FAILED_TO_FETCH_ORDER } from "@/contants/errorMsgs";

const error = () => {
  return <ErrorPage message={FAILED_TO_FETCH_ORDER} />;
};

export default error;
