import { create } from "zustand";

import { CartItemType, CartType } from "@/types/api/cart";

type CartStore = {
  cart: CartType;
  setCart: (cart: CartType) => void;
  addItem: (item: CartItemType) => void;
  removeItem: (id: string) => void;
};

const initialState: CartType = {
  _id: "",
  userId: "",
  items: [],
};

const useCartStore = create<CartStore>((set) => ({
  cart: initialState,
  setCart: (cart: CartType) => set({ cart }),
  addItem: (item) =>
    set((state) => ({
      cart: {
        ...state.cart,
        items: [...state.cart.items, item],
      },
    })),
  removeItem: (id) =>
    set((state) => ({
      cart: {
        ...state.cart,
        items: state.cart.items.filter((item) => item._id !== id),
      },
    })),
}));

export default useCartStore;
