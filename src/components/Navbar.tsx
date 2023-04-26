import { FaUserCircle, FaUserAlt } from "react-icons/fa";
import { FiSearch, FiEdit2 } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import { useSession } from "next-auth/react";
import IsLogin from "./user/IsLogin";

const Navbar = () => {
  const { data: session, status } = useSession();

  const type = {
    gin: "gin",
    non_alc: "non-alc",
    vodka: "vodka",
    rum: "RUM",
  };

  return (
    <>
      {status === "authenticated" ? (
        <header className="nav">
          <div>
            <ul className="side_category">
              <li className="side_category_menu">관심상품</li>
              <li className="side_category_menu">
                <IsLogin />
              </li>
            </ul>
          </div>
          <div className="main_category">
            <div className="text-3xl pt-1 italic font-bold">
              <Link href="/">COCKTAIL</Link>
            </div>
            <ul className="main_category_right">
              <Link href="/">
                <li className="category_right_menu">HOME</li>
              </Link>
              <Link href="/products/recommend">
                <li className="category_right_menu">RECOMMAND</li>
              </Link>
              <Link href="/products/new">
                <li className="category_right_menu">NEW</li>
              </Link>
              {status === "authenticated" ? (
                <Link href="/auth/mypage">
                  <li className="category_right_menu">MY</li>
                </Link>
              ) : (
                ""
              )}
              <li className="category_right_menu">
                <BsSearch size="22" />
              </li>
            </ul>
          </div>
          <div>
            <ul className="sub_category">
              <Link href="/products/today">
                <li className="pr-3 text-blue-500">Today`s Cocktail</li>
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
