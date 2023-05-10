import { FaUserCircle, FaUserAlt } from "react-icons/fa";
import { FiSearch, FiEdit2 } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import IsLogin from "./user/IsLogin";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";
import classNames from "classnames";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [toggle, setToggle] = useState(false);
  const side = useRef();

  const type = {
    gin: "gin",
    non_alc: "non-alc",
    vodka: "vodka",
    rum: "RUM",
  };

  const handleSideBtnClick = () => {
    setToggle(!toggle);
  };

  const handleClickMenu = () => {
    setToggle(false);
  };

  return (
    <>
      {status === "authenticated" ? (
        <header className="nav z-20 bg-white">
          <div className="hidden lg:block">
            <ul className="side_category">
              <li className="side_category_menu">관심상품</li>
              <li className="side_category_menu">
                <IsLogin />
              </li>
            </ul>
          </div>
          <div className="main_category">
            <div className="flex items-center justify-between z-30">
              <div className="text-3xl pt-1 italic font-bold">
                <Link href="/">COCKTAIL</Link>
              </div>
              <div className="lg:hidden">
                {toggle ? (
                  <AiOutlineClose
                    size={25}
                    onClick={handleSideBtnClick}
                    className="cursor-pointer hover:text-gray-400"
                  />
                ) : (
                  <AiOutlineMenu
                    size={25}
                    onClick={handleSideBtnClick}
                    className="cursor-pointer hover:text-gray-400"
                  />
                )}
              </div>
            </div>
            {/* 반응형 */}
            <ul
              className={classNames("main_category_right_one", {
                ["opacity-100 top-20"]: toggle,
              })}
            >
              <Link href="/">
                <li className="category_right_menu" onClick={handleClickMenu}>
                  HOME
                </li>
              </Link>
              <Link href="/products/recommend">
                <li className="category_right_menu" onClick={handleClickMenu}>
                  RECOMMAND
                </li>
              </Link>
              <Link href="/products/new">
                <li className="category_right_menu" onClick={handleClickMenu}>
                  NEW
                </li>
              </Link>
              {status === "authenticated" ? (
                <Link href="/auth/mypage">
                  <li className="category_right_menu" onClick={handleClickMenu}>
                    MY
                  </li>
                </Link>
              ) : (
                ""
              )}
              <li className="category_right_menu hidden lg:list-item">
                <BsSearch size="22" />
              </li>
            </ul>
          </div>
          <div>
            <ul className="sub_category">
              <Link href="/products/today">
                <li className="pr-3 text-blue-500 hover:underline">
                  Today`s Cocktail
                </li>
              </Link>
              <Link href={`/category/${type.gin}`}>
                <li className="sub_category_menu">GIN</li>
              </Link>
              <Link href={`/category/${type.non_alc}`}>
                <li className="sub_category_menu">NON-ALCOL</li>
              </Link>
              <Link href={`/category/${type.vodka}`}>
                <li className="sub_category_menu">VODKA</li>
              </Link>
              <Link href={`/category/${type.rum}`}>
                <li className="sub_category_menu">RUM</li>
              </Link>
            </ul>
          </div>
        </header>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
