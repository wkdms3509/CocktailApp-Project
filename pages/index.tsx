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
import wrapper, { persistor } from "@/src/reducer";
import { useEffect } from "react";
import { addItem, initializeItems, upCount } from "@/src/reducer/products";
import { END } from "@redux-saga/core";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ allProductList }) {
  const { data: session, status } = useSession();
  // const productsList = useSelector((state) => state);
  // console.log("productsList", productsList);
  // console.log("persistor", persistor);

  return (
    <>
      {status === "authenticated" ? (
        <div className="w-full mx-auto">
          <section>
            <MainBanner />
          </section>
          <section className=" p-5">
            <Catecory allProductList={allProductList} />
          </section>
          <section className="p-32">
            <AllCocktailList allProductList={allProductList} />
          </section>
        </div>
      ) : (
        <LoginForm />
      )}
    </>
  );
}

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

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const res = await axios.get("http://localhost:3000/api/products");
    const items = [
      {
        id: 3,
        type: "gin",
        name: "칵테일",
        description: "테스트",
        alcohol: "5",
        sugar: "10",
        sourness: "2",
        bitter: "4",
        recipe: "",
        img: "image/image.com",
        create_at: "2023-4-10",
      },
      {
        id: 4,
        type: "gin",
        name: "칵테일2",
        description: "테스트2",
        alcohol: "5",
        sugar: "10",
        sourness: "2",
        bitter: "4",
        recipe: "",
        img: "image/image.com",
        create_at: "2023-4-10",
      },
    ];

    store.dispatch(initializeItems(items));

    if (!res.data) {
      return {
        notFound: true,
      };
    }
    const { data } = res.data;

    return {
      props: {
        allProductList: data,
      },
    };
  });

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
