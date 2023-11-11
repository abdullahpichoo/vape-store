"use client";

import { useEffect, useState } from "react";

import Button from "../ui/btn";
import Img from "../ui/image";

const AgeVerify = () => {
  const [ageVerifyModal, setAgeVerifyModal] = useState(false);

  useEffect(() => {
    const ageVerify = localStorage.getItem("ageVerify");
    if (!ageVerify) {
      setAgeVerifyModal(true);
    }
  }, []);

  return (
    <>
      {ageVerifyModal && (
        <div className="fixed z-[1000] top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-black p-10 w-[60vw] lg:w-[40vw] rounded-lg">
            <div className="flex-center my-5">
              <Img
                src="/assets/logo.svg"
                alt="elite wholesale logo"
                className="w-72 lg:w-96"
              />
            </div>
            <h4 className="my-10 text-center text-gray-400">
              YOU MUST BE 21 YEARS OF AGE OR OLDER TO ENTER
            </h4>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Button
                variant="orange"
                size="sm"
                onClick={() => {
                  localStorage.setItem("ageVerify", "true");
                  setAgeVerifyModal(false);
                }}
                className="w-full sm:w-auto"
              >
                {"Yes, I'm 21+"}
              </Button>
              <Button
                variant="orange"
                size="sm"
                onClick={() => {
                  window.location.href = "https://www.google.com";
                }}
                className="w-full sm:w-auto"
              >
                No
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AgeVerify;
