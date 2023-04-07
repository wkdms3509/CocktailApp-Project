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
import wrapper from "@/src/reducer";
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
      id: userInput.id,
      password: userInput.password,
      callbackUrl: "/",
    });

    if (status.ok) {
      // dispatch(login(userInput.id));
      // console.log("로그인 디스패치 실행");

      router.push(status.url);
    }
  };

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
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-2">
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
                  <div className="bg-gray-100 w-64 p-2 flex items-center">
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
            <Link href="/register" className="">
              <span className="login_signup_btn">Sign up</span>
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

// export const getServerSideProps: GetServerSideProps =
//   wrapper.getServerSideProps(async ({ store }) => {
//     // const res = await axios.get();
//     console.log("loginform", store);

//     return {
//       props: {
//         selectUser,
//       },
//     };
//   });

export default LoginForm;
