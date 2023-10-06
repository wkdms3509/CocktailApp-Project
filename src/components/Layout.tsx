import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import LoginForm from "./user/LoginForm";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  return (
    <>
      {/* <Head>
        <title>Cocktail</title>
      </Head> */}

      {status === "authenticated" ? (
        <>
          <Navbar />
          <div className="bg-center bg-fixed bg-cover w-full overflow-x-hidden">
            {children}
          </div>
          <Footer />
        </>
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default Layout;
