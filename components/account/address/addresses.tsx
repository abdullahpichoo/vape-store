"use client";

import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ErrorPage from "@/components/error";
import { Skeleton } from "@/components/ui/skeleton";
import { FAILED_TO_GET_ADDRESSES } from "@/contants/errorMsgs";
import { useFetchAddresses } from "@/helpers/queries/account/address/fetch";

interface AddressesProps {
  userId: string;
}

const Addresses = (props: AddressesProps) => {
  const { userId } = props;

  const { data: addressesData, isLoading, error } = useFetchAddresses(userId);

  if (isLoading)
    return (
      <>
        <div className="flex flex-col gap-5">
          <Skeleton className="w-full h-[10rem]" />
          <Skeleton className="w-full h-[10rem]" />
          <Skeleton className="w-full h-[10rem]" />
        </div>
      </>
    );

  if (error)
    return (
      <>
        <ErrorPage message={FAILED_TO_GET_ADDRESSES} />
      </>
    );

  return (
    <section className="mt-5">
      {addressesData && addressesData.length > 0 ? (
        <>
          {addressesData.map((address) => (
            <div
              key={address._id}
              className="flex items-center gap-8 px-10 py-5 border-b-2 border-gray-200"
            >
              <div className="location text-[3rem] bg-orange-3 px-7 py-2 w-fit rounded-full">
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              <div className="flex flex-col">
                <div>
                  <h6>{address.street}</h6>
                  <p className="font-semibold text-gray-500">
                    {address.city}, {address.state}, {address.zipCode},{" "}
                    {address.country}
                  </p>
                </div>
                <div>
                  <h6>
                    Phone Number:{" "}
                    <span className=" text-gray-500">{address.phoneNo}</span>
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="flex flex-col gap-5 items-center justify-center h-full">
          <h3 className="text-center">No addresses found!</h3>
        </div>
      )}
    </section>
  );
};

export default Addresses;
