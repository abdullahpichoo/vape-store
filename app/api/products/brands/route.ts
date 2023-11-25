import { NextRequest } from "next/server";

import { getProductsByBrand } from "@/backend/controllers/product-controller";
import { getSuccessResponse } from "@/backend/utils/responses";
import { failedToConnectToDatabaseResponse } from "@/backend/utils/responses/database";
import { failedToFetchProductsResponse } from "@/backend/utils/responses/product";
import { PRODUCTS_FETCHED_SUCCESSFULLY } from "@/contants/successMsgs";
import { ProductType } from "@/types/api/product";
import { connectToDatabase } from "@/utils/database";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const isConnected = await connectToDatabase();
  if (!isConnected) return failedToConnectToDatabaseResponse();

  try {
    const { products, pagination } = await getProductsByBrand(searchParams);
    return getSuccessResponse<ProductType[]>(
      products,
      PRODUCTS_FETCHED_SUCCESSFULLY,
      pagination
    );
  } catch (error) {
    return failedToFetchProductsResponse();
  }
};
