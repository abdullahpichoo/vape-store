"use client";

import { useInView } from "react-intersection-observer";

import { FAILED_TO_GET_PRODUCTS } from "@/contants/errorMsgs";
import { useFeaturedProducts } from "@/helpers/queries/landing-page/fetch";

import ErrorPage from "../error";
import Button from "../ui/btn";
import Heading from "../ui/heading";
import ProductCard from "../ui/product-card";
import { Skeleton } from "../ui/skeleton";

const FeaturedProducts = () => {
  const { ref, inView } = useInView();

  const {
    data: productsData,
    isLoading,
    isError,
  } = useFeaturedProducts(inView);

  return (
    <section ref={ref}>
      <div className="heading-section flex flex-col gap-0">
        <h3 className="-mb-5 font-hind font-semibold text-gray-600">
          {"Don't Miss Our Featured Items"}
        </h3>
        <Heading size="xl">Featured Products</Heading>
      </div>
      {isLoading ? (
        <>
          <div className="flex gap-5">
            <Skeleton className="w-full h-[20rem]" />
            <Skeleton className="w-full h-[20rem]" />
            <Skeleton className="w-full h-[20rem]" />
            <Skeleton className="w-full h-[20rem]" />
          </div>
        </>
      ) : (
        <>
          {isError ? (
            <ErrorPage message={FAILED_TO_GET_PRODUCTS} />
          ) : (
            <div className="grid grid-cols-12 lg:grid-cols-5 gap-3">
              {productsData &&
                productsData.length > 0 &&
                productsData.map((product) => (
                  <div
                    key={product._id}
                    className="col-span-6 sm:col-span-4 lg:col-span-1"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>
          )}
        </>
      )}

      <div className="view-more my-5 text-center">
        <Button size="md" variant="orange">
          View More
        </Button>
      </div>
    </section>
  );
};

export default FeaturedProducts;
