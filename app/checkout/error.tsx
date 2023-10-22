"use client";

import ErrorPage from "@/components/error";

const error = () => {
  return (
    <ErrorPage message="Failed To Load Checkout. Please Try Again Later!" />
  );
};

export default error;
