import Layout from "@/src/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { createStore } from "redux";
import rootReducer, { ReducerType } from "@/src/reducer";
import { Provider } from "react-redux";
import wrapper from "@/src/reducer";

export default function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </Provider>
  );
}
