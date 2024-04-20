import { Product } from "./product";
import { User } from "./user";

export type OrderItem = {
    id: string;
    product: Product;
    quantity: number;
  }

export type Order = {
    id: string;
    user: User;
    items: OrderItem[];
    shippingAddress: string;
  }

export type OrderState = {
    order: Order | null;
    loading: boolean;
    error: string | null;
  }

export type OrderItemState = {
    items: OrderItem[];
    loading: boolean;
    error: string | null;
  }