import crypto from "crypto";

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

import Cart from "../models/cart";

export async function createProduct(data: ProductType) {
  try {
    const product = await Product.create(data);
    revalidateTag(productsTag);
    return product;
  } catch (error) {
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
  try {
    const product = (await Product.findById(id)) as ProductType;
    if (!product) {
      throw new Error(PRODUCT_NOT_FOUND as string);
    }
    if (product.images) {
      for (const image of product.images) {
        image.public_id && (await deleteImage(image.public_id));
      }
    }
    await Cart.updateMany(
      { "items.productId": product._id },
      { $pull: { items: { productId: product._id } } }
    );

    const res = await Product.findByIdAndDelete(id);

    revalidateTag(productTag);
    return res;
  } catch (error) {
    throw new Error(FAILED_TO_DELETE_PRODUCT as string);
  }
}

async function deleteImage(publicId: string) {
  const timestamp = new Date().getTime();
  const apiKey = process.env.CLOUDINARY_API_KEY as string;
  const apiSecret = process.env.CLOUDINARY_API_SECRET as string;
  const signature = generateSHA1(generateSignature(publicId, apiSecret));
  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${
        process.env.CLOUDINARY_CLOUD_NAME as string
      }/image/destroy`,
      {
        method: "POST",
        body: JSON.stringify({
          public_id: publicId,
          api_key: apiKey,
          timestamp,
          signature,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch {
    throw new Error();
  }
}

function generateSHA1(data: any) {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
}

function generateSignature(publicId: string, apiSecret: string) {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
}
