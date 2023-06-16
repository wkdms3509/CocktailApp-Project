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

interface UserResponseData {
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

interface GetBookmarkData {
  user_id: string;
  id: number;
  update_at: Date;
}

interface ResponseBookmark {
  code: number;
  message: string;
  bookmark?: GetBookmarkData[];
}

export type {
  User,
  Data,
  GetProductListResult,
  Product,
  RequestUserData,
  RequestNewUser,
  UserResponseData,
  ResponseBookmark,
  GetBookmarkData,
};
