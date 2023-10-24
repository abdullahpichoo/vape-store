"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="flex flex-col gap-5">
      <Skeleton className="w-full h-[5rem]" />
      <Skeleton className="w-full h-[25rem]" />
    </div>
  );
};

export default loading;
