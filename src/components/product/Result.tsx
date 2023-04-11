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
      light: [
        "당도가 거의 없는 술의 맛을 느끼고 싶은 날",
        "술은 술 맛이 나야지",
      ],
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
    <div className="w-3/5 mx-auto text-center mt-36 mb-20">
      <h1 className="pb-16 pt-8 text-3xl font-light">
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
          <div className="flex content-center justify-center w-4/5 mx-auto">
            <p className="border rounded font-light w-56 pt-6 px-4 mx-6 border-black">
              도수 : {result.alcohol} %
            </p>
            <p className="border rounded font-light w-48 p-6 px-4 mx-6 border-black ">
              당도 : {result.sugar} %
            </p>
            <p className="border rounded font-light w-48 p-6 px-4 mx-6 border-black ">
              산미 : {result.sourness} %
            </p>
            <p className="border rounded font-light w-48 p-6 px-4 mx-6 border-black">
              쓴맛 : {result.bitter} %
            </p>
          </div>
          <div className="mt-20">
            <p className="w-2/5 mx-auto p-3 px-14 font-light rounded-full border-black border bg-black text-white hover:bg-black/80 duration-200">
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
