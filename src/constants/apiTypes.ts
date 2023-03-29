interface User {
  name: string;
  email: string;
  id: number;
}

interface Data {
  code: number;
  is_success: boolean;
  message: string;
  cookie?: string;
  data?: User;
}

export type { User, Data };
