import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Cocktail</title>
      </Head>
      <Navbar />
      <div className="bg-center bg-fixed bg-cover">
        {/* <div className="absolute left-0 right-0 bg-center bg-fixed bg-cover"> */}
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
