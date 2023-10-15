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
  numReviews?: number;
  sales?: number;
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
  price: yup
    .number()
    .min(1)
    .required("Please enter the price of your product!"),
  category: yup.string().required("Please enter the category of your product!"),
  brand: yup.string().required("Please enter the brand of your product!"),
  countInStock: yup
    .number()
    .min(1)
    .required("Please enter the count in stock of your product!"),
  discountPrice: yup.number(),
  rating: yup.number(),
  trending: yup.boolean(),
  images: yup.array().of(
    yup.object().shape({
      public_id: yup.string(),
      url: yup.string(),
    })
  ),
});
