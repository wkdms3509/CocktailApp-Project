import Image from "next/image";
import styles from "../styles/Home.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import axios from "axios";

const Catecory = ({ allProductList }) => {
  const type = {
    gin: "gin",
    non_alc: "non-alc",
    vodka: "vodka",
    rum: "RUM",
    whiskey: "WHISKY",
  };

  return (
    <div className="w-full mt-20">
      <ul className="flex flex-row px-28 justify-between text-center">
        {/* <Link href={`/category/${type.gin}`}> */}
        <li className="border border-black rounded-md flex-1 m-1 py-8 text-2xl cursor-pointer bg-black text-white hover:bg-black/80">
          GIN
        </li>
        {/* </Link> */}
        {/* <Link href={`category/${type.non_alc}`}> */}
        <li className="border border-black rounded-md flex-1 m-1 py-8 text-2xl cursor-pointer bg-black text-white hover:bg-black/80">
          NON-ALCOL
        </li>
        {/* </Link> */}
        {/* <Link href={`category/${type.vodka}`}> */}
        <li className="border border-black rounded-md flex-1 m-1 py-8 text-2xl cursor-pointer bg-black text-white hover:bg-black/80">
          VODKA
        </li>
        {/* </Link> */}
        {/* <Link href={`category/${type.rum}`}> */}
        <li className="border border-black rounded-md flex-1 m-1 py-8 text-2xl cursor-pointer bg-black text-white hover:bg-black/80">
          RUM
        </li>
        {/* </Link> */}
        {/* <Link href={`category/${type.whiskey}`}> */}
        <li className="border border-black rounded-md flex-1 m-1 py-8 text-2xl cursor-pointer bg-black text-white hover:bg-black/80">
          WHISKY
        </li>
        {/* </Link> */}
      </ul>
    </div>
  );
};

export default Catecory;
