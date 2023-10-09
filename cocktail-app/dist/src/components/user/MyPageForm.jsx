var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import { RootState } from "@/src/reducer/test";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
// import { useSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
export default function MyPageForm() {
    var _a, _b, _c, _d;
    const { data: session, status } = useSession();
    const productList = useSelector((state) => state.products.products);
    const [itemList, setItemList] = useState([]);
    const getBookmarkList = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios("/api/products/bookmark/get-bookmark");
            setItemList(response.data.items);
        }
        catch (error) {
            console.log(error);
        }
    });
    const filteredList = productList.filter((item) => itemList.includes(item.id.toString()));
    useEffect(() => {
        getBookmarkList();
    }, []);
    useEffect(() => {
        getBookmarkList();
    }, [itemList]);
    return (<div className="container py-20 mx-auto w-full">
      <h2 className="text-center mb-8 font-light text-2xl text-black">
        마이 페이지
      </h2>
      {session ? (<div className="text-center text-gray-400 text-sm">
          <div className="border border-gray-200 mb-8 w-4/5 rounded-lg mx-auto">
            <ul className="py-5 px-10 sm:flex sm:justify-between sm:py-5 sm:px-10 sm:align-middle sm:items-center">
              <ul className="flex flex-col items-center sm:flex-row">
                <li className="items-center mb-4 sm:mb-0">
                  <FaUserCircle size="100" color="#ebebeb"/>
                </li>
                <ul className="flex flex-col justify-center align-middle items-center sm:mb-0 sm:pl-8">
                  <li className="pb-2 text-black w-full sm:text-left">
                    {(session === null || session === void 0 ? void 0 : session.user) && session.user.auth === "admin"
                ? `${(_a = session.user) === null || _a === void 0 ? void 0 : _a.name} (${(_b = session.user) === null || _b === void 0 ? void 0 : _b.auth})`
                : (_c = session.user) === null || _c === void 0 ? void 0 : _c.name}
                  </li>
                  <li>{(_d = session.user) === null || _d === void 0 ? void 0 : _d.email}</li>
                </ul>
              </ul>
              <li className="border-b mb-4 border-gray-200 hidden sm:block"></li>
              <ul className="flex-col justify-center align-middle items-center hidden sm:flex">
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
          <div className="flex flex-row w-4/5 flex-wrap gap-x-3 mx-auto pl-1.5 sm:pl-0.5 lg:pl-5 xl:pl-3.5">
            {filteredList.length > 0 ? (filteredList.map((item) => (<div key={item.id} className="">
                  <Link key={item.id} href={`/products/${item.id}`} className="scale-100">
                    <Image src={String(item.img)} alt={(item === null || item === void 0 ? void 0 : item.name) || ""} width="400" height="300" className="w-36 h-48 sm:w-62 sm:h-72 lg:h-80 lg:w-63 xl:w-60 mx-auto object-cover scale-100 hover:scale-105 duration-300" priority/>
                    <ul className="text-left py-2 mb-4">
                      <li className="text-xs font-bold text-black">
                        {item.type}
                      </li>
                      <li className=" text-sm sm:text-base text-black">
                        {item.name}
                      </li>
                    </ul>
                  </Link>
                </div>))) : (<div className="border-t w-4/5 mx-auto pt-10">
                <p>북마크 내역이 없습니다.</p>
              </div>)}
          </div>
        </div>) : (<div className="text-center text-gray-400 text-sm">
          북마크 내역이 없습니다.
        </div>)}
    </div>);
}
