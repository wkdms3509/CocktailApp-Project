import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";
import type { AllCocktailListProps, Product } from "../constants/productTypes";
import wrapper from "../reducer";
import Pagination from "./Pagination";
import ProductCard from "./product/ProductCard";
import ProductCard2 from "./product/ProductCard2";

const AllCocktailList = ({ allProductList }: AllCocktailListProps) => {
  const [limit, setLimit] = useState<number>(9);
  const [page, setPage] = useState<number>(1);
  const offset = (page - 1) * limit;

  return (
    <>
      <div className="w-full mx-auto my-3">
        <div className="flex flex-row justify-between mx-2 mb-1 lg:mb-0">
          <span className="py-1 text-[#222] text-xl font-semibold lg:font-normal lg:text-3xl">
            All
          </span>
          <Link
            href="/"
            className="hidden px-10 py-3 border border-black text-black hover:text-white hover:bg-black lg:inline-block"
          >
            Shop Now
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
            >
              <option value="9">9</option>
              <option value="18">18</option>
              <option value="27">27</option>
              <option value="36">36</option>
              <option value="45">45</option>
            </select>
          </label>
        </div>

        {/* pc */}
        <div className="hidden overflow-x-auto lg:flex lg:flex-wrap  mx-auto justify-around gap-x-2 lg:gap-x-0">
          {allProductList.length > 0
            ? allProductList
                .slice(offset, offset + limit)
                .map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))
            : "no exist data"}
        </div>

        {/* 모바일 반응형 */}
        <div className="grid grid-flow-col grid-rows-1 auto-rows-auto mx-auto gap-x-2 overflow-x-auto lg:hidden xl:hidden">
          {allProductList.length > 0
            ? allProductList.map((product: Product) => (
                <ProductCard2 key={product.id} product={product} />
              ))
            : "no exist data"}
        </div>

        {/* <div className="bg-green-300"></div> */}
        {/* <Pagination
          items={allProductList.length} // 상품 개수
          currentPage={currentPage} // 1
          pageSize={pageSize} // 10
          onPageChange={onPageChange}
          limitPageCount={5}
        /> */}

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
