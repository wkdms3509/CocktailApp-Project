import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductForm() {
  const router = useRouter();
  const [productForm, setProductForm] = useState({
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
    const getPeoduct = async (id) => {
      const { data } = await axios.get(`/api/products/${id}`);

      setProductForm(data.data[0]);
      // console.log(data.data[0])
      // console.log(cocktailForm)
      //   setCocktailForm({ name: data[0].name, description: data[0].description })
    };
    if (router.query.id) {
      getPeoduct(router.query.id);
    }
  }, []);

  const handleSubmit = async (e) => {
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

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  // 이미지 업로드
  const [image, setImage] = useState("");
  const [imageInput, setImageInput] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImageInput(file);
    const reader = new FileReader();
    reader.onload = function (e) {
      setImage(e.target.result);
    };
    fileReader.readAsDataURL(file);
  };

  // const handleImage = (e) => {
  //   setSelectedFile(e.target.files[0])
  //   console.log(selectedFile)
  // }

  return (
    <div className="container w-full mx-auto text-center py-20 mb-14 font-light">
      <h1 className="font-light text-2xl text-black dark:text-black">
        {router.query.id ? "칵테일 정보 수정" : "칵테일 생성"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-3/4 lg:w-2/4 border rounded-xl bg-black  shadow flex flex-col items-center py-8 mt-10  dark:border-[#d1cbc1] dark:bg-[#d1cbc1]"
      >
        <label htmlFor="name" className="text-white text-sm lg:text-base">
          이름
        </label>
        <input
          name="name"
          type="text"
          className="border rounded w-1/4 my-4 p-1.5 bg-white/60 border-none outline-none focus:bg-gray-50 focus:ring-1 ring-black-700"
          onChange={handleChange}
          value={productForm.name}
        ></input>
        <label htmlFor="type" className="text-white text-sm lg:text-base">
          종류
        </label>
        <input
          name="type"
          type="text"
          className="border rounded w-1/4 my-4 p-1.5 bg-white/60 border-none outline-none focus:bg-gray-50 focus:ring-1 ring-black-700"
          onChange={handleChange}
          value={productForm.type}
        ></input>
        <label htmlFor="img" className="text-white text-sm lg:text-base">
          이미지
        </label>
        <input
          name="img"
          type="text"
          className="border rounded w-1/4 my-4 p-1.5 bg-white/60 border-none outline-none focus:bg-gray-50 focus:ring-1 ring-black-700"
          onChange={handleChange}
          value={productForm.img}
        ></input>
        <label htmlFor="type" className="text-white text-sm lg:text-base">
          설명
        </label>
        <textarea
          rows="2"
          name="description"
          className="border rounded w-2/4 h-32 my-4 p-2 bg-white/60 outline-none border-none focus:bg-gray-50 focus:ring-1 ring-black-700"
          onChange={handleChange}
          value={productForm.description}
        ></textarea>

        {/* 도수 */}
        <div className="my-3">
          <label
            htmlFor="alcohol"
            className="my-3 mr-3 text-white text-sm lg:text-base"
          >
            도수
          </label>
          <select
            name="alcohol"
            value={Number(productForm.alcohol.replace(regex, ""))}
            onChange={handleChange}
            className="bg-white/60 rounded border-none outline-none focus:bg-gray-50 focus:ring-1 ring-black-700"
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
        <div className="my-3">
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
            onChange={handleChange}
            className="bg-white/60 rounded border-none outline-none focus:bg-gray-50 focus:ring-1 ring-black-700"
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
        <div className="my-3">
          <label
            htmlFor="sourness"
            className="my-3 mr-3 text-white dark:text-black"
          >
            산미
          </label>
          <select
            name="sourness"
            value={Number(productForm.sourness.replace(regex, ""))}
            onChange={handleChange}
            className="bg-white/60 rounded border-none outline-none focus:bg-gray-50 focus:ring-1 ring-black-700"
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
        <div className="my-3">
          <label
            htmlFor="bitter"
            className="my-3 mr-3 text-white dark:text-black"
          >
            쓴맛
          </label>
          <select
            name="bitter"
            value={Number(productForm.bitter.replace(regex, ""))}
            onChange={handleChange}
            className="bg-white/60 rounded border-none outline-none focus:bg-gray-50 focus:ring-1 ring-black-700"
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
