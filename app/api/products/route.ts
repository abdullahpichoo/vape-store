import { NextRequest } from "next/server";

import {
  getAllProducts,
  getPaginatedProducts,
} from "@/backend/controllers/product-controller";
import { getSuccessResponse } from "@/backend/utils/responses";
import { failedToConnectToDatabaseResponse } from "@/backend/utils/responses/database";
import { failedToFetchProductsResponse } from "@/backend/utils/responses/product";
import { PRODUCTS_FETCHED_SUCCESSFULLY } from "@/contants/successMsgs";
import { ProductType } from "@/types/api/product";
import { connectToDatabase } from "@/utils/database";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  console.log("product search params", searchParams);

  const isConnected = await connectToDatabase();
  if (!isConnected) return failedToConnectToDatabaseResponse();

  let params = {
    pageNumber: searchParams ? searchParams.get("pageNumber") ?? "1" : "1",
    pageSize: searchParams ? searchParams.get("pageSize") ?? "10" : "10",
    sortBy: searchParams
      ? searchParams.get("sortBy") ?? "createdAt"
      : "createdAt",
    orderBy: searchParams ? searchParams.get("orderBy") ?? "desc" : "desc",
    searchBy: searchParams ? searchParams.get("searchBy") ?? "" : "",
  };
  try {
    const { products, pagination } = await getPaginatedProducts(params);
    return getSuccessResponse<ProductType[]>(
      products,
      PRODUCTS_FETCHED_SUCCESSFULLY,
      pagination
    );
  } catch (error) {
    return failedToFetchProductsResponse();
  }
};
