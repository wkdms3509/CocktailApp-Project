import { applyMiddleware, combineReducers, compose, Store } from "redux";
import userReducer from "./user";
import productReducer from "./products";
import { createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";
import {
  configureStore,
  EnhancedStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import createSagaMiddleware from "@redux-saga/core";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootSaga } from "../saga/saga";
// import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  // storage: storage,
  storage,
  whitelist: ["userReducer"],
};

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
  devTools: process.env.NEXT_PUBLIC_NODE_ENV !== "production",
});

const setupStore = (context: any): EnhancedStore => store;
const makeStore: MakeStore<any> = (context: any) => setupStore(context);

export const persistor = persistStore(store);

const wrapper = createWrapper<Store>(makeStore);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.dispatch>;

// export type RootState = ReturnType<typeof rootReducer>; //기존

export default wrapper;

// 1
// export const makeStore = () => {
//   const sagaMiddleware = createSagaMiddleware();
//   const middlewares = [sagaMiddleware];
//   const enhancer =
//     process.env.NODE_ENV === "production"
//       ? compose(applyMiddleware(...middlewares))
//       : composeWithDevTools(applyMiddleware(...middlewares));

//   const store = configureStore({
//     reducer: (state, action) => {
//       switch (action.type) {
//         case HYDRATE:
//           console.log("HYDRATE", action);
//           return { ...state, ...action.payload };
//         default:
//           return persistedReducer(state, action);
//       }
//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
//     devTools: process.env.NODE_ENV !== "production",
//   });
//   return store;
// };

// 2
// export const makeConfiguredStore = (mainReducer) =>
//   configureStore({
//     reducer: (state, action) => {
//       switch (action.type) {
//         case HYDRATE:
//           console.log("HYDRATE", action);
//           return { ...state, ...action.payload };
//         default:
//           return mainReducer(state, action);
//       }
//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
//     devTools: process.env.NODE_ENV !== "production",
//   });
