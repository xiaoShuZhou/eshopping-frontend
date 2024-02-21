import { Category } from "./category";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  creationAt?: string;
  updatedAt?: string;
};

export type ProductState = {
  products: Product[];
  loading: boolean;
  error: string | null;
};