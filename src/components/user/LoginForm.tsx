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
import { useState } from "react";
import axios from "axios";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { unstable_getServerSession } from "next-auth";
import type { User } from "@/src/constants/userType";
import { useDispatch } from "react-redux";
import { login } from "@/src/reducer/user";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import wrapper, { persistor, store } from "@/src/reducer";
import { getServerSideProps } from "@/pages";

const LoginForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState<User>({
    id: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const status = await signIn("credentials", {
      redirect: false,
      username: userInput.id,
      password: userInput.password,
      callbackUrl: "/",
    });

    if (status.ok) {
      // store.dispatch(login(userInput.id));

      // dispatch(login(userInput.id));
      // console.log("로그인 디스패치 실행");

      router.push(status.url);
    }
  };

  return (
    <div className="login_container">
      <main className="login_main_container">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col max-w-4xl w-80 md:w-5/6 md:flex-row lg:w-2/3 lg:flex-row">
          <div className="p-5 md:w-3/5 lg:w-3/5">
            <div className="text-left font-bold">
              <span className="text-[#71223E] ml-2 italic">Cocktail</span>
            </div>
            <div className="py-10">
              <h2 className="text-[#71223E] font-bold mb-2 text-lg md:text-2xl lg:text-3xl">
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
              <p className="text-gray-400 my-3 text-xs lg:text-sm">
                or use your account
              </p>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 p-2 flex items-center mb-2 w-4/6 md:w-4/6 lg:w-64">
                    <FaRegEnvelope className="text-gray-400 mr-2" />
                    <input
                      type="text"
                      name="id"
                      placeholder="Enter your Username"
                      className="login_input"
                      required
                      value={userInput.id}
                      onChange={handleChange}
                      //   {...formik.getFieldProps("username")}
                    />
                  </div>
                  <div className="bg-gray-100 p-2 flex items-center w-4/6 md:w-4/6 lg:w-64">
                    <MdLockOutline className="text-gray-400 mr-2" />
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your Password"
                      className="login_input"
                      required
                      value={userInput.password}
                      onChange={handleChange}
                      //   {...formik.getFieldProps("password")}
                    />
                  </div>
                  <div className="flex flex-col justify-between items-center mb-5 mt-2 text-gray-400 w-4/6 md:w-4/6 md:flex-row md:justify-between lg:w-64 lg:flex-row lg:justify-between">
                    <label className="hidden items-center text-xs py-2 md:flex md:py-0 lg:flex lg:py-0">
                      <input type="checkbox" name="remember" className="mr-1" />
                      Remember me
                    </label>
                    <a className="text-xs">Forgot Password?</a>
                  </div>
                  <button className="login_signin_btn" type="submit">
                    Sign in
                  </button>
                  <Link href="/auth/register">
                    <span className="login_signup_btn_one">Sign up</span>
                  </Link>
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
            <h2 className="font-bold mb-2 text-lg md:text-2xl lg:text-3xl">
              Welcome !
            </h2>
            <div className="border-2 border-white w-10 inline-block m-4"></div>
            <p className="mb-6 text-sm md:text-base lg:text-base">
              Don`t have an account?
            </p>
            <Link href="/auth/register">
              <span className="login_signup_btn_two">Sign up</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

// export async const getServerSiseProps = (context: GetServerSidePropsContext) => {
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context)
//     }
//   }
// }

// export const getServerSideProp = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     const storeInfo = store.getState()
//     console.log("storeInfo", storeInfo);

//     return {
//       props: {
//         selectUser,
//       },
//     };
//   }
// );

export default LoginForm;
