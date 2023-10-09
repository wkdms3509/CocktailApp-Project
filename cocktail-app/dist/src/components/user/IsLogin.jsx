import { logout } from "@/src/reducer/user";
import { signIn, signOut, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
const IsLogin = () => {
    const { data: session, status } = useSession();
    const dispatch = useDispatch();
    const handleLogout = () => {
        signOut();
        dispatch(logout());
    };
    if (session) {
        return (<>
        <button onClick={() => handleLogout()}>로그아웃</button>
      </>);
    }
    return (<>
      <button onClick={() => signIn()}>로그인</button>
    </>);
};
export default IsLogin;
