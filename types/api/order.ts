import { AddressType } from "./address";

type OrderStatus = {
  [key: string]: "ORDERED" | "PROCESSING" | "DELIVERED";
};

export const orderStatus: OrderStatus = {
  ORDERED: "ORDERED",
  PROCESSING: "PROCESSING",
  DELIVERED: "DELIVERED",
};

export const orderStatusList = [
  { label: "PROCESSING", value: "PROCESSING" },
  { label: "DELIVERED", value: "DELIVERED" },
];
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
  user: {
    userId: string;
    email: string;
  };
  items: OrderItemType[];
  status: keyof typeof orderStatus;
  totalPrice: number;
  shippingAddress: AddressType;
  deliveredAt: Date;
  createdAt?: Date;
}

export interface OrderTableType {
  _id: string;
  user: string;
  status: keyof typeof orderStatus;
  totalPrice: number;
  createdAt?: string;
}

export type OrderPayloadType = Omit<OrderType, "_id" | "deliveredAt">;
