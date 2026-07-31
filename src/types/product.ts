export interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  description: string;
  stock: number;
  tags: string[];
  availabilityStatus: string;
  returnPolicy: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type CreateProductRequest = Omit<Product, "id">;
export type UpdateProductRequest = Partial<Omit<Product, "id">> &
  Pick<Product, "id">;

export type SortType = "price" | "title" | "rating";
export type CategoryFilter = string;
export type FormMode = "edit" | "create";
export type SortDirection = "asc" | "desc";
