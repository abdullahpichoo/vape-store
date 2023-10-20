import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AddToCart from "@/components/product/add-to-card";
import ProductImageGallery from "@/components/product/product-image-gallery";
import { Separator } from "@/components/ui/separator";
import { getProduct } from "@/helpers/network/products";
import { baseUrl } from "@/routes/api";
import { ProductType } from "@/types/api/product";

async function getData(productId: string): Promise<ProductType> {
  try {
    return await getProduct(productId);
  } catch {
    throw new Error();
  }
}

const Product = async ({ params }: { params: { productId: string } }) => {
  if (!baseUrl) return;

  const productData = await getData(params.productId);

  console.log("Product", productData);
  return (
    <section className="grid grid-cols-12">
      <div className="images-area col-span-12 md:col-span-6">
        <ProductImageGallery product={productData} />
      </div>
      <div className="col-span-12 md:col-span-6 flex flex-col gap-5">
        <div className="main-details">
          <h2>{productData.name}</h2>
          <h6 className="text-gray-500">By {productData.brand}</h6>
          <div className="flex justify-between items-center">
            <h2 className="text-pink">${productData.price}</h2>
            {productData.countInStock > 0 ? (
              <h6 className="text-green-600">
                In Stock: {productData.countInStock}
              </h6>
            ) : (
              <h6 className="text-red-500">Out of Stock</h6>
            )}
          </div>
        </div>
        <Separator />
        <div className="rating text-[1.4rem] md:text-[1.8rem] flex gap-2 items-center">
          {Array.from({ length: 5 }).map((_, index) => {
            let isOrange = false;
            if (productData.rating && productData.rating >= index + 1) {
              isOrange = true;
            }
            return (
              <div
                key={index}
                className={`star ${
                  isOrange ? "text-orange-1" : "text-gray-300"
                }`}
              >
                <FontAwesomeIcon icon={faStar} />
              </div>
            );
          })}
          <div className="rating-count text-gray-400">
            {productData.numReviews} Reviews
          </div>
        </div>

        <AddToCart product={productData} />
      </div>
    </section>
  );
};

export default Product;
