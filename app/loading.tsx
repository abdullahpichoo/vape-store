"use client";

import Spinner from "@/components/ui/spinner";

const loading = () => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-screen bg-orange-3 bg-opacity-25 flex justify-center items-center z-50">
        <Spinner size="xl" color="black" />
      </div>
    </>
  );
};

export default loading;
