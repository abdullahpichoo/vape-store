// product.js
import { connectToDatabase } from "../../utils/database";
import Productschema from "../../models/product";
import { ProductType } from "../../types/api/product";

type productData = ProductType;

// Create a new product
export async function createProduct(data: productData) {
  await connectToDatabase();

  try {
    const product = new Productschema(data);
    return await product.save();
  } catch (error) {
    throw error;
  }
}

// Get a list of all products
export async function getAllProducts() {
  await connectToDatabase();

  try {
    return await Productschema.find({});
  } catch (error) {
    throw error;
  }
}

// Get a single product by ID
export async function getProductById(id: string | string[] | undefined) {
  await connectToDatabase();

  try {
    return await Productschema.findById(id);
  } catch (error) {
    throw error;
  }
}

// Update a product by ID
export async function updateProduct(
  id: string | string[] | undefined,
  data: productData
) {
  await connectToDatabase();

  try {
    return await Productschema.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw error;
  }
}

// Delete a product by ID
export async function deleteProduct(id: string | string[] | undefined) {
  await connectToDatabase();

  try {
    return await Productschema.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
}
