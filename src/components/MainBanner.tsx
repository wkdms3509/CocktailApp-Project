import Image from "next/image";
import styles from "../../styles/home.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="w-full">
      <Slider {...settings} className="">
        <div>
          <div className="main_img1"></div>
        </div>
        <div>
          <div className="main_img1"></div>
        </div>
        <div>
          <div className="main_img1"></div>
        </div>
      </Slider>
    </div>
  );
};

export default MainBanner;
