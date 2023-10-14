"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/btn";
import InputController from "@/components/ui/form/input-controller";
import SwitchController from "@/components/ui/form/switch-controller";
import TextAreaController from "@/components/ui/form/text-area-controller";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/toast/use-toast";
import { FAILED_TO_UPDATE_PRODUCT } from "@/contants/errorMsgs";
import { PRODUCT_UPDATED_SUCCESSFULLY } from "@/contants/successMsgs";
import { updateProductApiRoute } from "@/routes/api";
import {
  ProductFormValues,
  ProductSchema,
  ProductType,
} from "@/types/api/product";

interface ProductEditFormProps {
  productData: ProductType;
}

const ProductEditForm = (props: ProductEditFormProps) => {
  const { productData } = props;
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      countInStock: productData.countInStock,
      category: productData.category,
      brand: productData.brand,
      trending: productData.trending,
      images: productData.images,
      rating: productData.rating,
    },
    mode: "onBlur",
    resolver: yupResolver(ProductSchema),
  });

  const onSubmit = async (data: ProductFormValues) => {
    setIsUpdating(true);

    const payload = {
      ...data,
      rating: productData.rating,
    };
    const url = `${process.env.LOCAL_BASE_URL}/api/products/${productData._id}`;
    console.log("URL", url);
    try {
      const res = await fetch(updateProductApiRoute(productData._id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log("Res", res);
      toast({
        title: PRODUCT_UPDATED_SUCCESSFULLY,
        description: "The requested product has been updated successfully!",
      });
      setIsUpdating(false);
      setTimeout(
        () => window.location.replace("/admin/dashboard/products"),
        1000
      );
    } catch (err) {
      setIsUpdating(false);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: FAILED_TO_UPDATE_PRODUCT + err,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-12">
          <InputController
            control={control}
            label="Name"
            name="name"
            type="text"
            placeholder="Enter Product Name"
            rules={{
              required: "Please Enter Product Name!",
            }}
            error={errors.name}
          />
        </div>

        <div className="col-span-12">
          <TextAreaController
            control={control}
            label="Description"
            name="description"
            type="text"
            placeholder="Enter Product Description"
            rules={{
              required: "Please Enter Product Description!",
            }}
            error={errors.description}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <InputController
            control={control}
            label="Count In Stock"
            name="countInStock"
            type="number"
            placeholder="Enter Product Count In Stock"
            rules={{
              required: "Please Enter Product Count In Stock!",
            }}
            error={errors.countInStock}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <InputController
            control={control}
            label="Price"
            name="price"
            type="number"
            placeholder="Enter Product Price"
            rules={{
              required: "Please Enter Product Price!",
            }}
            error={errors.price}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <InputController
            control={control}
            label="Discount Price"
            name="discountPrice"
            type="number"
            placeholder="Enter Discounted Price"
            error={errors.discountPrice}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputController
            control={control}
            label="Category"
            name="category"
            type="text"
            placeholder="Enter Product Category"
            rules={{
              required: "Please Enter Product Category!",
            }}
            error={errors.category}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputController
            control={control}
            label="Brand"
            name="brand"
            type="text"
            placeholder="Enter Product Brand"
            rules={{
              required: "Please Enter Product Brand!",
            }}
            error={errors.brand}
          />
        </div>
        <div className="col-span-12">
          <SwitchController
            control={control}
            label="Trending"
            name="trending"
            rules={{
              required: "Please Enter Product Brand!",
            }}
            error={errors.brand}
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <InputController
            control={control}
            label="Rating"
            name="rating"
            type="number"
            placeholder=""
            rules={{
              required: "Please Enter Rating!",
            }}
            error={errors.brand}
          />
        </div>
      </div>
      <div className="my-5 text-center">
        <Button type="submit" variant="black" size="sm" disabled={isUpdating}>
          {isUpdating && <Spinner size="sm" color="black" />}
          {isUpdating ? "Updating" : "Update Product"}
        </Button>
      </div>
    </form>
  );
};

export default ProductEditForm;
