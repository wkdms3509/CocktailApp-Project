interface GetProductListResult {
  code: number;
  is_success: boolean;
  data: Product[];
}

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

interface User {
  name: string;
  email: string;
  idx: number;
  id?: string;
  auth?: string;
}

interface Data {
  code: number;
  is_success: boolean;
  message: string;
  cookie?: string;
  data?: User;
}

interface RequestUserData {
  username: string;
  password: string;
}

interface RequestNewUser {
  name: string;
  email: string;
  id: string;
  password: string;
}

export type {
  User,
  Data,
  GetProductListResult,
  Product,
  RequestUserData,
  RequestNewUser,
};
