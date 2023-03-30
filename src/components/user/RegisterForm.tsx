import type { UserInput } from "@/src/constants/userType";
import axios from "axios";
import { useRouter } from "next/router";
import { EventHandler, useState } from "react";

const RegisterForm = () => {
  const router = useRouter();

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
        if (res.status === 200) {
          setCheckId(true);
          alert("사용 가능한 아이디입니다.");
        }
        if (res.status === 400) {
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
      await axios.post("/api/users/register", userInput).then((res) => {
        if (res.status === 200) {
          console.log("회원가입이 되었습니다.");
          router.push("/");
        }
      });
    } catch (error) {
      console.log(error);
      alert("회원가입에 실패하였습니다.");
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="rounded-2xl bg-black shadow-2xl flex w-2/3 max-w-4xl justify-center">
          <div className="py-10">
            <h2 className="text-white text-3xl font-bold mb-2">Sign up</h2>
            <form
              onSubmit={handleSubmit}
              className="mx-auto w-full flex flex-col items-center py-2"
            >
              <div className="m-4 w-60 flex flex-col items-start">
                <label
                  htmlFor="name"
                  className="mb-2 mr-4 text-sm text-[#F6F2E5]"
                >
                  Username
                </label>
                <input
                  name="name"
                  placeholder="Enter your Name"
                  className="border-b-2 p-2 text-xs w-full rounded bg-white/60 border-gray-300 outline-none dark:focus:border-orange-500 focus:border-sky-400"
                  onChange={handleChange}
                  value={userInput.name}
                  required
                ></input>
              </div>
              <div className="m-4 w-60 flex flex-col items-start">
                <label
                  htmlFor="email"
                  className="mb-2 mr-4 text-sm text-[#F6F2E5]"
                >
                  Email
                </label>
                <input
                  name="email"
                  placeholder="Enter your Email"
                  className="border-b-2 p-2 text-xs w-full rounded bg-white/60 border-gray-300 outline-none dark:focus:border-orange-500 focus:border-sky-400"
                  onChange={handleChange}
                  value={userInput.email}
                  required
                ></input>
              </div>
              <div className="m-4 w-60 flex flex-col items-start">
                <label
                  htmlFor="id"
                  className="mb-2 mr-4 text-sm text-[#F6F2E5]"
                >
                  User Id
                </label>
                <div>
                  <input
                    name="id"
                    placeholder="Enter your User Id"
                    className="border-b-2 p-2 text-xs w-44 rounded bg-white/60 border-gray-300 outline-none dark:focus:border-orange-500 focus:border-sky-400"
                    onChange={handleChange}
                    value={userInput.id}
                    required
                  ></input>
                  <button
                    type="button"
                    onClick={() => handleIdCheck(userInput.id)}
                    className="border  rounded p-1.5 py-2 text-xs ml-2 text-white hover:bg-red-600 hover:border-red-600"
                  >
                    Check
                  </button>
                </div>

                {/* {router.query.isChecked ? <p>사용가능한 아이디입니다</p> : ''} */}
              </div>
              <div className="m-4 w-60 flex flex-col items-start">
                <label
                  htmlFor="password"
                  className="mb-2 mr-4 text-sm text-[#F6F2E5]"
                >
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
              <button className="border-2 border-white text-white rounded-full px-12 mt-5 p-2 inline-block font-semibold hover:bg-white hover:text-yellow-500 ">
                sign up
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterForm;
