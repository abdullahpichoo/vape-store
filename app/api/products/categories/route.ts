import { NextRequest } from "next/server";

import {
  getFilteredPaginatedProducts,
  getPaginatedProducts,
} from "@/backend/controllers/product-controller";
import { getSuccessResponse } from "@/backend/utils/responses";
import { failedToConnectToDatabaseResponse } from "@/backend/utils/responses/database";
import { failedToFetchProductsResponse } from "@/backend/utils/responses/product";
import { PRODUCTS_FETCHED_SUCCESSFULLY } from "@/contants/successMsgs";
import { ProductType } from "@/types/api/product";
import { connectToDatabase } from "@/utils/database";
import { categoriesEnum } from "@/contants/product/categories";
import { brandsEnum } from "@/contants/product/brands";

const images = [
  {
    public_id: "elitewholesale/zydxy16satqfqk5qdwcy",
    url: "https://res.cloudinary.com/dtiapy88v/image/upload/v1697365709/elitewholesale/zydxy16satqfqk5qdwcy.webp",
    _id: "652bbecf878c6410d48c8399",
  },
  {
    public_id: "elitewholesale/zghtypd9hiyoamaydvbo",
    url: "https://res.cloudinary.com/dtiapy88v/image/upload/v1697365710/elitewholesale/zghtypd9hiyoamaydvbo.webp",
    _id: "652bbecf878c6410d48c839a",
  },
];

const getRandomProperty = (obj) => {
  const keys = Object.keys(obj);
  return obj[keys[Math.floor(Math.random() * keys.length)]];
};

const generateRandomProduct = () => {
  const randomName = `Product-${Math.floor(Math.random() * 1000)}`;
  const randomDescription = `Description-${Math.floor(Math.random() * 1000)}`;
  const randomCategory = getRandomProperty(categoriesEnum);
  const randomBrand = getRandomProperty(brandsEnum);
  const randomPrice = Math.floor(Math.random() * 1000);
  const randomCountInStock = Math.floor(Math.random() * 50);

  return {
    _id: Math.random().toString(36).substring(7),
    name: randomName,
    description: randomDescription,
    price: randomPrice,
    discountPrice: 0,
    images: images,
    category: randomCategory,
    brand: randomBrand,
    countInStock: randomCountInStock,
    rating: 0,
    trending: false,
    numReviews: 0,
    sales: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  };
};

const generateMockProducts = (count) => {
  const products = [];
  for (let i = 0; i < count; i++) {
    products.push(generateRandomProduct());
  }
  return products;
};

export const mockProducts = generateMockProducts(100);

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const isConnected = await connectToDatabase();
  if (!isConnected) return failedToConnectToDatabaseResponse();

  console.log("Search params", searchParams);

  try {
    const { products, pagination } = await getFilteredPaginatedProducts(
      searchParams
    );
    return getSuccessResponse<ProductType[]>(
      products,
      PRODUCTS_FETCHED_SUCCESSFULLY,
      pagination
    );
  } catch (error) {
    return failedToFetchProductsResponse();
  }
};
