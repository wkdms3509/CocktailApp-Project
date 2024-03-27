import Layout from "@/src/components/Layout";
import "../styles/globals.css";
import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { createStore } from "redux";
import rootReducer from "@/src/reducer";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import wrapper from "@/src/reducer";
import Loader from "@/src/components/Loader";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <PersistGate persistor={persistor} loading={null}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </SessionProvider>
    </Provider>
  );
}
