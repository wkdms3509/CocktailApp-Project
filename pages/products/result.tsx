import Result from "@/src/components/product/Result";
import axios from "axios";
import { GetServerSideProps } from "next";

const resultPage = ({ productList }) => {
  return <Result productList={productList} />;
};

export default resultPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await axios.get("http://localhost:3000/api/products");
  const { data } = await res.data;

  return {
    props: {
      productList: data,
    },
  };
};
