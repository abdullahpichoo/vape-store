import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { ProductType } from "@/types/api/product";

import Img from "../image";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;
  return (
    <Link href={`/product/${product._id}`}>
      <div className="w-full h-full border-2 border-gray-200 px-5 py-3 group rounded-2xl hover:border-orange-1 duration-200 ease-in-out cursor-pointer">
        <div className="product-image mb-2 group-hover:scale-105 duration-200 ease-in-out">
          <Img
            src={product.images ? (product.images[0].url as string) : ""}
            alt={product.name}
            className="w-[12rem] max-w-full  h-[12rem] md:w-[20rem] md:h-[20rem] object-contain flex justify-center items-center"
          />
        </div>
        <div className="product-details flex flex-col gap-2">
          <h5 className="product-name font-hind font-semibold line-clamp-2 text-neutral-700 h-[3.5rem] md:h-[4.5rem] lg:h-[6.5rem]">
            {product.name}
          </h5>
          <div className="flex gap-3">
            {product.discountPrice ? (
              <h3 className="product-price text-gray-400 font-semibold line-through">
                ${product.price}
              </h3>
            ) : null}
            <h3 className="product-price font-extrabold text-pink">
              ${product.price}
            </h3>
          </div>
          <div className="rating text-[1.2rem] flex gap-2 items-center">
            {Array.from({ length: 5 }).map((_, index) => {
              let isOrange = false;
              if (product.rating && product.rating >= index + 1) {
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
            <div className="rating-count text-[1.2rem] text-gray-400">
              ({product.numReviews})
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
