import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Cocktail</title>
      </Head>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
