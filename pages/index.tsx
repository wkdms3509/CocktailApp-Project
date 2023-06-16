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
import { TypedUseSelectorHook, useSelector } from "react-redux";
import wrapper, { persistor, store } from "@/src/reducer";
import { useEffect } from "react";
import {
  addItem,
  initializeItems,
  InitialProductType,
} from "@/src/reducer/products";
import { END } from "@redux-saga/core";
import { useDispatch } from "react-redux";
import { login } from "@/src/reducer/user";
import { GetProductListResult } from "@/src/constants/apiTypes";
import NonAlcCocktailList from "@/src/components/product/NonAlcCocktailList";
import { sessionUserType } from "@/src/constants/userType";
// import { RootState } from "@/src/reducer/test";
import { RootState } from "@/src/reducer";
const inter = Inter({ subsets: ["latin"] });
// const allProducts: Product[] = useSelector<RootState>(
//   (state) => state.products.products
// );

export default function Home({ allProductList }: AllCocktailListProps) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  const store = useSelector<RootState | Product[]>(
    (state) => state.products.products
  );

  // console.log("home session", session);

  // useEffect(() => {
  //   if (session) {
  //     const userId = (session.user as sessionUserType)?.id;
  // session이 생성되면 session의 정보로 login 액션 디스패치
  // dispatch(login(userId ?? ""));
  // }
  // }, [dispatch, session]);

  return (
    <>
      {status === "authenticated" ? (
        <div className="w-full mx-auto">
          <section>
            <MainBanner />
          </section>
          <section className="px-3 py-5">
            <Catecory />
          </section>
          <section className="p-3 md:p-5 lg:p-32">
            <AllCocktailList allProductList={allProductList} />
          </section>
          <section className="p-3 md:p-5 lg:p-32 md:hidden">
            <NonAlcCocktailList allProductList={allProductList} />
          </section>
        </div>
      ) : (
        <LoginForm />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const res = await axios.get("http://localhost:3000/api/products");

    const result: GetProductListResult = res.data;

    store.dispatch(initializeItems(result.data));

    if (!result) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        allProductList: result.data,
      },
    };
  });

// export const getStaticPaths: GetStaticPaths = async (context) => {
//   const res = await fetch("http://localhost:3000/api/products");
//   const posts = await res.json();

//   const paths = posts.data.map((post) => ({
//     params: { id: post.id },
//   }));
//   // console.log("getStaticPaths", posts.data);

//   return {
//     paths,
//     fallback: false,
//   };
// };

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

// const items = [
//   {
//     id: 3,
//     type: "gin",
//     name: "칵테일",
//     description: "테스트",
//     alcohol: "5",
//     sugar: "10",
//     sourness: "2",
//     bitter: "4",
//     recipe: "",
//     img: "image/image.com",
//     create_at: "2023-4-10",
//   },
//   {
//     id: 4,
//     type: "gin",
//     name: "칵테일2",
//     description: "테스트2",
//     alcohol: "5",
//     sugar: "10",
//     sourness: "2",
//     bitter: "4",
//     recipe: "",
//     img: "image/image.com",
//     create_at: "2023-4-10",
//   },
// ];
