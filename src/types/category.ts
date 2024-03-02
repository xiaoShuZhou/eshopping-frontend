export type Category = {
  id: number;
  name: string;
  image: string;
};

export type CategoryState = {
  categories: Category[];
  loading: boolean;
  error: string | null;
};