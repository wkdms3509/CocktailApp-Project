import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import MainBanner from "@/src/components/MainBanner";
import Catecory from "@/src/components/Catecory";
import AllCocktailList from "@/src/components/AllCocktailList";
import axios from "axios";
import { GetServerSideProps } from "next";
import type { Product } from "@/src/constants/productTypes";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ allProductList }: Product[]) {
  return (
    <div className="w-full p-28">
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
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
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
    },
  };
};
