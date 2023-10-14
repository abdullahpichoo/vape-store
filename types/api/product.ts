export type ProductType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: {
    public_id: string;
    url: string;
  }[];
  category: string;
  brand: string;
  rating: number;
  countInStock: number;
  trending: boolean;
  createdAt?: string;
  updatedAt?: string;
};
