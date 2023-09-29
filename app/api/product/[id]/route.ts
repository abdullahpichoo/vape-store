import { NextRequest, NextResponse } from "next/server";

import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "@/backend/controllers/product-controller";
import {
  productDeletionFailedResponse,
  productNotFoundResponse,
} from "@/backend/utils/responses/product";
import { connectToDatabase } from "@/utils/database";
import { dbConnectionErrorResponse } from "@/utils/server/responseHandlers";

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

  if (!id) {
    return productNotFoundResponse;
  }

  // Connecting to the database
  const isConnected = await connectToDatabase();
  if (!isConnected) {
    return dbConnectionErrorResponse;
  }

  try {
    const product = await getProductById(id);
    const response = {
      message: "Product fetched successfully",
      status: 200,
      success: true,
      payLoad: product,
    };

    return NextResponse.json(
      {
        body: response,
      },
      { status: 200 }
    );
  } catch (error) {
    return productNotFoundResponse;
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
  const product = await req.json();

  if (!id || !product) {
    return productNotFoundResponse;
  }

  // Connecting to the database
  const isConnected = await connectToDatabase();
  if (!isConnected) {
    return dbConnectionErrorResponse;
  }

  try {
    const updatedProduct = await updateProduct(id, product);
    const response = {
      message: "Product updated successfully",
      status: 200,
      success: true,
      payLoad: updatedProduct,
    };

    return NextResponse.json(
      {
        body: response,
      },
      { status: 200 }
    );
  } catch (error) {
    return productNotFoundResponse;
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

  if (!id) {
    return productDeletionFailedResponse;
  }

  // Connecting to the database
  const isConnected = await connectToDatabase();
  if (!isConnected) {
    return dbConnectionErrorResponse;
  }

  try {
    await deleteProduct(id);
    const response = {
      message: "Product deleted successfully",
      status: 200,
      success: true,
    };

    return NextResponse.json(
      {
        body: response,
      },
      { status: 200 }
    );
  } catch (error) {
    return productDeletionFailedResponse;
  }
};
