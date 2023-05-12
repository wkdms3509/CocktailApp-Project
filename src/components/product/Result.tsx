import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Result({ productList }) {
  const router = useRouter();
  const userInput = router.query;
  const regex = /[^0-9]/g;

  const checkedProductListNull = productList.map((item) => {
    if (
      item.alcohol === null ||
      item.sugar === null ||
      item.sourness === null ||
      item.bitter === null
    ) {
      return "";
    }

    const newItem = {
      ...item,
      alcohol: Number(item.alcohol.replace(regex, "")),
      sugar: Number(item.sugar.replace(regex, "")),
      sourness: Number(item.sourness.replace(regex, "")),
      bitter: Number(item.bitter.replace(regex, "")),
    };
    return newItem;
  });

  const getRandomProduct = (productList) => {
    return productList[Math.floor(Math.random() * productList.length)];
  };

  const filterdProductList = checkedProductListNull.filter((item) => {
    if (
      item.alcohol <= Number(userInput.alcohol) &&
      item.sugar <= Number(userInput.sugar) &&
      item.sourness <= Number(userInput.sourness) &&
      item.bitter <= Number(userInput.bitter)
    ) {
      return item;
    }
  });

  const result = getRandomProduct(filterdProductList);

  const checkType = (sweetness) => {
    const TYPE = {
      light: ["당도가 거의 없는 술의 맛을 느끼고 싶은 날", ""],
      middle: [
        "적당한 달달함으로 기분 내고 싶은 날",
        "힘든 하루를 끝내고 한 잔으로 마무리하고 싶은 날",
      ],
      high: ["술이지만 음료수 같은 달달함이 맛보고 싶은 날"],
    };

    if (sweetness <= 30) {
      return getRandomProduct(TYPE.light);
    } else if (sweetness <= 60) {
      return getRandomProduct(TYPE.middle);
    } else if (sweetness <= 100) {
      return getRandomProduct(TYPE.high);
    }
  };

  return (
    <div className="w-4/5 md:w-4/5 lg:w-3/5 mx-auto text-center mt-16 mb-20">
      <h1 className="pb-16 pt-8 font-light text-xl md:text-2xl lg:text-3xl">
        나에게 어울리는 칵테일은 ?
      </h1>
      {result ? (
        <div>
          <Image
            alt={result.name}
            src={`${result.img}`}
            width="200"
            height="150"
            className="mx-auto w-auto h-auto"
          />
          <div className="pt-7">
            {result.sugar ? (
              <p className="pb-5 w-2/4 text-base underline-offset-8 italic font-light underline decoration-dotted mx-auto text-black">
                {checkType(result.sugar)}
              </p>
            ) : (
              ""
            )}
          </div>
          <p className="my-8 text-xl">{result.name}</p>
          <p className="mb-8 font-light">{result.description}</p>
          <div className="flex-col justify-center w-full md:flex-row md:flex lg:flex">
            <ul className="my-5 md:flex-1 md:mx-3 lg:flex-1 lg:mx-3">
              <li className="text-sm mb-3 lg:text-base">도수</li>
              <li className="border-2 rounded font-light text-sm py-5 mx-14 md:mx-0 lg:mx-0 lg:text-base border-black">
                <p className="w-24 mx-auto font-bold md:text-base lg:text-lg">
                  {result.alcohol} %
                </p>
              </li>
            </ul>
            <ul className="my-5 md:flex-1 md:mx-3 lg:flex-1 lg:mx-3">
              <li className="text-sm mb-3 lg:text-base">당도</li>
              <li className="border-2 rounded font-light text-sm py-5 mx-14 md:mx-0 lg:mx-0 lg:text-base border-black">
                <p className="w-20 mx-auto font-bold md:text-base lg:text-lg">
                  {result.sugar} %
                </p>
              </li>
            </ul>
            <ul className="my-5 md:flex-1 md:mx-3 lg:flex-1 lg:mx-3">
              <li className="text-sm mb-3 lg:text-base">산미</li>
              <li className="border-2 rounded font-light text-sm py-5 mx-14 md:mx-0 lg:mx-0 lg:text-base border-black">
                <p className="w-24 mx-auto font-bold md:text-base lg:text-lg">
                  {result.sourness} %
                </p>
              </li>
            </ul>
            <ul className="my-5 md:flex-1 md:mx-3 lg:flex-1 lg:mx-3">
              <li className="text-sm mb-3 lg:text-base">쓴맛</li>
              <li className="border-2 rounded font-light text-sm py-5 mx-14 md:mx-0 lg:mx-0 lg:text-base border-black">
                <p className="w-24 mx-auto font-bold md:text-base lg:text-lg">
                  {result.bitter} %
                </p>
              </li>
            </ul>
          </div>
          {/* <div className="flex flex-1 justify-center mx-auto w-full bg-red-600">
            <ul className="flex flex-col flex-1 items-center">
              <li className="text-sm lg:text-base mb-3">도수</li>
              <li className="border rounded font-light text-sm lg:text-base lg:w-32 px-10 py-6 mx-5 border-black">
                <p className="bg-yellow-500 w-24">{result.alcohol} %</p>
              </li>
            </ul>
            <ul className="flex flex-col flex-1 items-center">
              <li className="text-sm lg:text-base mb-3">당도</li>
              <li className="border rounded font-light text-sm lg:text-base lg:w-32 px-10 py-6 mx-5 border-black">
                <p className="bg-yellow-500 w-20">{result.sugar} %</p>
              </li>
            </ul>
            <ul className="flex flex-col flex-1 items-center">
              <li className="text-sm lg:text-base mb-3">산미</li>
              <li className="border rounded font-light text-sm lg:text-base lg:w-32 px-10 py-6 mx-5 border-black">
                <p className="bg-yellow-500 w-24">{result.sourness} %</p>
              </li>
            </ul>
            <ul className="flex flex-col flex-1 items-center">
              <li className="text-sm lg:text-base mb-3">쓴맛</li>
              <li className="border rounded font-light text-sm lg:text-base lg:w-32 px-10 py-6 mx-5 border-black">
                <p className="bg-yellow-500 w-24">{result.bitter} %</p>
              </li>
            </ul>
          </div> */}
          <div className="mt-20">
            <p className="w-60  lg:w-2/5  mx-auto p-3 px-14 font-light rounded-full border-black border bg-black text-white hover:bg-black/80 duration-200">
              <Link href="/">메인페이지로 이동</Link>
            </p>
          </div>
        </div>
      ) : (
        <div className="h-screen">나에게 맞는 칵테일을 찾지 못했어요</div>
      )}
    </div>
  );
}
