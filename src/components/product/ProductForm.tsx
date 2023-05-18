import { GetProductListResult } from "@/src/constants/apiTypes";
import { NewProductInputType, Product } from "@/src/constants/productTypes";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function ProductForm() {
  const router = useRouter();
  const [productForm, setProductForm] = useState<NewProductInputType>({
    name: "",
    type: "",
    description: "",
    alcohol: "0",
    sugar: "0",
    sourness: "0",
    bitter: "0",
    img: "",
  });

  const regex = /[^0-9]/g;

  useEffect(() => {
    const getProduct = async (id: string) => {
      try {
        const result = await axios.get(`/api/products/${id}`);
        const resData: GetProductListResult = result.data;

        const productInfo: NewProductInputType = resData.data[0];

        setProductForm(productInfo);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (router.query.id && typeof router.query.id === "string") {
      getProduct(router.query.id);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (router.query.id) {
        await axios.patch(`/api/products/${router.query.id}`, productForm);
        router.push(`/products/${router.query.id}`);
      } else {
        await axios.post("/api/products", productForm);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="container w-full mx-auto text-center py-20 mb-14 font-light">
      <h1 className="font-light text-2xl text-black dark:text-black">
        {router.query.id ? "칵테일 정보 수정" : "칵테일 생성"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-3/4 lg:w-3/5 xl:w-2/4 border rounded-xl bg-black shadow flex flex-col items-center py-8 mt-10"
      >
        <label htmlFor="name" className="text-white text-sm lg:text-base">
          이름
        </label>
        <input
          name="name"
          type="text"
          className="border rounded w-2/4 md:w-1/4 lg:w-1/4 xl:w-1/4 my-4 p-1.5 bg-white/60 border-none outline-none focus:bg-gray-50 focus:ring-1 ring-black-700"
          onChange={handleChange}
          value={productForm.name}
        ></input>
        <label htmlFor="type" className="text-white text-sm lg:text-base">
          종류
        </label>
        <input
          name="type"
          type="text"
          className="border rounded w-2/4 md:w-1/4 lg:w-1/4 xl:w-1/4 my-4 p-1.5 bg-white/60 border-none outline-none focus:bg-gray-50 focus:ring-1 ring-black-700"
          onChange={handleChange}
          value={productForm.type}
        ></input>
        <label htmlFor="img" className="text-white text-sm lg:text-base">
          이미지
        </label>
        <input
          name="img"
          type="text"
          className="border rounded w-2/4 md:w-1/4 lg:w-1/4 xl:w-1/4 my-4 p-1.5 bg-white/60 border-none outline-none focus:bg-gray-50 focus:ring-1 ring-black-700"
          onChange={handleChange}
          value={productForm.img}
        ></input>
        <label htmlFor="type" className="text-white text-sm lg:text-base">
          설명
        </label>
        <textarea
          rows={2}
          name="description"
          className="border rounded w-2/4 h-32 my-4 p-2 bg-white/60 outline-none border-none focus:bg-gray-50 focus:ring-1 ring-black-700"
          onChange={handleChangeTextarea}
          value={productForm.description}
        ></textarea>

        {/* 도수 */}
        <div className="my-3 w-3/4">
          <label
            htmlFor="alcohol"
            className="my-3 mr-3 text-white text-sm lg:text-base"
          >
            도수
          </label>
          <select
            name="alcohol"
            value={Number(productForm.alcohol.replace(regex, ""))}
            onChange={handleChangeSelect}
            className="bg-white/60 w-2/4 md:w-1/4 lg:w-1/4 xl:w-1/4 text-center rounded border-none outline-none focus:bg-gray-50 focus:ring-1 ring-black-700"
          >
            <option value="0">0</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="60">60</option>
            <option value="70">70</option>
            <option value="80">80</option>
            <option value="90">90</option>
            <option value="100">100</option>
          </select>
        </div>

        {/* 당도 */}
        <div className="my-3 w-3/4">
          <label
            htmlFor="sugar"
            className="my-3 mr-3 text-white dark:text-black"
          >
            당도
          </label>
          {/* <input type="text" value={cocktailForm.sugar}  /> */}
          <select
            name="sugar"
            value={Number(productForm.sugar.replace(regex, ""))}
            onChange={handleChangeSelect}
            className="bg-white/60 w-2/4 md:w-1/4 lg:w-1/4 xl:w-1/4 text-center rounded border-none outline-none focus:bg-gray-50 focus:ring-1 ring-black-700"
          >
            <option value="0">0</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="60">60</option>
            <option value="70">70</option>
            <option value="80">80</option>
            <option value="90">90</option>
            <option value="100">100</option>
          </select>
        </div>

        {/* 산미 */}
        <div className="my-3 w-3/4">
          <label
            htmlFor="sourness"
            className="my-3 mr-3 text-white dark:text-black"
          >
            산미
          </label>
          <select
            name="sourness"
            value={Number(productForm.sourness.replace(regex, ""))}
            onChange={handleChangeSelect}
            className="bg-white/60 w-2/4 md:w-1/4 lg:w-1/4 xl:w-1/4 text-center rounded border-none outline-none focus:bg-gray-50 focus:ring-1 ring-black-700"
          >
            <option value="0">0</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="60">60</option>
            <option value="70">70</option>
            <option value="80">80</option>
            <option value="90">90</option>
            <option value="100">100</option>
          </select>
        </div>

        {/* 쓴맛 */}
        <div className="my-3 w-3/4">
          <label
            htmlFor="bitter"
            className="my-3 mr-3 text-white dark:text-black"
          >
            쓴맛
          </label>
          <select
            name="bitter"
            value={Number(productForm.bitter.replace(regex, ""))}
            onChange={handleChangeSelect}
            className="bg-white/60 w-2/4 md:w-1/4 lg:w-1/4 xl:w-1/4 text-center rounded border-none outline-none focus:bg-gray-50 focus:ring-1 ring-black-700"
          >
            <option value="0">0</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="60">60</option>
            <option value="70">70</option>
            <option value="80">80</option>
            <option value="90">90</option>
            <option value="100">100</option>
          </select>
        </div>
        <button className="px-6 py-1.5 mt-12 border rounded-full hover:bg-white hover:text-black duration-200 hover:bg-[#d1cbc1] text-white">
          {router.query.id ? "수정" : "생성"}
        </button>
      </form>
    </div>
  );
}

// 이미지 업로드
// const [image, setImage] = useState("");
// const [imageInput, setImageInput] = useState("");

// const handleImage = (e) => {
//   const file = e.target.files[0];
//   setImageInput(file);
//   const reader = new FileReader();
//   reader.onload = function (e) {
//     setImage(e.target.result);
//   };
//   fileReader.readAsDataURL(file);
// };

// const handleImage = (e) => {
//   setSelectedFile(e.target.files[0])
//   console.log(selectedFile)
// }
