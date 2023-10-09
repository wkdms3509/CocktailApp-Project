import { useState } from "react";
import ProductCard2 from "./ProductCard_mobile";
const NonAlcCocktailList = ({ allProductList }) => {
    const [limit, setLimit] = useState(9);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const result = allProductList.filter((item) => item.type === "NON-ALC");
    return (<>
      <div className="w-full mx-auto my-3">
        <div className="flex flex-row justify-between lg:mx-2 xl:mx-2 mb-1 lg:mb-0">
          <span className="py-1 text-[#222] text-xl font-semibold lg:font-normal lg:text-3xl">
            Non Alcohol
          </span>
        </div>

        {/* 모바일 반응형 */}
        <div className="grid grid-flow-col grid-rows-1 auto-rows-auto mx-auto gap-x-2 overflow-x-auto ">
          {result.length > 0
            ? result.map((product) => (<ProductCard2 key={product.id} product={product}/>))
            : "no exist data"}
        </div>
      </div>
    </>);
};
export default NonAlcCocktailList;
