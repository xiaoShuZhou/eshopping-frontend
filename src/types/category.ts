export type Category = {
  id: string;
  name: string;
  creationAt?: string;
  updatedAt?: string;
};

export type CategoryState = {
  categories: Category[];
  loading: boolean;
  error: string | null;
};