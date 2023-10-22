export const orderStatus = {
  ORDERED: "ORDERED",
  PROCESSING: "PROCESSING",
  DELIVERED: "DELIVERED",
};

export interface OrderItemType {
  _id?: string;
  productId: string;
  productImage: string;
  productName: string;
  productPrice: number;
  productBrand: string;
  quantity: number;
}

export interface OrderType {
  _id: string;
  userId: string;
  items: OrderItemType[];
  status: keyof typeof orderStatus;
}
