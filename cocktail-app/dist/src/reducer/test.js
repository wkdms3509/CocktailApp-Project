import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage/session";
import productReducer from "./products";
import userReducer from "./user";
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE, } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import logger from "redux-logger";
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["userReducer"],
};
const rootReducer = combineReducers({
    user: userReducer,
    products: productReducer,
});
export const persistedReducer = persistReducer(persistConfig, rootReducer);
const makeStore = (context) => configureStore({
    reducer: (state, action) => {
        if (action.type === HYDRATE) {
            return Object.assign(Object.assign({}, state), action.payload);
        }
        return persistedReducer(state, action);
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(logger),
});
export const wrapper = createWrapper(makeStore, {
    debug: true,
});
