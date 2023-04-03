export const REGISTER_USER = "REGISTER_USER" as const;
export const LOGIN_USER = "LOGIN_USER" as const;
export const AUTH_USER = "AUTH_USER" as const;

export const register = (user) => {
  return {
    type: REGISTER_USER,
    payload: {
      result: user,
    },
  };
};

export const login = (user) => {
  return {
    type: LOGIN_USER,
    payload: {
      user,
    },
  };
};

export const auth = (user) => {
  return {
    type: AUTH_USER,
    payload: {
      user,
    },
  };
};

export type UserAction = ReturnType<
  typeof register | typeof login | typeof auth
>;

interface User {
  id: string;
  //   name: string;
  //   auth: string;
  isLogin: boolean;
}

const initialState: User = {
  id: "",
  //   name: "",
  //   auth: "",
  isLogin: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      console.log("LOGIN_USER", action.payload);
      return {
        ...state,
        // name: action.payload.user.name,
        // auth: action.payload.user.auth,
        id: action.payload.user,
        isLogin: true,
      };
    //     case REGISTER_USER:
    //       return {
    //         message: action.payload.result,
    //       };

    default:
      return state;
  }
}
