import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function IndexPage() {
  const [effect, setEffect] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const router = useRouter();

  const [inputForm, setInputForm] = useState({
    alcohol: 50,
    sugar: 50,
    sourness: 50,
    bitter: 50,
  });

  const handleBtn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({ ...inputForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (
        !inputForm.alcohol ||
        !inputForm.sugar ||
        !inputForm.sourness ||
        !inputForm.bitter
      ) {
        console.log("모든 항목을 선택해주세요");
        return;
      }

      router.push({
        pathname: "/products/result",
        query: {
          alcohol: inputForm.alcohol,
          sugar: inputForm.sugar,
          sourness: inputForm.sourness,
          bitter: inputForm.bitter,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container w-full mx-auto text-center mb-24">
      <h1 className="pb-20 font-light text-xl md:text-2xl lg:text-3xl">
        나에게 어울리는 칵테일은 ?
      </h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="mx-auto w-5/6 flex flex-col text-center items-center"
      >
        <div className="relative h-4 w-4/5 rounded bg-black">
          <label htmlFor="alcohol" className="invisible">
            Alcohol
          </label>
          <input
            type="range"
            className="RangeBar"
            id="alcohol"
            name="alcohol"
            max={100}
            min={0}
            step="10"
            value={inputForm.alcohol}
            onChange={(e) => handleBtn(e)}
          />
          <p className="absolute left-0">Alcohol: {inputForm.alcohol} %</p>
        </div>
        <div className="relative h-4 w-4/5 rounded bg-black mt-20">
          <label htmlFor="sugar" className="invisible">
            Sugar
          </label>
          <input
            type="range"
            className="RangeBar"
            id="sugar"
            name="sugar"
            max={100}
            min={0}
            step="10"
            value={inputForm.sugar}
            onChange={(e) => handleBtn(e)}
          />
          <p className="absolute left-0">Sugar: {inputForm.sugar} %</p>
        </div>
        <div className="relative h-4 w-4/5 rounded bg-black mt-20">
          <label htmlFor="sourness" className="invisible">
            Sourness
          </label>
          <input
            type="range"
            className="RangeBar"
            id="sourness"
            name="sourness"
            max={100}
            min={0}
            step="10"
            value={inputForm.sourness}
            onChange={(e) => handleBtn(e)}
          />
          <p className="absolute left-0">Sourness: {inputForm.sourness} %</p>
        </div>
        <div className="relative h-4 w-4/5 rounded bg-black mt-20">
          <label htmlFor="bitter" className="invisible">
            Bitter
          </label>
          <input
            type="range"
            className="RangeBar"
            id="bitter"
            name="bitter"
            max={100}
            min={0}
            step="10"
            value={inputForm.bitter}
            onChange={(e) => handleBtn(e)}
          />
          <p className="absolute left-0">Bitter: {inputForm.bitter} %</p>
        </div>

        <button className="mt-28 p-3 px-8 text-sm lg:text-base rounded-full border-black border bg-white text-black md:3/5 lg:w-1/5 hover:bg-black hover:text-white duration-200">
          결과보기
        </button>
      </form>
    </div>
  );
}
