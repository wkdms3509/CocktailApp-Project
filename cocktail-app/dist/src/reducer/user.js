export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const AUTH_USER = "AUTH_USER";
export const register = (message) => {
    return {
        type: REGISTER_USER,
        payload: {
            message,
        },
    };
};
export const login = (user) => {
    // console.log("로그인 액션 발생", user);
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
export const auth = (user) => {
    return {
        type: AUTH_USER,
        payload: {
            user,
        },
    };
};
const initialState = {
    isLogin: false,
    user: {
        id: "",
        // auth: "",
    },
};
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            console.log("로그인 action.payload", action.payload);
            return Object.assign(Object.assign({}, state), { user: { id: action.payload.user }, isLogin: true });
        case LOGOUT_USER:
            return Object.assign(Object.assign({}, state), { user: undefined, isLogin: false });
        case REGISTER_USER:
            return Object.assign(Object.assign({}, state), { message: action.payload.message });
        default:
            return state;
    }
}
