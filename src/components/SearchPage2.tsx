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

const SearchPage2 = () => {
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
    <div className="w-full mx-auto text-center my-10 p-5 lg:px-32">
      <div className="w-4/6 mx-auto flex justify-center pt-5 pb-3 mb-5 gap-x-3 items-center border-b-2 border-black">
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
        {search && (
          <AiOutlineClose
            onClick={backPage}
            size={30}
            className="hover:text-gray-300 cursor-pointer"
          />
        )}
      </div>
      {search && filteredItem.length > 0 ? (
        <>
          <div className="flex flex-col mt-16 w-11/12 md:w-5/6 xl:w-4/6 mx-auto">
            <p className="text-left mb-4 font-normal">
              검색결과
              <span className="font-semibold"> {`${search}`}</span>
            </p>
            {filteredItem.map((item) => (
              <div
                key={item.id}
                className="border-b items-center hover:bg-light-gray"
              >
                <Link href={`/products/${item.id}`}>
                  <div
                    key={item.id}
                    className="text-left flex flex-row items-center h-28"
                  >
                    <Image
                      src={item.img}
                      alt={item.name}
                      width="400"
                      height="300"
                      // className="ProductCardImg"
                      className="w-20 rounded items-center"
                      priority
                    />
                    <p className="flex flex-col pl-4">
                      <h3 className="text-xs text-dark-gray">{item.type}</h3>
                      <h2 className="text-base font-light text-[#222]">
                        {item.name}
                      </h2>
                    </p>
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

export default SearchPage2;
