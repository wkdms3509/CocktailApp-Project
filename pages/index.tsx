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
import { addItem, initializeItems, upCount } from "@/src/reducer/products";
import { END } from "@redux-saga/core";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ allProductList }) {
  const { data: session, status } = useSession();
  // const productsList = useSelector((state) => state.products);
  // console.log("productsList", productsList);

  // useEffect(() => {
  //   try {
  //     async function fetchData() {
  //       const res = await axios.get("/api/products");
  //       console.log("useEffect", await res.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

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

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
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

    // console.log('store state', store.getState);

    // store.dispatch(initializeItems(items));
    const res = await axios.get("http://localhost:3000/api/products");

    if (!res.data) {
      return {
        notFound: true,
      };
    }
    const { data } = res.data;
    // store.dispatch(data);
    // store.dispatch(END);
    // await store.sagaTask?.toPromise();

    return {
      props: {
        allProductList: data,
      },
    };
  });

// export const getServerSideProps: GetServerSideProps = async (context) => {
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
