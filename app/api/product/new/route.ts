import { NextRequest, NextResponse } from "next/server";

import { createProduct } from "@/backend/controllers/product-controller";
import { productCreationFailedResponse } from "@/backend/utils/responses/product";
import { Response } from "@/types";
import { ProductType } from "@/types/api/product";
import { connectToDatabase } from "@/utils/database";
import { dbConnectionErrorResponse } from "@/utils/server/responseHandlers";

export async function POST(req: NextRequest) {
  // Connecting to the database
  const isConnected = await connectToDatabase();
  if (!isConnected) {
    return dbConnectionErrorResponse;
  }

  const product: ProductType = await req.json();
  if (!product) {
    return productCreationFailedResponse;
  }
  try {
    const createdProduct = await createProduct(product);

    const response: Response<ProductType> = {
      message: "Product created successfully",
      status: 201,
      success: true,
      payLoad: createdProduct,
    };

    return NextResponse.json(
      {
        body: response,
      },
      { status: 201 }
    );
  } catch (error) {
    return productCreationFailedResponse;
  }
}
