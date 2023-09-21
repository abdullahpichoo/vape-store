export type ProductType = {
  name: string;
  description: string;
  price: number;
  images: {
    public_id: string;
    url: string;
  }[];
  category: string;
  brand: string;
  rating: number;
  countInStock: number;
};
