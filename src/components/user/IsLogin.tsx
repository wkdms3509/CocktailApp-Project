import { signIn, signOut, useSession } from "next-auth/react";

const IsLogin = () => {
  const { data: session, status } = useSession();

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
