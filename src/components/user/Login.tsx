import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGoogle,
  FaRegEnvelope,
} from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
import Image from "next/image";

const Login = () => {
  return (
    <div className="login_container">
      <main className="login_main_container">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-[#71223E] ml-2 italic">Cocktail</span>
            </div>
            <div className="py-10">
              <h2 className="text-[#71223E] text-3xl font-bold mb-2">
                Sign in to Account
              </h2>
              <div className="border-2 border-[#71223E] w-10 inline-block m-4"></div>
              <div className="flex justify-center my-2">
                <button className="login_sns">
                  <FaFacebookF className="login_sns_icon" />
                </button>
                <button className="login_sns">
                  <FaGoogle className="login_sns_icon" />
                </button>
                <button className="login_sns">
                  <FaLinkedinIn className="login_sns_icon" />
                </button>
              </div>
              <p className="text-gray-400 my-3">or use your account</p>
              <form>
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-2">
                    <FaRegEnvelope className="text-gray-400 mr-2" />
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter your Username"
                      className="login_input"
                      required
                      //   {...formik.getFieldProps("username")}
                    />
                  </div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center">
                    <MdLockOutline className="text-gray-400 mr-2" />
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your Password"
                      className="login_input"
                      required
                      //   {...formik.getFieldProps("password")}
                    />
                  </div>
                  <div className="flex justify-between w-64 mb-5 mt-2 text-gray-400">
                    <label className="flex items-center text-xs">
                      <input type="checkbox" name="remember" className="mr-1" />
                      Remember me
                    </label>
                    <a className="text-xs">Forgot Password?</a>
                  </div>
                  <button className="login_signin_btn" type="submit">
                    Sign in
                  </button>
                  <div className="flex">
                    <button
                      className="mt-3 text-black px-4 py-1 pt-3 border-b-2 inline-block text-xs hover:text-[#ff5203] hover:border-b-[#ff5203]"
                      type="submit"
                    >
                      Start as a Non-Member
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="login_signup_form">
            <h2 className="text-3xl font-bold mb-2">Welcome !</h2>
            <div className="border-2 border-white w-10 inline-block m-4"></div>
            <p className="mb-6">Don`t have an account?</p>
            <Link href="/signin" className="">
              <span className="login_signup_btn">Sign up</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
