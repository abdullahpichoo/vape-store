"use client";

import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-6 flex flex-col gap-5">
          <Skeleton className="w-full h-[15rem]" />
          <Skeleton className="w-full h-[15rem]" />
          <Skeleton className="w-full h-[15rem]" />
        </div>
        <div className="col-span-6">
          <Skeleton className="w-full h-[25rem]" />
        </div>
      </div>
    </>
  );
};

export default loading;
