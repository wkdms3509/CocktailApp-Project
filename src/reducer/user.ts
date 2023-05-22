export const REGISTER_USER = "REGISTER_USER" as const;
export const LOGIN_USER = "LOGIN_USER" as const;
export const LOGOUT_USER = "LOGOUT_USER" as const;
export const AUTH_USER = "AUTH_USER" as const;

export const register = (message: string) => {
  return {
    type: REGISTER_USER,
    payload: {
      message,
    },
  };
};

export const login = (user: string) => {
  console.log("로그인 액션 발생", user);
  return {
    type: LOGIN_USER,
    payload: {
      user,
    },
  };
};

export const logout = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const auth = (user: string) => {
  return {
    type: AUTH_USER,
    payload: {
      user,
    },
  };
};

export type UserActionsType =
  | ReturnType<typeof register>
  | ReturnType<typeof login>
  | ReturnType<typeof logout>
  | ReturnType<typeof auth>;

interface User {
  id: string;
  email?: string;
}

interface InitialType {
  isLogin: boolean;
  user?: User;
  message?: string;
}

const initialState: InitialType = {
  isLogin: false,
  user: {
    id: "",
  },
};

export default function userReducer(
  state = initialState,
  action: UserActionsType
) {
  switch (action.type) {
    case LOGIN_USER:
      console.log("action.payload", action.payload);

      return {
        ...state,
        user: { id: action.payload.user },
        isLogin: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: undefined,
        isLogin: false,
      };
    case REGISTER_USER:
      return {
        ...state,
        message: action.payload.message,
      };

    default:
      return state;
  }
}
