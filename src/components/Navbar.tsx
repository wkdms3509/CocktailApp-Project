import { FaUserCircle, FaUserAlt } from "react-icons/fa";
import { FiSearch, FiEdit2 } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import { useSession } from "next-auth/react";
import IsLogin from "./user/IsLogin";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <>
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
            <li className="category_right_menu">RECOMMAND</li>
            <li className="category_right_menu">NEW</li>
            {status === "authenticated" ? (
              <li className="category_right_menu">MY</li>
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
            <li className="pr-3 text-blue-500">Today`s Cocktail</li>
            <li className="sub_category_menu">GIN</li>
            <li className="sub_category_menu">NON-ALCOL</li>
            <li className="sub_category_menu">VODKA</li>
            <li className="sub_category_menu">RUM</li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;
