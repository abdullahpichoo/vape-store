import { FieldValues } from "react-hook-form";
import * as yup from "yup";

export type ProductType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  countInStock: number;
  rating?: number;
  trending?: boolean;
  discountPrice?: number;
  images?: {
    public_id?: string;
    url?: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
};

export type ProductFormValues = Omit<
  ProductType,
  "_id" | "createdAt" | "updatedAt"
>;

export const ProductSchema = yup.object().shape({
  name: yup.string().required("Please enter the name of your product!"),
  description: yup
    .string()
    .required("Please enter the description of your product!"),
  price: yup.number().required("Please enter the price of your product!"),
  discountPrice: yup.number(),
  category: yup.string().required("Please enter the category of your product!"),
  brand: yup.string().required("Please enter the brand of your product!"),
  rating: yup.number(),
  countInStock: yup
    .number()
    .required("Please enter the count in stock of your product!"),
  trending: yup.boolean(),
  images: yup.array().of(
    yup.object().shape({
      public_id: yup.string(),
      url: yup.string(),
    })
  ),
});
