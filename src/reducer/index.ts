import { combineReducers } from "redux";
import userReducer from "./user";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({ userReducer });

// export const makeStore = () => {
//   const store = configureStore({
//     reducer: (state, action) => {
//       switch (action.type) {
//         case HYDRATE:
//           return action.payload;

//         default:
//           return rootReducer(state, action);
//       }
//     },
//     devTools: process.env.NODE_ENV !== "production",
//   });
//   return store;
// };

// const wrapper = createWrapper(makeStore, {
//   debug: process.env.NODE_ENV === "development",
// });

// export type RootState = ReturnType<typeof rootReducer>;

// export default wrapper;

export default rootReducer;
