export const REGISTER_USER = "REGISTER_USER" as const;
export const LOGIN_USER = "LOGIN_USER" as const;
export const AUTH_USER = "AUTH_USER" as const;

export const register = (message) => {
  return {
    type: REGISTER_USER,
    payload: {
      result: message,
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
  id: number;
  name: string;
  user_id: string;
  email: string;
  auth: string;
}

// interface InitialStateType {
//     is_login: boolean
// }

const initialState = {
  //   users: [],
  message: "",
};

export default function userReducer(state = initialState, action) {
  //   switch (action.type) {
  //   case LOGIN_USER:
  //     return {
  //       user: action.payload.user,
  //       is_login: true,
  // };
  //     case REGISTER_USER:
  //       return {
  //         message: action.payload.result,
  //       };

  //     default:
  //       return state;
  //   }
  return state;
}
