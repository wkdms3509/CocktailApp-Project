import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { BsSearch, BsFillEraserFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Product } from "../constants/apiQueryTypes";
import { RootState } from "@/src/reducer";
import Pagination from "./Pagination";

const SearchPage = () => {
  const [search, setSearch] = useState<string>("");
  const [filteredItem, setFilteredItem] = useState<Product[]>([]);
  const router = useRouter();
  const itemList = useSelector<RootState, Product[]>(
    (state) => state.products.products
  );

  const [limit, setLimit] = useState(9);
  // 현재 페이지 번호
  const [page, setPage] = useState(1);
  // 각 페이지의 첫 게시물의 위치
  const offset = (page - 1) * limit;

  useEffect(() => {
    try {
      if (search) {
        setFilteredItem(
          itemList
            .map((item) => ({
              ...item,
              name: item.name.toLowerCase(),
            }))
            .filter((item) => item.name.includes(search))
        );
      }
      //   console.log(filteredItem);
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  const handleSearchValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value.toLowerCase());
    },
    [search]
  );

  const backPage = () => {
    setSearch("");
  };

  return (
    <div className="x-full mx-auto text-center my-10 p-5 lg:px-32">
      <div className="w-3/5 mx-auto flex justify-center pt-5 pb-3 mb-5 gap-x-3 items-center border-b-2 border-black">
        <BsSearch size={22} />
        <input
          type="text"
          placeholder="ex. martini"
          autoFocus
          autoComplete="off"
          value={search}
          onChange={handleSearchValue}
          className="flex-1 outline-none border-none p-2"
        />
        {search && <AiOutlineClose onClick={backPage} size={30} />}
      </div>
      {search && filteredItem.length > 0 ? (
        <>
          <div className="overflow-x-auto mx-auto mt-20 justify-around gap-x-2 flex flex-wrap lg:gap-x-0">
            {filteredItem.map((item) => (
              <div
                key={item.id}
                className="flex md:flex-auto px-2 pb-12 lg:w-1/3 bg-blue-600"
              >
                <Link href={`/products/${item.id}`}>
                  <div key={item.id} className="text-left">
                    <Image
                      src={item.img}
                      alt={item.name}
                      width="400"
                      height="300"
                      // className="ProductCardImg"
                      className="scale-100 object-cover hover:scale-105 duration-300 w-80"
                      priority
                    />
                    <h3 className="text-xs font-bold text-[#222] pt-3">
                      {item.type}
                    </h3>
                    <h2 className="text-base text-[#222]">{item.name}</h2>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {/* <Pagination
            total={itemList.length}
            page={page}
            limit={limit}
            setPage={setPage}
          /> */}
        </>
      ) : (
        <div className="my-24">데이터 없음</div>
      )}
    </div>
  );
};

export default SearchPage;
