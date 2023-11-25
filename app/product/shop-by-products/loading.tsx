"use client";

import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <div className="flex gap-5 mb-5">
        <Skeleton className="w-full h-[20rem]" />
        <Skeleton className="w-full h-[20rem]" />
        <Skeleton className="w-full h-[20rem]" />
        <Skeleton className="w-full h-[20rem]" />
        <Skeleton className="w-full h-[20rem]" />
      </div>
      <div className="flex gap-5 mb-5">
        <Skeleton className="w-full h-[20rem]" />
        <Skeleton className="w-full h-[20rem]" />
        <Skeleton className="w-full h-[20rem]" />
        <Skeleton className="w-full h-[20rem]" />
        <Skeleton className="w-full h-[20rem]" />
      </div>
    </>
  );
};

export default Loading;
