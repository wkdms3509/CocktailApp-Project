import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { AllCocktailListProps, Product } from "../constants/productTypes";
import wrapper from "../reducer";
import Pagination from "./Pagination";
import ProductCard from "./product/ProductCard_pc";
import ProductCard2 from "./product/ProductCard_mobile";

const AllCocktailList = ({ allProductList }: AllCocktailListProps) => {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const offset = (page - 1) * limit;

  const [slicedProductList, setSlicedProductList] = useState([]);

  useEffect(() => {
    setSlicedProductList(allProductList.slice(0, 15));
  }, [allProductList]);

  return (
    <>
      <div className="w-full mx-auto my-3">
        <div className="flex flex-row justify-between lg:mx-2 xl:mx-2 mb-1 lg:mb-0">
          <span className="py-1 text-[#222] text-xl font-semibold lg:font-normal lg:text-3xl">
            All
          </span>
          <Link
            href="/category"
            className="hidden px-10 py-3 border border-black text-black hover:text-white hover:bg-black lg:inline-block duration-500"
          >
            Shop Now
          </Link>
          <Link
            href="/category"
            className="text-xs py-2 text-black hover:text-gray-400 lg:hidden"
          >
            더보기
          </Link>
        </div>
        <div className="ml-2 mb-3 hidden lg:block">
          <label className="text-sm w-1/5 text-gray-400">
            페이지 당 표시할 게시물 수:&nbsp;
            <select
              // type="number"
              value={limit.toString()}
              onChange={({ target: { value } }) => setLimit(Number(value))}
              className="bg-transparent"
              name="아이템 노출 개수"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </label>
        </div>

        {/* pc */}
        <div className="hidden overflow-x-auto lg:flex lg:flex-wrap mx-auto justify-around gap-x-2 lg:gap-x-3">
          {allProductList.length > 0
            ? allProductList
                .slice(offset, offset + limit) // 10, 20 //
                .map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))
            : "no exist data"}
        </div>

        {/* 모바일 반응형 */}
        <div className="grid grid-flow-col grid-rows-1 auto-rows-auto mx-auto gap-x-2 overflow-x-auto lg:hidden xl:hidden">
          {slicedProductList.length > 0
            ? slicedProductList.map((product: Product) => (
                <ProductCard2 key={product.id} product={product} />
              ))
            : "no exist data"}
        </div>

        <div className="hidden lg:block xl:block">
          <Pagination
            total={allProductList.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </>
  );
};

export default AllCocktailList;
