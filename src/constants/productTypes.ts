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

interface AllCocktailListProps {
  allProductList: Product[];
}

interface ProductCardType {
  product: Product;
}

export type { Product, AllCocktailListProps, ProductCardType };
