import { RowDataPacket } from "mysql2";

interface Product extends RowDataPacket {
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

interface UserQueryType extends RowDataPacket {
  id: number;
  name: string;
  user_id: string;
  password: string;
  email: string;
  create_at: Date;
  salt: string;
  auth: string;
}

interface CredentialsType {
  redirect: string;
  username: string;
  password: string;
  callbackUrl: string;
  csrfToken: string;
  json: string;
}

export type { Product, UserQueryType, CredentialsType };
