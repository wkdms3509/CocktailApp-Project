import Image from "next/image";
// import styles from "../../styles/home.module.css";
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
          <div className="main_img1">
            <Image
              src="https://cdn.shopify.com/s/files/1/0603/4895/6804/files/Homepage_8R_Static_DK_cb3a85f3-0d80-44fc-960d-8a46bf6eb772.jpg?v=1677780733&width=1600"
              priority
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "70vh" }}
              alt="배너1"
            />
          </div>
        </div>
        <div>
          <div className="main_img1">
            <Image
              src="https://drink818.com/cdn/shop/files/Our_Story_Hero_DK.jpg?width=1600"
              priority
              width={0}
              height={0}
              sizes="100vw, 80vh"
              style={{ width: "100%", height: "70vh" }}
              alt="배너2"
            />
          </div>
        </div>
        <div>
          <div className="main_img1">
            <Image
              src="https://drink818.com/cdn/shop/files/Sustainability_Hero_DK.jpg?v=1678148135&width=2800"
              priority
              width={0}
              height={0}
              sizes="100vw, 80vh"
              style={{ width: "100%", height: "70vh" }}
              alt="배너3"
            />
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default MainBanner;
