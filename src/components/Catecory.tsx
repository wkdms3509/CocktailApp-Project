import Image from "next/image";
import styles from "../styles/Home.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import axios from "axios";
import { AllCocktailListProps, Category } from "../constants/productTypes";

const Catecory = ({ allProductList }: AllCocktailListProps) => {
  const type: Category = {
    gin: "gin",
    non_alc: "non-alc",
    vodka: "vodka",
    rum: "RUM",
    whiskey: "WHISKY",
  };

  return (
    <div className="mt-10 md:mt-20 lg:mt-20 xl:mt-20 lg:w-full">
      <ul className="flex flex-row lg:mx-28 justify-between text-center items-center">
        <Link href={`/category/${type.gin}`} className="banner_item">
          <li>GIN</li>
        </Link>
        <Link href={`category/${type.non_alc}`} className="banner_item">
          <li>NON-ALCOL</li>
        </Link>
        <Link href={`category/${type.vodka}`} className="banner_item">
          <li>VODKA</li>
        </Link>
        <Link href={`category/${type.rum}`} className="banner_item">
          <li>RUM</li>
        </Link>
        <Link href={`category/${type.whiskey}`} className="banner_item">
          <li>WHISKY</li>
        </Link>
      </ul>
    </div>
  );
};

export default Catecory;
