import { NextResponse } from "next/server";

import { getAllProducts } from "@/backend/controllers/product-controller";
import { failedToFetchProductsResponse } from "@/backend/utils/responses/product";
import { connectToDatabase } from "@/utils/database";
import { dbConnectionErrorResponse } from "@/utils/server/responseHandlers";

export const GET = async () => {
  // Connecting to the database
  const isConnected = await connectToDatabase();
  if (!isConnected) {
    return dbConnectionErrorResponse;
  }

  try {
    const products = await getAllProducts();
    const response = {
      message: "Products fetched successfully",
      status: 200,
      success: true,
      payLoad: products,
    };

    return NextResponse.json(
      {
        body: response,
      },
      { status: 200 }
    );
  } catch (error) {
    return failedToFetchProductsResponse;
  }
};
