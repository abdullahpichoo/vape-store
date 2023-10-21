"use client";

import { useInView } from "react-intersection-observer";

import { FAILED_TO_GET_PRODUCTS } from "@/contants/errorMsgs";
import { useBestSellingProducts } from "@/helpers/queries/landing-page/fetch";

import ErrorPage from "../error";
import Button from "../ui/btn";
import Heading from "../ui/heading";
import { Skeleton } from "../ui/skeleton";

import ProductsSwiper from "./products-swiper";

const BestSelling = () => {
  const { ref, inView } = useInView();

  const {
    data: productsData,
    isLoading,
    isError,
  } = useBestSellingProducts(true);

  return (
    <section ref={ref}>
      <div className="heading-section flex flex-col gap-0">
        <h3 className="-mb-5 font-hind font-semibold text-gray-600">
          Meet Our Best Products
        </h3>
        <Heading size="xl">Best Selling</Heading>
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
            <ProductsSwiper products={productsData} />
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

export default BestSelling;
