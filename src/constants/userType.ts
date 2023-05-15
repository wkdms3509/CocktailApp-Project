interface User {
  id: string;
  password: string;
}

interface UserInput extends User {
  name: string;
  email: string;
}

interface loginRequestType {
  redirect: boolean;
  username: string;
  password: string;
  callbackUrl: string;
}

export type { User, UserInput, loginRequestType };
