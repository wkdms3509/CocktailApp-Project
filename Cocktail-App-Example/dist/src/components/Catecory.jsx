import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
const Catecory = () => {
    const type = {
        gin: "gin",
        non_alc: "non-alc",
        vodka: "vodka",
        rum: "RUM",
        whiskey: "WHISKY",
    };
    return (<div className="mt-10 md:mt-20 lg:mt-20 xl:mt-20 lg:w-full">
      <ul className="flex flex-row gap-x-2 md:mx-6 justify-between">
        <Link href={`/category/${type.gin}`} className="banner_item">
          <li>GIN</li>
        </Link>
        <Link href={`category/${type.non_alc}`} className="banner_item">
          <li>NON ALCOL</li>
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
    </div>);
};
export default Catecory;
