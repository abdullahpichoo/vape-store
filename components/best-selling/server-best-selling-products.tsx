import Link from "next/link";

import { bestSellingProductsApiRoute } from "@/routes/api";
import { ProductType } from "@/types/api/product";

import Button from "../ui/btn";
import Heading from "../ui/heading";

import ProductsSwiper from "./products-swiper";

const getData = async () => {
  const response = await fetch(bestSellingProductsApiRoute, {
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch best selling products");
  }

  if (response.headers.get("content-type") !== "application/json") {
    return [];
  }

  const data = await response.json();
  return data.body.payLoad;
};

const ServerBestSellingProducts = async () => {
  const products = (await getData()) as ProductType[];

  return (
    <section>
      <div className="heading-section flex flex-col gap-0">
        <h3 className="-mb-5 font-hind font-semibold text-gray-600">
          Meet Our Best Products
        </h3>
        <Heading size="xl">Best Selling</Heading>
      </div>
      <div className="grid grid-cols-12 lg:grid-cols-5 gap-3">
        {products && products.length > 0 && (
          <ProductsSwiper products={products} />
        )}
      </div>

      <Link
        href={"/product/shop-by-products"}
        className="view-more my-5 text-center"
      >
        <Button size="md" variant="orange">
          View More
        </Button>
      </Link>
    </section>
  );
};

export default ServerBestSellingProducts;
