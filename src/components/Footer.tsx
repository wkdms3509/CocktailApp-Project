import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineFacebook,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer_container">
      <h3 className="text-white text-lg py-12 pb-10">Cocktail</h3>
      <ul className="footer_menu">
        <li>Home</li>
        <li>Recommand</li>
        <li>New</li>
      </ul>
      <div className="mt-16 mb-5">
        <div className="text-white text-3xl">Subscribe to our newsletter</div>
        <input
          className="w-1/4 mb-8 mt-5 p-3 outline-none"
          placeholder="Your email address .."
        />
        <button className="text-white ml-3 border border-white p-3">
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
        © 2023 Plant Shop. Powered by Cocktail Site.
      </div>
    </div>
  );
};

export default Footer;
