export interface CartItemType {
  _id?: string;
  productId: string;
  productName: string;
  productPrice: number;
  productBrand: string;
  quantity: number;
}

export interface CartType {
  _id: string;
  userId: string;
  items: CartItemType[];
}
