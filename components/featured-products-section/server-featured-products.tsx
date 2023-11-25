import { featuredProductsApiRoute } from "@/routes/api";
import { ProductType } from "@/types/api/product";

import Button from "../ui/btn";
import Heading from "../ui/heading";
import ProductCard from "../ui/product-card";

const getData = async () => {
  const response = await fetch(featuredProductsApiRoute, {
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch featured products");
  }

  if (response.headers.get("content-type") !== "application/json") {
    return [];
  }

  const data = await response.json();
  return data.body.payLoad;
};

const ServerFeaturedProducts = async () => {
  const products = (await getData()) as ProductType[];

  return (
    <section>
      <div className="heading-section flex flex-col gap-0">
        <h3 className="-mb-5 font-hind font-semibold text-gray-600">
          {"Don't Miss Our Featured Items"}
        </h3>
        <Heading size="xl">Featured Products</Heading>
      </div>
      <div className="grid grid-cols-12 lg:grid-cols-5 gap-3">
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <div
              key={product._id}
              className="col-span-6 sm:col-span-4 lg:col-span-1"
            >
              <ProductCard product={product} />
            </div>
          ))}
      </div>

      <div className="view-more my-5 text-center">
        <Button size="md" variant="orange">
          View More
        </Button>
      </div>
    </section>
  );
};

export default ServerFeaturedProducts;
