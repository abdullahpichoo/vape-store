import { NextRequest } from "next/server";

import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "@/backend/controllers/product-controller";
import { getSuccessResponse } from "@/backend/utils/responses";
import { failedToConnectToDatabaseResponse } from "@/backend/utils/responses/database";
import {
  productDeletionFailedResponse,
  productNotFoundResponse,
  productUpdateFailedResponse,
} from "@/backend/utils/responses/product";
import {
  PRODUCT_CREATED_SUCCESSFULLY,
  PRODUCT_DELETED_SUCCESSFULLY,
  PRODUCT_UPDATED_SUCCESSFULLY,
} from "@/contants/successMsgs";
import { ProductType } from "@/types/api/product";
import { connectToDatabase } from "@/utils/database";

// GET /api/product/:id
export const GET = async (
  _: any,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  const { id } = params;
  if (!id) return productNotFoundResponse();

  const isConnected = await connectToDatabase();
  if (!isConnected) return failedToConnectToDatabaseResponse();

  try {
    const product = await getProductById(id);
    return getSuccessResponse<ProductType>(
      product,
      PRODUCT_CREATED_SUCCESSFULLY
    );
  } catch (error) {
    return productNotFoundResponse();
  }
};

// EDIT /api/product/:id/edit
export const PUT = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  const { id } = params;
  const product = (await req.json()) as ProductType;

  if (!id || !product) return productUpdateFailedResponse();

  const isConnected = await connectToDatabase();
  if (!isConnected) return failedToConnectToDatabaseResponse();

  try {
    const updatedProduct = await updateProduct(id, product);
    return getSuccessResponse<ProductType>(
      updatedProduct,
      PRODUCT_UPDATED_SUCCESSFULLY
    );
  } catch (error) {
    return productUpdateFailedResponse();
  }
};

// DELETE /api/product/:id
export const DELETE = async (
  _: any,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  const { id } = params;
  if (!id) return productDeletionFailedResponse();

  const isConnected = await connectToDatabase();
  if (!isConnected) return failedToConnectToDatabaseResponse();

  try {
    const deletedProduct = await deleteProduct(id);
    return getSuccessResponse<ProductType>(
      deletedProduct,
      PRODUCT_DELETED_SUCCESSFULLY
    );
  } catch (error) {
    return productDeletionFailedResponse();
  }
};
