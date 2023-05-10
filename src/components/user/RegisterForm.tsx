import type { UserInput } from "@/src/constants/userType";
import { register } from "@/src/reducer/user";
import axios from "axios";
import { useRouter } from "next/router";
import { EventHandler, useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineCheck } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import Link from "next/link";

const RegisterForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [userInput, setUserInput] = useState<UserInput>({
    name: "",
    email: "",
    id: "",
    password: "",
  });

  const [checkId, setCheckId] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleIdCheck = async (id: string) => {
    try {
      await axios.get("/api/users/register", { params: { id } }).then((res) => {
        if (res.status === 200 && userInput.id) {
          setCheckId(true);
          alert("사용 가능한 아이디입니다.");
        }
        if (res.status === 400 || !userInput.id) {
          setCheckId(false);
          alert("아이디를 다시 확인해주세요.");
        }
      });
    } catch (error) {
      alert("아이디를 다시 확인해주세요.");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!checkId) {
        return alert("아이디 중복체크를 해주세요.");
      }
      // if (!userInput.email || !userInput.password || !userInput.name) {
      //   return alert("")
      // }
      await axios.post("/api/users/register", userInput).then((res) => {
        if (res.status === 200) {
          console.log("회원가입이 되었습니다.");
          dispatch(register("회원가입이 되었습니다."));
          router.push("/");
        }
      });
    } catch (error) {
      console.log(error);
      alert("회원가입에 실패하였습니다.");
    }
  };

  return (
    <div className="register_container">
      <main className="register_main_container">
        <div className="register_main_form">
          <div className="py-10">
            <Link href="/">
              <BiArrowBack
                className="text-white md:-ml-28 lg:-ml-52 mb-6"
                size="20"
              />
            </Link>
            <h2 className="text-white font-bold mb-2 text-lg md:text-2xl lg:text-3xl">
              Sign up
            </h2>
            <form
              onSubmit={handleSubmit}
              className="mx-auto w-full flex flex-col items-center py-2"
            >
              <div className="m-4 flex flex-col items-start w-48 md:w-52 lg:w-60">
                <label htmlFor="name" className="label_name">
                  Username
                </label>
                <input
                  name="name"
                  placeholder="Enter your Name"
                  className="register_input"
                  onChange={handleChange}
                  value={userInput.name}
                  required
                ></input>
              </div>
              <div className="m-4 flex flex-col items-start w-48 md:w-52 lg:w-60">
                <label htmlFor="email" className="label_name">
                  Email
                </label>
                <input
                  name="email"
                  placeholder="Enter your Email"
                  className="register_input"
                  onChange={handleChange}
                  value={userInput.email}
                  required
                ></input>
              </div>
              <div className="m-4 flex flex-col items-start w-48 md:w-52 lg:w-60">
                <label htmlFor="id" className="label_name">
                  User Id
                </label>
                <div className="flex w-full">
                  <input
                    name="id"
                    placeholder="Enter your User Id"
                    className="register_input flex-1"
                    onChange={handleChange} // w-44
                    value={userInput.id}
                    required
                  ></input>
                  <button
                    type="button"
                    onClick={() => handleIdCheck(userInput.id)}
                    className="flex-0.5 w-1/5 border rounded p-1.5 py-2 text-xs ml-2 text-white hover:border-gray-500 hover:text-gray-500 duration-100"
                  >
                    {checkId ? (
                      <AiOutlineCheck className="mx-auto" />
                    ) : (
                      <BsCheckLg className="mx-auto" size="15" />
                    )}
                  </button>
                </div>

                {/* {router.query.isChecked ? <p>사용가능한 아이디입니다</p> : ''} */}
              </div>
              <div className="m-4 flex flex-col items-start w-48 md:w-52 lg:w-60">
                <label htmlFor="password" className="label_name">
                  Password
                </label>
                <input
                  name="password"
                  placeholder="Enter your Password"
                  className="border-b-2 w-full p-2 text-xs rounded bg-white/60 border-gray-300 outline-none dark:focus:border-orange-500 focus:border-sky-400"
                  onChange={handleChange}
                  value={userInput.password}
                  type="password"
                  required
                ></input>
              </div>
              {userInput.email &&
              userInput.id &&
              userInput.name &&
              userInput.password &&
              checkId ? (
                <button className="border-2 border-white items-center text-white rounded-full px-12 mt-5 p-2 inline-block font-semibold hover:bg-white hover:text-black duration-150 ">
                  sign up
                </button>
              ) : (
                <button className="border-2 text-gray-500 items-center border-gray-500 rounded-full px-12 mt-5 p-2 inline-block font-semibold cursor-default duration-150 ">
                  sign up
                </button>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterForm;
