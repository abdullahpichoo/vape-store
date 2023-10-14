"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/btn";
import InputController from "@/components/ui/form/input-controller";
import SwitchController from "@/components/ui/form/switch-controller";
import TextAreaController from "@/components/ui/form/text-area-controller";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/toast/use-toast";
import { ProductFormValues, ProductSchema } from "@/types/api/product";

const ProductAddForm = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [imageFiles, setImageFiles] = useState<FileList | null>();

  const { toast } = useToast();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    mode: "onBlur",
    resolver: yupResolver(ProductSchema),
  });

  const onSubmit = async (data: ProductFormValues) => {
    console.log("DATA", data);
  };

  useEffect(() => {
    console.log("Errors", errors);
  }, [errors]);

  useEffect(() => {
    console.log("Image Files", imageFiles);
  }, [imageFiles]);

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
        <div className="col-span-12 md:col-span-6">
          <SwitchController
            control={control}
            label="Trending"
            name="trending"
            value={false}
            rules={{
              required: "Please Enter Product Brand!",
            }}
            error={errors.trending}
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <div className="form-item flex flex-col gap-2">
            <label
              htmlFor={"images"}
              className="font-semibold text-neutral-600 ms-1 text-[1.2rem] md:text-[1.6rem]"
            >
              Image Upload
            </label>

            <input
              id="images"
              type="file"
              onChange={(e) => {
                const files = e.target.files;
                setImageFiles(files);
              }}
              multiple
              accept="image/png, image/jpeg, image/jpg, image/webp"
            />
          </div>
        </div>
      </div>
      <div className="my-10 text-center">
        <Button type="submit" variant="black" size="sm" disabled={isAdding}>
          {isAdding && <Spinner size="sm" color="black" />}
          {isAdding ? "Adding" : "Add Product"}
        </Button>
      </div>
    </form>
  );
};

export default ProductAddForm;
