import { applyMiddleware, combineReducers, compose } from "redux";
import userReducer from "./user";
import productReducer from "./products";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import createSagaMiddleware from "@redux-saga/core";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootSaga } from "../saga/saga";

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
});

// export default rootReducer;

export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));

  const store = configureStore({
    reducer: (state, action) => {
      switch (action.type) {
        case HYDRATE:
          console.log("HYDRATE", action);
          return { ...state, ...action.payload };
        default:
          return rootReducer(state, action);
      }
    },
    // enhancer: enhancer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",
  });
  //   store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== "development",
});

export type RootState = ReturnType<typeof rootReducer>;

export default wrapper;
