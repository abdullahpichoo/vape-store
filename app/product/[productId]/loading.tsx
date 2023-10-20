"use client";

import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="col-span-1">
        <Skeleton className="w-full h-[50vh]" />
      </div>
      <div className="col-span-1 flex flex-col gap-5">
        <Skeleton className="w-full h-[5rem]" />
        <Skeleton className="w-full h-[5rem]" />
        <Skeleton className="w-full h-[5rem]" />
        <Skeleton className="w-full h-[20rem]" />
      </div>
    </div>
  );
};

export default loading;
