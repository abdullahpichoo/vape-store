import { FAILED_TO_GET_PRODUCTS } from "@/contants/errorMsgs";
import { getProducts } from "@/helpers/network/products";
import { baseUrl } from "@/routes/api";
import { ProductCardType, ProductType } from "@/types/api/product";

import Button from "../ui/btn";
import Heading from "../ui/heading";
import ProductCard from "../ui/product-card";

async function getData(): Promise<ProductCardType[]> {
  try {
    const payloadProducts = await getProducts();
    const products = payloadProducts.map((product: ProductType) => {
      return {
        ...product,
        images: product.images?.map((image) => image.url),
      };
    });
    return products;
  } catch {
    throw new Error(FAILED_TO_GET_PRODUCTS);
  }
}
const FeaturedProducts = async () => {
  if (!baseUrl) {
    return null;
  }

  const productsData = await getData();

  return (
    <section>
      <div className="heading-section flex flex-col gap-0">
        <h3 className="-mb-5 font-hind font-semibold text-gray-600">
          {"Don't Miss Our Featured Items"}
        </h3>
        <Heading size="xl">Featured Products</Heading>
      </div>
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
      <div className="view-more my-5 text-center">
        <Button size="md" variant="orange">
          View More
        </Button>
      </div>
    </section>
  );
};

export default FeaturedProducts;
