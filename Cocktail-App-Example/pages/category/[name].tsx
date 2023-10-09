import Pagination from "@/src/components/CategoryPagination";
import { RootState2 } from "@/src/reducer";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function CategoryItemList() {
  const router = useRouter();
  const allProductList = useSelector(
    (state: RootState2) => state.products.products
  );

  let category: string = "";
  if (typeof router.query.name === "string") {
    category = router.query.name.toUpperCase();
  }

  const filteredProducts = allProductList.filter(
    (item) => item.type === category
  );

  // 페이지 당 표시할 게시물 수
  const [limit, setLimit] = useState(9);
  // 현재 페이지 번호
  const [page, setPage] = useState(1);
  // 각 페이지의 첫 게시물의 위치
  const offset = (page - 1) * limit;

  // 아아템 개수 90개
  // 페이지 당 9개
  // 10개 페이지 필요
  // 각 페이지의 첫 게시물의 위치 (1-1)*9 = 0, (2-1)*9 = 9

  return (
    <div className="w-full py-12 text-center">
      <h2 className="pb-16 pt-4 font-semibold">{category}</h2>
      <div className="w-full px-5 md:px-0 lg:px-0 xl:px-0 md:w-4/5 lg:w-4/5 xl:w-4/5 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 mx-auto text-center">
        {filteredProducts.slice(offset, offset + limit).map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div className="py-3" key={product.id}>
              <Image
                src={product.img}
                alt={product.name}
                width="380"
                height="450"
                className="h-64 md:h-100 lg:h-96 xl:h-100 w-full object-cover hover:scale-105 duration-300"
                priority
              />
              <div className="text-xs font-extrabold mt-3">{product.type}</div>
              <div className="text-base text-[#4d4f48] pt-1">
                {product.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination
        total={filteredProducts.length}
        page={page}
        limit={limit}
        setPage={setPage}
      />
    </div>
  );
}
