import { combineReducers } from "redux";
import userReducer from "./user";
import productReducer from "./products";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { configureStore, } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE, } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
// console.log("storage", storage);
const persistConfig = {
    key: "root",
    storage: storageSession,
    whitelist: ["userReducer"],
};
const rootReducer = combineReducers({
    user: userReducer,
    products: productReducer,
});
export const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: (state, action) => {
        switch (action.type) {
            case HYDRATE:
                console.log("HYDRATE", action);
                return Object.assign(Object.assign({}, state), action.payload);
            default:
                return persistedReducer(state, action);
        }
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(logger),
    devTools: process.env.NEXT_PUBLIC_NODE_ENV !== "production",
});
const setupStore = (context) => store;
const makeStore = (context) => setupStore(context);
export const persistor = persistStore(store);
const wrapper = createWrapper(makeStore);
export default wrapper;
