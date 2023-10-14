import { revalidateTag } from "next/cache";

import Product from "@/backend/models/product";
import {
  FAILED_TO_CREATE_PRODUCT,
  FAILED_TO_DELETE_PRODUCT,
  FAILED_TO_GET_PRODUCT,
  FAILED_TO_GET_PRODUCTS,
  FAILED_TO_UPDATE_PRODUCT,
  PRODUCT_NOT_FOUND,
} from "@/contants/errorMsgs";
import {
  products as productsTag,
  product as productTag,
} from "@/contants/tags";
import { ProductType } from "@/types/api/product";

export async function createProduct(data: ProductType) {
  try {
    const product = await Product.create(data);
    revalidateTag(productsTag);
    return product;
  } catch (error) {
    console.log(error);
    throw new Error(FAILED_TO_CREATE_PRODUCT as string);
  }
}

export async function getAllProducts(): Promise<ProductType[]> {
  try {
    const products = await Product.find({});

    return products;
  } catch (error) {
    throw new Error(FAILED_TO_GET_PRODUCTS as string);
  }
}

export async function getProductById(id: string): Promise<ProductType> {
  try {
    const product = (await Product.findById(id)) as ProductType;
    if (!product) {
      throw new Error(PRODUCT_NOT_FOUND as string);
    }
    return product;
  } catch (error) {
    throw new Error(FAILED_TO_GET_PRODUCT as string);
  }
}

export async function updateProduct(id: string, data: ProductType) {
  try {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!product) {
      throw new Error(PRODUCT_NOT_FOUND as string);
    }
    revalidateTag(productTag);
    return product;
  } catch (error) {
    throw new Error(FAILED_TO_UPDATE_PRODUCT as string);
  }
}

export async function deleteProduct(id: string) {
  // TODO: When a product is deleted, all of the cart items related to that product should also be deleted and its reviews should also be deleted
  try {
    const res = await Product.findByIdAndDelete(id);
    revalidateTag(productTag);
    return res;
  } catch (error) {
    throw new Error(FAILED_TO_DELETE_PRODUCT as string);
  }
}
