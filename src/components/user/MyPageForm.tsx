import { useSession } from "next-auth/react";
import { FaUserCircle } from "react-icons/fa";

export default function MyPageForm() {
  const { data: session, status } = useSession();

  return (
    <div className="container h-screen pt-20 mx-auto w-full">
      <h2 className="text-center mb-8 font-light text-2xl text-black">
        마이 페이지
      </h2>
      {session ? (
        <div className="text-center text-gray-400 text-sm">
          <div className="border border-gray-200 mb-8 w-4/5 rounded-lg mx-auto ">
            <ul className="py-5 px-10 sm:flex sm:justify-between sm:py-5 sm:px-10 sm:align-middle sm:items-center">
              <ul className="flex flex-col items-center sm:flex-row">
                <li className="items-center mb-4 sm:mb-0">
                  <FaUserCircle size="100" color="#ebebeb" />
                </li>
                <ul className="flex flex-col justify-center align-middle items-center mb-4 sm:mb-0 sm:pl-8">
                  <li className="pb-2 text-black w-full sm:text-left">
                    {session?.user && session.user.auth === "admin"
                      ? `${session.user?.name} (${session.user?.auth})`
                      : session.user?.name}
                  </li>
                  <li>{session.user?.email}</li>
                </ul>
              </ul>
              <li className="border-b mb-4 border-gray-200 sm:hidden"></li>
              <li className="flex flex-col justify-center align-middle items-center">
                <li className="pb-2">북마크</li>
                <li>0</li>
              </li>
            </ul>
          </div>
          <h2 className="left-0 text-left w-4/5 mx-auto text-gray-500 p-2">
            북마크
          </h2>
          <div className="border-t w-4/5 mx-auto pt-10">
            <p>북마크 내역이 없습니다.</p>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-400 text-sm">
          북마크 내역이 없습니다.
        </div>
      )}
      {/* <div className="mx-auto border border-gray-200 shadow flex flex-col text-center items-center pt-8"></div> */}
    </div>
  );
}
