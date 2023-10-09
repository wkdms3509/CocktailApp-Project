import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineFacebook,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer_container relative bottom-0">
      <h3 className="text-white text-lg py-12 pb-10">Cocktail</h3>
      <ul className="footer_menu">
        <li className="mx-3">Home</li>
        <li className="mx-3">Recommand</li>
        <li className="mx-3">New</li>
      </ul>
      <div className="mt-16 mb-5">
        <div className="text-white text-xl md:text-2xl lg:text-3xl">
          Subscribe to our newsletter
        </div>
        <input
          className="w-1/4 mb-8 mt-5 outline-none p-2 md:p-3 lg:p-3 text-sm md:text-base lg:text-base xl:text-base"
          placeholder="Your email address .."
          name="이메일 입력란"
        />
        <button className="text-white ml-3 border border-white p-2 md:p-3 lg:p-3 text-sm md:text-base lg:text-base xl:text-base">
          Subscribe
        </button>
      </div>
      <div className="sns_icons">
        <ul>
          <AiOutlineInstagram color="#fff" size="22" />
        </ul>
        <ul>
          <AiOutlineFacebook color="#fff" size="22" />
        </ul>
        <ul>
          <AiOutlineTwitter color="#fff" size="22" />
        </ul>
      </div>
      <div className="border-t my-10 border-solid"></div>
      <div className=" text-gray-500 text-sm">
        © 2023 Cocktail Shop. Powered by Cocktail Site.
      </div>
    </div>
  );
};

export default Footer;
