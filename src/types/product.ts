import { Category } from "./category";


// All types are defined based on the API required format
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

//Define type for new product
export type NewProduct = {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
};

export type UpdatedProduct = {
  title?: string;
  price?: number;
  description?: string;
  categoryId?: number;
  images?: string[];
};


export type FilterParams = {
  title?: string;
  priceMin?: number;
  priceMax?: number;
  categoryId?: number;
}

export type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};