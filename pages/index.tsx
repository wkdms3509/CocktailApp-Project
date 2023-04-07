import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import MainBanner from "@/src/components/MainBanner";
import Catecory from "@/src/components/Catecory";
import AllCocktailList from "@/src/components/AllCocktailList";
import axios from "axios";
import { GetServerSideProps, GetStaticProps } from "next";
import type {
  AllCocktailListProps,
  Product,
} from "@/src/constants/productTypes";
import { getSession, useSession } from "next-auth/react";
import LoginForm from "@/src/components/user/LoginForm";
import { useSelector } from "react-redux";
import wrapper from "@/src/reducer";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: AllCocktailListProps) {
  const { allProductList } = props;
  const { data: session, status } = useSession();
  const userSelector = useSelector((state) => state.userReducer);
  // console.log("Home session 3", session);

  return (
    <>
      {status === "authenticated" ? (
        <div className="w-full p-32 mx-auto">
          {/* <h1>{userSelector.user}</h1> */}
          <section>
            <MainBanner />
          </section>
          <section>
            <Catecory />
          </section>
          <section>
            <AllCocktailList allProductList={allProductList} />
          </section>
        </div>
      ) : (
        <LoginForm />
      )}
    </>
  );
}

// export const getServerSideProps: GetServerSideProps =
//   wrapper.getServerSideProps((store) => async (context) => {
//     const res = await axios.get("http://localhost:3000/api/products");

//     if (!res.data) {
//       return {
//         notFound: true,
//       };
//     }

//     const { data } = res.data;

//     return {
//       props: {
//         allProductList: data,
//       },
//     };
//   });

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await axios.get("http://localhost:3000/api/products");

  if (!res.data) {
    return {
      notFound: true,
    };
  }

  const { data } = res.data;

  return {
    props: {
      allProductList: data,
      // session: await getSession(context),
    },
  };
};

// 빌드 타임에 html 생성
// export const getStaticProps: GetStaticProps = async () => {
//   const res = await axios.get("http://localhost:3000/api/products");
//   if (!res.data) {
//     return {
//       notFound: true,
//     };
//   }

//   const { data } = res.data;
//   return {
//     props: {
//       allProductList: data,
//     },
//   };
// };
