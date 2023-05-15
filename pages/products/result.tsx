import Result from "@/src/components/product/Result";
import { GetProductListResult } from "@/src/constants/apiTypes";
import { AllCocktailListProps } from "@/src/constants/productTypes";
import axios from "axios";
import { GetServerSideProps } from "next";

const resultPage = ({ allProductList }: AllCocktailListProps) => {
  return <Result allProductList={allProductList} />;
};

export default resultPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await axios.get("http://localhost:3000/api/products");

  // const { data } = await res.data;
  const result: GetProductListResult = res.data;

  return {
    props: {
      allProductList: result.data,
    },
  };
};
