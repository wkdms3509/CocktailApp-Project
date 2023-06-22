import { Product } from "@/src/constants/apiQueryTypes";
import { RootState } from "@/src/reducer/test";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
// import { useSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export default function MyPageForm() {
  const { data: session, status } = useSession();
  const productList = useSelector(
    (state: RootState) => state.products.products
  );

  const [itemList, setItemList] = useState<string[]>([]);

  const getBookmarkList = async () => {
    const response = await axios("/api/products/bookmark/get-bookmark");
    setItemList(response.data.items);
  };
  const filteredList = productList.filter((item) =>
    itemList.includes(item.id.toString())
  );

  useEffect(() => {
    getBookmarkList();
  }, [itemList]);

  return (
    <div className="container py-20 mx-auto w-full">
      <h2 className="text-center mb-8 font-light text-2xl text-black">
        마이 페이지
      </h2>
      {session ? (
        <div className="text-center text-gray-400 text-sm">
          <div className="border border-gray-200 mb-8 w-4/5 rounded-lg mx-auto">
            <ul className="py-5 px-10 sm:flex sm:justify-between sm:py-5 sm:px-10 sm:align-middle sm:items-center">
              <ul className="flex flex-col items-center sm:flex-row">
                <li className="items-center mb-4 sm:mb-0">
                  <FaUserCircle size="100" color="#ebebeb" />
                </li>
                <ul className="flex flex-col justify-center align-middle items-center mb-4 sm:mb-0 sm:pl-8">
                  <li className="pb-2 text-black w-full sm:text-left">
                    {session?.user && session.user.auth === "admin"
                      ? `${session.user?.name} (${session.user?.auth})`
                      : session.user?.name}
                  </li>
                  <li>{session.user?.email}</li>
                </ul>
              </ul>
              <li className="border-b mb-4 border-gray-200 sm:hidden"></li>
              <ul className="flex flex-col justify-center align-middle items-center">
                <li className="pb-2">북마크</li>
                <li>{itemList.length}</li>
              </ul>
            </ul>
          </div>
          <div className="text-left text-base mb-2 w-4/5 mx-auto p-3.5">
            <h2 className="text-left text-base w-full mx-auto text-gray-500">
              {`북마크 내역 (${itemList.length})`}
            </h2>
          </div>
          <div className="flex flex-row flex-wrap w-4/5 mx-auto gap-x-3 items-center px-3.5">
            {filteredList.length > 0 ? (
              filteredList.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.id}`}
                  className="scale-100"
                >
                  <div className="w-60 pb-10 text-left">
                    <Image
                      src={String(item.img)}
                      alt={item?.name || ""}
                      width="400"
                      height="300"
                      className="w-60 mx-auto object-cover scale-100 hover:scale-105 duration-300"
                      priority
                    />
                    <h3 className="text-xs font-bold text-black pt-3">
                      {item.type}
                    </h3>
                    <h2 className="text-base text-black">{item.name}</h2>
                  </div>
                </Link>
              ))
            ) : (
              <div className="border-t w-4/5 mx-auto pt-10">
                <p>북마크 내역이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-400 text-sm">
          북마크 내역이 없습니다.
        </div>
      )}
      {/* <div className="mx-auto border border-gray-200 shadow flex flex-col text-center items-center pt-8"></div> */}
    </div>
  );
}
