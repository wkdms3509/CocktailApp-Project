var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import Layout from "@/src/components/Layout";
import "../styles/globals.css";
import "../styles/tailwind.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
// import { wrapper } from "@/src/reducer/test";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import wrapper from "@/src/reducer";
export default function App(_a) {
    var { Component } = _a, _b = _a.pageProps, { session } = _b, pageProps = __rest(_b, ["session"]);
    const { store, props } = wrapper.useWrappedStore(pageProps);
    const persistor = persistStore(store);
    return (<Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <PersistGate persistor={persistor} loading={<div>loading ...</div>}>
          <Layout>
            <Component {...pageProps}/>
          </Layout>
        </PersistGate>
      </SessionProvider>
    </Provider>);
}
