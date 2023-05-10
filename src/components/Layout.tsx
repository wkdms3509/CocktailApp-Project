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
      <div className="absolute left-0 right-0 bg-red-300 bg-center bg-fixed bg-cover">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
