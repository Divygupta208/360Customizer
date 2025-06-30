import type { Address } from "./User";

export type Order = {
  orderId: string;
  items: Product[];
  date: string;
  shippingAddress?: Address;
  paymentOption?: string;
};

export interface ProductContextType {
  allProducts: Product[];
  cartProducts: Product[];
  orders: Order[];
  addOrder: (order: Order) => void;
  clearCart: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  setCartProducts: (product: cartProduct[]) => void;
  setOrders: (order: Order[]) => void;
  paymentOption: string;
  setPaymentOption: (method: string) => void;
  fetchAllProducts: () => void;
  deleteProduct: (productId: number) => void;
  search?: string;
  setSearch: (value: string) => void;
  isLoading: boolean;
  error: boolean;
}

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string[] | string;
  rating: {
    rate: number;
    count: number;
  };
  badge?: string;
  colors?: string[];
  quantity?: number;
};

export type cartProduct = Product & { quantity: number };
