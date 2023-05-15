interface Product {
  id: number;
  name: string;
  type: string;
  img: string;
  create_at: string;
  alcohol: string;
  sugar: string;
  sourness: string;
  bitter: string;
  recipe: string | null;
  description: string;
}

interface NewProductInputType {
  name: string;
  type: string;
  description: string;
  alcohol: string;
  sugar: string;
  sourness: string;
  bitter: string;
  img: string;
}

interface RecommendProductReturnType {
  alcohol: number;
  sugar: number;
  sourness: number;
  bitter: number;
  id: number;
  name: string;
  type: string;
  img: string;
  create_at: string;
  recipe: string | null;
  description: string;
}

interface RecommendProductDescriptionType {
  light: string[];
  middle: string[];
  high: string[];
}

interface AllCocktailListProps {
  allProductList: Product[];
}

interface ProductCardType {
  product: Product;
}

interface CategoryProductList {
  categoryProducts: Product[];
}

interface Category {
  gin: string;
  non_alc: string;
  vodka: string;
  rum: string;
  whiskey: string;
}

interface NewProductInputType {
  id?: number;
  name: string;
  type: string;
  description: string;
  alcohol: string;
  sugar: string;
  sourness: string;
  bitter: string;
  img: string;
  create_at?: string;
  recipe?: string | null;
}

interface PaginationInfo {
  total: number;
  limit: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export type {
  Product,
  AllCocktailListProps,
  ProductCardType,
  Category,
  RecommendProductReturnType,
  RecommendProductDescriptionType,
  NewProductInputType,
  CategoryProductList,
  PaginationInfo,
};
