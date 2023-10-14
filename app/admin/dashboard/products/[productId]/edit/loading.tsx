"use client";

import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="flex flex-col gap-10">
      <Skeleton className="w-full h-[4rem]" />
      <Skeleton className="w-full h-[4rem]" />
      <Skeleton className="w-full h-[4rem]" />
      <Skeleton className="w-full h-[4rem]" />
      <Skeleton className="w-full h-[4rem]" />
      <Skeleton className="w-full h-[4rem]" />
    </div>
  );
};

export default loading;
