import Layout from "@/src/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { createStore } from "redux";
import rootReducer from "@/src/reducer";
import { Provider } from "react-redux";

const store = createStore(rootReducer);
console.log(store.getState());
// console.log(rootReducer);

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <Provider store={store}>
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
    // {/* </Provider> */}
  );
}
