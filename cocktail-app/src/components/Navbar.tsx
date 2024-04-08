import { FaUserCircle, FaUserAlt, FaCocktail } from "react-icons/fa";
import { FiSearch, FiEdit2 } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import IsLogin from "./user/IsLogin";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import Image from "next/image";

function hasUserAuth(obj: any): obj is { user: { auth: string } } {
  return obj?.user?.auth !== undefined && typeof obj.user.auth === "string";
}

const Navbar = () => {
  const { data: session, status } = useSession();
  const [toggle, setToggle] = useState<boolean>(false);
  const side = useRef();
  const [appToggle, setAppToggle] = useState(false);

  const type = {
    gin: "gin",
    non_alc: "non-alc",
    vodka: "vodka",
    rum: "RUM",
  };

  const isUserAuthenticated =
    hasUserAuth(session) && session.user.auth === "admin";

  const handleSideBtnClick = () => {
    setToggle(!toggle);
  };

  const handleClickMenu = () => {
    setToggle(false);
  };

  // 모바일 상단 앱 배너
  const handleCloseAppToggle = () => {
    setAppToggle(true);
  };

  return (
    <>
      <header>
        {/* <div className="md:hidden bg-light-gray m-0 w-full h-16 px-4 py-3.5"> */}
        <div
          className={classNames(
            "app_banner_top",
            appToggle ? "app_banner_top_close" : "app_banner_top"
          )}
        >
          <ul className="flex justify-between items-center align-middle">
            <li className="flex items-center">
              <span className="w-9 border border-black rounded-lg px-2.5 py-2 bg-black text-white items-center text-xxs">
                <FaCocktail size={17} className="items-center" />
              </span>
              <p className="text-xs font-normal text-black/80 pl-2">
                나의 칵테일 취향을 알아볼 수 있는 플랫폼 <br />앱 설치 후
                사용해보세요
              </p>
            </li>
            <li className="items-center">
              <IoCloseOutline
                size={30}
                className="items-center font-extralight text-gray-300 cursor-pointer"
                onClick={() => handleCloseAppToggle()}
              />
            </li>
          </ul>
        </div>
        <nav className="nav z-20">
          <div className="hidden lg:block">
            {session?.user && isUserAuthenticated ? (
              <ul className="side_category">
                <li className="side_category_menu text-blue-700">
                  {session.user.auth}
                </li>
                <li className="side_category_menu border-r border-black hover:text-gray-300 duration-300 cursor-pointer">
                  <Link href="/auth/mypage">관심상품</Link>
                </li>
                <li
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="side_category_menu hover:text-gray-300 duration-300 cursor-pointer"
                >
                  로그아웃
                </li>
              </ul>
            ) : (
              <ul className="side_category">
                <li className="side_category_menu border-r text-gray-300 border-black cursor-default">
                  관심상품
                </li>
                <li className="side_category_menu hover:text-gray-300 duration-300 cursor-pointer">
                  <Link href="/auth/login">로그인</Link>
                </li>
              </ul>
            )}
          </div>
          <div className="main_category">
            <div className="flex items-center justify-between z-30">
              <div className="site_name">
                <Link href="/">COCKTAIL</Link>
              </div>
              <div className="lg:hidden flex items-center">
                {/* <li className="category_right_menu hidden lg:list-item"> */}
                <Link href="/products/search">
                  <BsSearch size={20} className="mr-3" title="검색" />
                  {/* <HeaderSearch /> */}
                </Link>
                {/* </li> */}
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
                ["opacity-100 top-26"]: toggle,
              })}
            >
              <Link href="/">
                <li
                  className="category_right_menu font-bold"
                  onClick={handleClickMenu}
                >
                  HOME
                </li>
              </Link>
              <Link href="/products/recommend">
                <li
                  className="category_right_menu font-normal"
                  onClick={handleClickMenu}
                >
                  RECOMMAND
                </li>
              </Link>
              {isUserAuthenticated ? (
                <Link href="/products/new">
                  <li
                    className="category_right_menu font-normal"
                    onClick={handleClickMenu}
                  >
                    NEW
                  </li>
                </Link>
              ) : (
                ""
              )}
              {status === "authenticated" ? (
                <Link href="/auth/mypage">
                  <li
                    className="category_right_menu font-normal"
                    onClick={handleClickMenu}
                  >
                    MY
                  </li>
                </Link>
              ) : (
                ""
              )}
              <li className="category_right_menu hidden lg:list-item">
                <Link href="/products/search">
                  <BsSearch size="22" />
                  {/* <HeaderSearch /> */}
                </Link>
              </li>

              {session ? (
                <li
                  className="category_right_menu lg:hidden"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  LOGOUT
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
          <div>
            {/* focus:bg-gray-50 focus:ring-1 ring-black-700 */}
            <ul className="sub_category gap-x-3">
              <Link href="/products/today" className="nav_category_menu_link">
                <li className="nav_category_menu">
                  <span>Today`s Cocktail</span>
                  <span className="absolute -bottom-1 left-0 w-0 transition-all h-1 bg-blue-500"></span>
                </li>
              </Link>
              <Link href={`/category`} className="nav_category_menu_link">
                <li className="sub_category_menu one active text-sm md:text-base lg:text-base xl:text-base">
                  <span>ALL</span>
                  <span className="absolute -bottom-1 left-0 w-0 transition-all h-1 bg-blue-500"></span>
                </li>
              </Link>
              <Link
                href={`/category/${type.gin}`}
                className="nav_category_menu_link"
              >
                <li className="sub_category_menu one active text-sm md:text-base lg:text-base xl:text-base">
                  <span>GIN</span>
                  <span className="absolute -bottom-1 left-0 w-0 transition-all h-1 bg-blue-500"></span>
                </li>
              </Link>
              <Link
                href={`/category/${type.non_alc}`}
                className="nav_category_menu_link"
              >
                <li className="sub_category_menu one active text-sm md:text-base lg:text-base xl:text-base">
                  <span>NON-ALCOL</span>
                  <span className="absolute -bottom-1 left-0 w-0 transition-all h-1 bg-blue-500"></span>
                </li>
              </Link>
              <Link
                href={`/category/${type.vodka}`}
                className="nav_category_menu_link"
              >
                <li className="sub_category_menu one text-sm md:text-base lg:text-base xl:text-base">
                  <span>VODKA</span>
                  <span className="absolute -bottom-1 left-0 w-0 transition-all h-1 bg-blue-500"></span>
                </li>
              </Link>
              <Link
                href={`/category/${type.rum}`}
                className="nav_category_menu_link"
              >
                <li className="sub_category_menu one text-sm md:text-base lg:text-base xl:text-base">
                  <span>RUM</span>
                  <span className="absolute -bottom-1 left-0 w-0 transition-all h-1 bg-blue-500"></span>
                </li>
              </Link>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
