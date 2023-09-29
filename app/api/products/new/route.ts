import { NextRequest } from "next/server";

import { createProduct } from "@/backend/controllers/product-controller";
import { getSuccessResponse } from "@/backend/utils/responses";
import { failedToConnectToDatabaseResponse } from "@/backend/utils/responses/database";
import { productCreationFailedResponse } from "@/backend/utils/responses/product";
import { PRODUCT_CREATED_SUCCESSFULLY } from "@/contants/successMsgs";
import { ProductType } from "@/types/api/product";
import { connectToDatabase } from "@/utils/database";

export async function POST(req: NextRequest) {
  const product: ProductType = await req.json();
  if (!product) return productCreationFailedResponse();

  const isConnected = await connectToDatabase();
  if (!isConnected) return failedToConnectToDatabaseResponse();

  try {
    const createdProduct = await createProduct(product);
    return getSuccessResponse<ProductType>(
      createdProduct,
      PRODUCT_CREATED_SUCCESSFULLY
    );
  } catch (error) {
    return productCreationFailedResponse();
  }
}
