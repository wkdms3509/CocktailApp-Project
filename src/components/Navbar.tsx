import { FaUserCircle, FaUserAlt } from "react-icons/fa";
import { FiSearch, FiEdit2 } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";

const Navbar = () => {
  return (
    <>
      <header className="nav">
        <div className="main_category">
          <div className="text-3xl pt-1 italic font-bold">COCKTAIL</div>
          <ul className="main_category_right">
            <li className="category_right_menu">HOME</li>
            <li className="category_right_menu">RECOMMAND</li>
            <li className="category_right_menu">NEW</li>
            <li className="category_right_menu">MY</li>
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
