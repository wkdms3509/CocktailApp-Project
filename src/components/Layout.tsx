import Head from "next/head";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Cocktail</title>
      </Head>
      <Navbar />
      <div>{children}</div>
    </>
  );
};

export default Layout;
