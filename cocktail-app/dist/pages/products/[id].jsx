var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";
import { useEffect, useState } from "react";
const ProductPage = ({ product }) => {
    const regex = /[^0-9]/g;
    const router = useRouter();
    const { data: session, status } = useSession();
    const [itemList, setItemList] = useState(null);
    const handleDelete = () => __awaiter(void 0, void 0, void 0, function* () {
        yield axios.delete(`/api/products/${product.id}`);
        router.push("/");
    });
    const moveUpdatePage = () => __awaiter(void 0, void 0, void 0, function* () {
        router.push(`/products/edit/${product.id}`);
    });
    const getBookmarkList = () => __awaiter(void 0, void 0, void 0, function* () {
        if ((session === null || session === void 0 ? void 0 : session.user) === null) {
            return;
        }
        const response = yield axios("/api/products/bookmark/get-bookmark");
        // console.log(response);
        setItemList(response.data.items);
    });
    const isBookmarked = itemList != null && product.id != null
        ? itemList.includes(String(product.id))
        : false;
    const handleBookmarkBtn = () => __awaiter(void 0, void 0, void 0, function* () {
        if ((session === null || session === void 0 ? void 0 : session.user) === null) {
            alert("로그인 후 이용해주세요.");
            router.push("/auth/login");
            return;
        }
        const result = yield axios.post("/api/products/bookmark/update-bookmark", {
            item_Id: product.id,
        });
        if (result.status === 200) {
            setItemList((prevItemList) => {
                if (Array.isArray(prevItemList)) {
                    if (prevItemList && prevItemList.includes(String(product.id))) {
                        return prevItemList.filter((itemId) => itemId !== String(product.id));
                    }
                    else {
                        return [...prevItemList, String(product.id)];
                    }
                }
                return prevItemList;
            });
        }
    });
    useEffect(() => {
        if (itemList === null) {
            getBookmarkList();
        }
    }, [itemList]);
    return (<>
      {product != null ? (<div className="container w-full mx-auto h-full sm:pb-20">
          <h3 className="mb-1 md:mb-10 lg:mb-0 xl:mb-0 w-11/12 mx-auto text-gray-400">
            {/* <h3 className="ml-5 mb-1 md:ml-12 md:mb-10 lg:mb-0 lg:ml-20 xl:mb-0 xl:ml-24 bg-yellow-100 w-11/12 items-center"> */}
            칵테일 정보 {">"}{" "}
            <span className="text-[#333]">{product.name}</span>
          </h3>
          <div className="mx-auto w-full gap-x-8 flex flex-col lg:flex-row items-center pb-16 pt-5 px-5 md:px-10 lg:px-20 xl:px-24">
            <Image alt={product.name} src={product.img} width="400" height="400" priority className="md:w-80 xl:w-90" style={{ width: "auto", height: "auto" }}/>
            <div className="p-2 mt-10 lg:mt-0 xl:mt-0 lg:pl-10 xl:pl-10 lg:border-l-2 xl:border-l-2 w-full">
              <div className="flex flex-col">
                <ul className="flex justify-between items-center ">
                  <li className="text-2xl dark:text-[#d1cbc1]">
                    {product.name}
                  </li>
                  <li onClick={handleBookmarkBtn} className="pt-6">
                    {isBookmarked ? (<BsBookmarkCheckFill size={25}/>) : (<BsBookmark size={25}/>)}
                    <br />
                  </li>
                </ul>
                <p className="text-base pt-3 text-[#71223E] dark:text-[#ff5203] ">
                  {product.type}
                </p>
                <p className="text-sm pt-8 text-left dark:text-[#d1cbc1]">
                  {product.description}
                </p>
              </div>
              <div className="py-10 px-2 text-center my-8 ">
                <ul className="w-full flex flex-row text-sm justify-between items-center">
                  <label htmlFor="sugar" className="font-light text-left w-40 text-xs mr-5 lg:text-sm xl:text-sm">
                    ALCOHOL (도수)
                  </label>
                  <input type="range" id="alcohol" name="alcohol" min="0" max="100" defaultValue={Number(product.alcohol.replace(regex, ""))} className="smallRangeBar_light"/>
                  <span className="w-16 text-right">
                    {Number(product.alcohol.replace(regex, ""))} %
                  </span>
                </ul>
                <ul className="w-full mt-8 flex flex-row text-sm justify-between items-center">
                  <label htmlFor="sugar" className="font-light text-left w-40 text-xs mr-5 lg:text-sm xl:text-sm">
                    SWEETNESS (당도)
                  </label>
                  <input type="range" id="sugar" name="sugar" min="0" max="100" defaultValue={Number(product.sugar.replace(regex, ""))} className="smallRangeBar_light"/>
                  <span className="w-16 text-right">
                    {Number(product.sugar.replace(regex, ""))} %
                  </span>
                </ul>
                <ul className="w-full mt-8 flex flex-row text-sm justify-between items-center">
                  <label htmlFor="sourness" className="font-light text-left w-40 text-xs mr-5 lg:text-sm xl:text-sm">
                    ACID (산미)
                  </label>
                  <input type="range" id="sourness" name="sourness" min="0" max="100" defaultValue={Number(product.sourness.replace(regex, ""))} step="10" className="smallRangeBar_light"/>
                  <span className="w-16 text-right">
                    {Number(product.sourness.replace(regex, ""))} %
                  </span>
                </ul>
                <ul className="w-full mt-8 flex flex-row text-sm justify-between items-center">
                  <label htmlFor="sourness" className="font-light text-left w-40 text-xs mr-5 lg:text-sm xl:text-sm">
                    TANNIN (쓴맛)
                  </label>
                  <input type="range" id="bitter" name="bitter" min="0" max="100" defaultValue={Number(product.bitter.replace(regex, ""))} step="10" className="smallRangeBar_light dark:bg-[#71223E] dark:border-[#d1cbc1]"></input>
                  <span className="w-16 text-right">
                    {Number(product.bitter.replace(regex, ""))} %
                  </span>
                </ul>
              </div>
              {(session === null || session === void 0 ? void 0 : session.user) && session.user.auth === "admin" ? (<div className="w-full mx-auto text-right">
                  <button onClick={moveUpdatePage} className="font-light p-2 w-1/4 rounded-full text-white bg-black border border-black hover:bg-black/80 hover:border-black/80">
                    수정
                  </button>
                  <button onClick={handleDelete} className="font-light p-2 ml-2 w-1/4 rounded-full text-black border border-black hover:text-orange-800">
                    삭제
                  </button>
                </div>) : ("")}
            </div>
          </div>
        </div>) : (<div>아이템을 조회하지 못했습니다.</div>)}
    </>);
};
export default ProductPage;
export const getServerSideProps = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const productPath = context.query.id;
    const res = yield fetch(`http://localhost:3000/api/products/${productPath}`);
    const result = yield res.json();
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
});
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
