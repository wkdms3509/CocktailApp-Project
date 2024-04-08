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
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { unstable_getServerSession } from "next-auth";
import type { User } from "@/src/constants/userType";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/src/reducer/user";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import wrapper, { persistor, store } from "@/src/reducer";
import { getServerSideProps } from "@/pages";
import { browserPreventEvent } from "@/src/hooks/browserPreventEvent";

export default function LoginForm2() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState<User>({
    id: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const status = await signIn("credentials", {
      redirect: false,
      username: userInput.id,
      password: userInput.password,
      callbackUrl: "/",
    });

    if (status?.ok && status.url) {
      await dispatch(login(userInput.id));
      router.push(status.url);
    }
  };

  const onAlertModalOpen = () => {
    console.log("뒤로가기 할 수 없습니다.");
    return;
  };

  const browserPreventEvent = (event: () => void) => {
    history.pushState(null, "", location.href);
    event();
  };

  const moveSignUpPage = () => {
    console.log("클릭");

    router.push("/auth/register");
  };

  useEffect(() => {
    history.pushState(null, "", location.href);
    window.addEventListener("popstate", () => {
      browserPreventEvent(onAlertModalOpen);
    });
    return () => {
      window.removeEventListener("popstate", () => {
        browserPreventEvent(onAlertModalOpen);
      });
    };
  }, []);

  return (
    <div className="login_container">
      <main className="login_main_container">
        <div className="login_main_form">
          <div className="p-5 w-full rounded-2xl shadow-2xl">
            <div className="text-left font-bold">
              <span className="text-[#71223E] ml-2 italic">Cocktail</span>
            </div>
            <div className="py-10">
              <h2 className="text-[#71223E] font-bold mb-2 text-lg md:text-2xl lg:text-2xl">
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
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="flex flex-col items-center">
                  <div className="bg-white p-2 flex border items-center mb-2 w-4/6 md:w-4/6 lg:w-64">
                    <FaRegEnvelope className="text-gray-400 mr-2" />
                    <input
                      type="text"
                      name="id"
                      placeholder="Enter your Username"
                      className="login_input"
                      required
                      value={userInput.id}
                      onChange={(e) => handleChange(e)}
                      //   {...formik.getFieldProps("username")}
                    />
                  </div>
                  <div className="bg-white p-2 flex border items-center w-4/6 md:w-4/6 lg:w-64">
                    <MdLockOutline className="text-gray-400 mr-2" />
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your Password"
                      className="login_input"
                      required
                      value={userInput.password}
                      onChange={(e) => handleChange(e)}
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
                  <div className="flex">
                    <Link href={`/auth/register`}>
                      <li className="signup_btn">Create account</li>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
