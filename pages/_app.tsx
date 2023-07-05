import Layout from "@/src/components/Layout";
import "../styles/globals.css";
import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { createStore } from "redux";
import rootReducer, { persistor } from "@/src/reducer";
import { Provider } from "react-redux";
// import { wrapper } from "@/src/reducer/test";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import wrapper from "@/src/reducer";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor} loading={null}> */}
      <PersistGate persistor={persistor} loading={<div>loading ...</div>}>
        <SessionProvider session={pageProps.session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}
