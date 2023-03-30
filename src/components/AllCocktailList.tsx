import Link from "next/link";
import { useState } from "react";
import type { AllCocktailListProps, Product } from "../constants/productTypes";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

const AllCocktailList = (props: AllCocktailListProps) => {
  const { allProductList } = props;
  const [limit, setLimit] = useState<number>(9);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  return (
    <>
      <div className="w-full mx-auto my-3">
        <div className="flex flex-row justify-between">
          <span className="py-1 text-[#222] text-3xl">All</span>
          <Link
            href="/"
            className="px-10 py-3 border border-black text-black hover:text-white hover:bg-black"
          >
            Shop Now
          </Link>
        </div>
        <div className="ml-3 mb-3">
          <label className="text-sm w-1/5 text-gray-400">
            페이지 당 표시할 게시물 수:&nbsp;
            <select
              type="number"
              value={limit}
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
        <div className="flex flex-row flex-wrap w-full mx-auto justify-around">
          {allProductList.length > 0
            ? allProductList
                .slice(offset, offset + limit)
                .map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))
            : "no exist data"}
        </div>

        <div className="bg-green-300"></div>
        {/* <div>
          <Pagination
            total={allProductList.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </div> */}
      </div>
    </>
  );
};

export default AllCocktailList;
