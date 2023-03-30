interface User {
  id: string;
  password: string;
}

interface UserInput extends User {
  name: string;
  email: string;
}

export type { User, UserInput };
