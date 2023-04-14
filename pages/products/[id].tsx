import wrapper from "@/src/reducer";
import axios from "axios";
import { GetServerSideProps } from "next";
import styles from "../../styles/Home.module.css";
import { TfiTrash } from "react-icons/tfi";
import Image from "next/image";
import { useRouter } from "next/router";

const ProductPage = ({ product }) => {
  const regex = /[^0-9]/g;

  const router = useRouter();

  const handleDelete = async () => {
    const deleteItem = await axios.delete(`/api/product/${product.id}`);
    router.push("/");
  };

  const moveUpdatePage = async () => {
    router.push(`/products/edit/${product.id}`);
  };

  return (
    <div className="container w-full mx-auto h-full pb-20">
      <h3 className="mt-20 ml-24">
        칵테일 정보 {">"} <span className="text-[#333]">{product.name}</span>
      </h3>
      <div className="mx-auto flex flex-row items-center pb-16 pt-5 px-24 bg-white">
        <Image
          alt={product.name}
          src={product.img}
          width="400"
          height="400"
          priority
          className="w-auto h-auto"
        />
        <div className=" w-11/12 ml-16 p-2 border-l-2 pl-14">
          <div className="">
            <h1 className="text-2xl dark:text-[#d1cbc1]">{product.name}</h1>
            <p className="text-base pt-3 text-[#71223E] dark:text-[#ff5203] ">
              {product.type}
            </p>
            <p className="text-sm pt-8 text-left dark:text-[#d1cbc1]">
              {product.description}
            </p>
          </div>
          <div className="py-10 text-center my-8">
            <ul className="w-full flex flex-row dark:text-[#d1cbc1] text-sm justify-between">
              <label
                htmlFor="sugar"
                className="mr-20 dark:text-[#d1cbc1] font-light"
              >
                ALCOHOL (도수)
              </label>
              <input
                type="range"
                id="alcohol"
                name="alcohol"
                min="0"
                max="100"
                defaultValue={Number(product.alcohol.replace(regex, ""))}
                className="smallRangeBar_light dark:bg-[#71223E] dark:border-[#d1cbc1]"
              />
              <span className="pl-5">
                {Number(product.alcohol.replace(regex, ""))} %
              </span>
            </ul>
            <ul className="w-full mt-8 flex flex-row dark:text-[#d1cbc1] text-sm justify-between">
              <label
                htmlFor="sugar"
                className="mr-12 pr-1 dark:text-[#d1cbc1] font-light"
              >
                SWEETNESS (당도)
              </label>
              <input
                type="range"
                id="sugar"
                name="sugar"
                min="0"
                max="100"
                defaultValue={Number(product.sugar.replace(regex, ""))}
                className="smallRangeBar_light dark:bg-[#71223E] dark:border-[#d1cbc1] ml-3"
              />
              <span className="pl-5">
                {Number(product.sugar.replace(regex, ""))} %
              </span>
            </ul>
            <ul className="w-full mt-8 flex flex-row dark:text-[#d1cbc1] text-sm justify-between">
              <label
                htmlFor="sourness"
                className="mr-28 dark:text-[#d1cbc1] font-light"
              >
                ACID (산미)
              </label>
              <input
                type="range"
                id="sourness"
                name="sourness"
                min="0"
                max="100"
                defaultValue={Number(product.sourness.replace(regex, ""))}
                step="10"
                className="smallRangeBar_light dark:bg-[#71223E] dark:border-[#d1cbc1]"
              />
              <span className="pl-5">
                {Number(product.sourness.replace(regex, ""))} %
              </span>
            </ul>
            <ul className="w-full mt-8 flex flex-row dark:text-[#d1cbc1] text-sm justify-between">
              <label
                htmlFor="sourness"
                className="mr-24 dark:text-[#d1cbc1] font-light"
              >
                TANNIN (쓴맛)
              </label>
              <input
                type="range"
                id="bitter"
                name="bitter"
                min="0"
                max="100"
                defaultValue={Number(product.bitter.replace(regex, ""))}
                step="10"
                className="smallRangeBar_light dark:bg-[#71223E] dark:border-[#d1cbc1]"
              ></input>
              <span className="pl-5">
                {Number(product.bitter.replace(regex, ""))} %
              </span>
            </ul>
          </div>
          <div className="w-full mx-auto text-right">
            <button
              onClick={moveUpdatePage}
              className="font-light p-2 w-1/4 rounded-full text-white bg-black border border-black hover:bg-black/80 hover:border-black/80"
            >
              수정
            </button>
            <button
              //   onClick={handleDelete}
              className="font-light p-2 ml-2 w-1/4 rounded-full text-black border border-black hover:text-orange-800"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const productPath = context.query.id;
  const res = await fetch(`http://localhost:3000/api/products/${productPath}`);
  const result = await res.json();

  if (!result.is_success) {
    return {
      notFound: true,
    };
  }
  const product = result.data[0];

  return {
    props: {
      product,
    },
  };
};

// export const getStaticPaths: GetStaticPaths = async (context) => {
//   console.log("context", context);

//   const res = await fetch("http://localhost:3000/api/products");
//   const posts = await res.json();

//   const paths = posts.data.map((post) => ({
//     params: { id: post.id },
//   }));
//   console.log("getStaticPaths", paths);

//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps = async (props) => {
//   console.log("getStaticProps", props);

//     const res = await fetch(`http://localhost:3000/api/products/${params.id}`);
//     const post = await res.json();
//   return {
//     props: {
//         post,
//     },
//   };
// };
