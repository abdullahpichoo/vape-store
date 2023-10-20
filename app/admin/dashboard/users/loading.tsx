"use client";

import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="w-full h-[5rem]" />
      <Skeleton className="w-full h-[30rem]" />
    </div>
  );
};

export default loading;
