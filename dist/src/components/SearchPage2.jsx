import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
const SearchPage2 = () => {
    const [search, setSearch] = useState("");
    const [filteredItem, setFilteredItem] = useState([]);
    const router = useRouter();
    const itemList = useSelector((state) => state.products.products);
    const [limit, setLimit] = useState(9);
    // 현재 페이지 번호
    const [page, setPage] = useState(1);
    // 각 페이지의 첫 게시물의 위치
    const offset = (page - 1) * limit;
    useEffect(() => {
        try {
            if (search) {
                setFilteredItem(itemList
                    .map((item) => (Object.assign(Object.assign({}, item), { name: item.name.toLowerCase() })))
                    .filter((item) => item.name.includes(search)));
            }
        }
        catch (error) {
            console.log(error);
        }
    }, [search]);
    const handleSearchValue = useCallback((e) => {
        setSearch(e.target.value.toLowerCase());
    }, [search]);
    const backPage = () => {
        setSearch("");
    };
    return (<div className="w-full mx-auto text-center my-10 p-5 lg:px-32">
      <div className="w-11/12 md:w-4/6 mx-auto flex justify-center pt-2 px-4 pb-2 mb-5 gap-x-3 items-center rounded bg-gray-100 md:bg-white md:border-b-2 md:border-black">
        <BsSearch size={22}/>
        <input type="text" placeholder="ex. martini" autoFocus autoComplete="off" value={search} onChange={handleSearchValue} className="flex-1 outline-none border-none p-2 bg-gray-100 md:bg-white"/>
        {search && (<AiOutlineClose onClick={backPage} size={27} className="hover:text-gray-300 cursor-pointer"/>)}
      </div>
      {search && filteredItem.length > 0 ? (<>
          <div className="flex flex-col mt-16 w-11/12 md:w-5/6 xl:w-4/6 mx-auto">
            <p className="text-left mb-4 font-normal">
              검색결과
              <span className="font-semibold"> {`${search}`}</span>
            </p>
            {filteredItem.map((item) => (<div key={item.id} className="border-b items-center hover:bg-light-gray">
                <Link href={`/products/${item.id}`}>
                  <div key={item.id} className="text-left flex flex-row items-center h-28">
                    <Image src={item.img} alt={item.name} width="400" height="300" 
            // className="ProductCardImg"
            className="w-20 rounded items-center" priority/>
                    <ul className="flex flex-col pl-4">
                      <li className="text-xs text-dark-gray">{item.type}</li>
                      <li className="text-base font-light text-[#222]">
                        {item.name}
                      </li>
                    </ul>
                  </div>
                </Link>
              </div>))}
          </div>
          {/* <Pagination
              total={itemList.length}
              page={page}
              limit={limit}
              setPage={setPage}
            /> */}
        </>) : (<div className="my-24 text-sm text-gray-300">조회 결과 없음</div>)}
    </div>);
};
export default SearchPage2;
