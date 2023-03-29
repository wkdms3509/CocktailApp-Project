import { signIn, signOut, useSession } from "next-auth/react";

const IsLogin = () => {
  //   const [session, loading] = useSession();
  const { data: session, status } = useSession();
  // console.log("IsLogin", session);

  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>로그아웃</button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()}>로그인</button>
    </>
  );
};

export default IsLogin;
