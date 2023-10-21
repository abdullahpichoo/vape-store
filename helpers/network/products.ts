import {
  product as productTag,
  products as productsTag,
} from "@/contants/tags";
import {
  addProductApiRoute,
  deleteProductApiRoute,
  productsApiRoute,
  updateProductApiRoute,
} from "@/routes/api";
import { ProductFormValues, ProductType } from "@/types/api/product";

export const uploadImage = async (image: File) => {
  if (image == null) throw new Error("No image provided.");
  const formData = new FormData();
  formData.append("file", image);
  formData.append(
    "upload_preset",
    process.env.CLOUDINARY_PRESET_NAME as string
  );
  formData.append("cloud_name", process.env.CLOUDINARY_CLOUD_NAME as string);

  try {
    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${
        process.env.CLOUDINARY_CLOUD_NAME as string
      }/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await uploadResponse.json();
    const image = {
      public_id: data.public_id,
      url: data.secure_url,
    };
    return image;
  } catch {
    throw new Error();
  }
};

export const addProduct = async (
  product: ProductFormValues,
  imageFiles: FileList
) => {
  let images = [];
  try {
    for (let i = 0; i < imageFiles.length; i++) {
      const image = await uploadImage(imageFiles[i]);
      images.push(image);
    }

    const payload = {
      ...product,
      images,
    };

    const response = await fetch(addProductApiRoute, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data.body.payLoad;
  } catch {
    throw new Error();
  }
};

export const updateProduct = async (
  product: ProductFormValues,
  productId: string
) => {
  try {
    const response = await fetch(updateProductApiRoute(productId), {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data.body.payLoad;
  } catch {
    throw new Error();
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const response = await fetch(deleteProductApiRoute(productId), {
      method: "DELETE",
    });

    const data = await response.json();
    return data.body.payLoad;
  } catch {
    throw new Error();
  }
};

export const getProducts = async (): Promise<ProductType[]> => {
  try {
    const response = await fetch(productsApiRoute, {
      next: { revalidate: 3600, tags: [productsTag, productTag] },
    });

    const data = await response.json();
    return data.body.payLoad;
  } catch {
    throw new Error();
  }
};

export const getProduct = async (id: string) => {
  try {
    const response = await fetch(`${productsApiRoute}/${id}`, {
      cache: "no-store",
    });

    const data = await response.json();
    return data.body.payLoad;
  } catch {
    throw new Error();
  }
};
