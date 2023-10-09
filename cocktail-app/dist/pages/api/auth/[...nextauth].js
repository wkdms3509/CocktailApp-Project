var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// type ExtendedUserType = User & { username?: string; uid?: string };
const cookies = {
    sessionToken: {
        name: `next-auth.session-token`,
        options: {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            domain: process.env.NEXT_PUBLIC_DOMAIN,
            secure: true,
        },
    },
    callbackUrl: {
        name: `next-auth.callback-url`,
        options: {
        // ...​
        },
    },
    csrfToken: {
        name: "next-auth.csrf-token",
        options: {
            httpOnly: true,
            secure: true,
            path: "/",
            // ...​
        },
    },
};
// const fetchUserInfo = async (
//   path: string,
//   params: RequestUserData
// ): Promise<UserResponseData | null> => {
//   try {
//     const { status, data }: AxiosResponse<UserResponseData> = await axios.post(
//       path,
//       params
//     );
//     return status === 200 ? data : null;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };
function fetchUserInfo(path, params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (params !== null &&
                typeof params === "object" &&
                "username" in params &&
                "password" in params) {
                const { status, data } = yield axios.post(path, params);
                return status === 200 && data ? data : null;
            }
            return null;
        }
        catch (error) {
            console.log("에러", error);
            return null;
        }
    });
}
function isUser(user) {
    return user && "id" in user && "auth" in user;
}
export const authOptions = {
    cookies: cookies,
    session: {
        strategy: "jwt",
        maxAge: 30 * 60,
        updateAge: 24 * 60 * 60,
    },
    jwt: {
        secret: process.env.SECRET,
        maxAge: 5 * 60,
    },
    providers: [
        CredentialsProvider({
            name: "User-Id",
            type: "credentials",
            credentials: {
                username: { label: "Id", type: "text", placeholder: "id" },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "password",
                },
            },
            // 로그인 유효성 검사 (로그인 인증)
            authorize(credentials, req) {
                var _a, _b, _c, _d;
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const { username, password } = credentials;
                        if (!username || !password) {
                            throw new Error("Missing username or password");
                        }
                        const userResult = yield fetchUserInfo("http://localhost:3000/api/users/login", { username, password });
                        if (!userResult || !userResult.data) {
                            return null;
                        }
                        const { data: user } = userResult;
                        // return user;
                        return {
                            id: user.id,
                            auth: (_a = user.auth) !== null && _a !== void 0 ? _a : null,
                            name: (_b = user.name) !== null && _b !== void 0 ? _b : null,
                            email: (_c = user.email) !== null && _c !== void 0 ? _c : null,
                            idx: (_d = user.idx) !== null && _d !== void 0 ? _d : null,
                        };
                    }
                    catch (error) {
                        return null;
                    }
                });
            },
        }),
    ],
    callbacks: {
        jwt({ token, user, account }) {
            return __awaiter(this, void 0, void 0, function* () {
                // if (user && "id" in user && "auth" in user) {
                //   token.id = user.id;
                //   token.auth = user.auth;
                //   return {
                //     ...user,
                //     ...token,
                //   };
                // }
                if (user) {
                    // token.id = user.id;
                    // token.auth = user.auth;
                    return Object.assign(Object.assign({}, user), token);
                }
                return token;
            });
        },
        // 세션에 로그인한 유저 데이터 입력
        session({ session, token, user }) {
            return __awaiter(this, void 0, void 0, function* () {
                const newUser = Object.assign(Object.assign({}, session.user), { id: typeof token.id === "string" ? token.id : null, auth: typeof token.auth === "string" ? token.auth : null });
                return Object.assign(Object.assign({}, session), { user: newUser });
            });
        },
    },
    pages: {
        signIn: "/auth/login",
        newUser: "/register",
    },
    secret: process.env.SECRET,
};
export default NextAuth(authOptions);
// const fetchdata = async () => {
//             try {
//               const response = await fetch(
//                 "http://localhost:3000/api/users/login",
//                 {
//                   method: "POST",
//                   headers: {
//                     "Content-Type": "application/json",
//                   },
//                   body: JSON.stringify(credentials),
//                 }
//               )
//                 .then((res) => res.json())
//                 .then((data) => data);
//               return response;
//             } catch (error) {
//               console.log(error);
//             }
//           };
//           const test = await fetchdata();
//           console.log(`test : ${JSON.stringify(test)}`);
// const test = () => {
//   return new Promise((resolve, reject) => {
//     fetch("http://localhost:3000/api/users/login", {
//       method: "POST",
//       body: JSON.stringify(credentials),
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((res) => res.json())
//       .then((data) => resolve(data))
//       .catch((error) => {
//         console.error(error);
//         reject(error); // 에러를 거부(reject)하여 반환
//       });
//   });
// };
// const main = async () => {
//   let result = await test();
//   result = JSON.stringify(result);
//   if (result) {
//     console.log(result);
//   }
// };
// ----------------------------------------------------------------------
// const fetchUserInfo = (): Promise<AxiosResponse<User | null>> => {
//   return axios
//     .post<User | null>(
//       "http://localhost:3000/api/users/login",
//       credentials
//     )
//     .then((res) => res)
//     .catch((error) => {
//       console.log("error:", error);
//       return null;
//     });
// };
// const fetchUserInfo = (): Promise<AxiosResponse<User | null>> => {
//   return fetch("http://localhost:3000/api/users/login", {
//     method: "POST",
//     body: JSON.stringify(credentials),
//     headers: { "Content-Type": "application/json" },
//   }).then((res) => res);
//   // .then((res) => res.data)
//   // .catch((error) => {
//   //   console.log("error:", error);
//   //   null;
//   // });
// };
// const res = (): Promise<AxiosResponse<User | null>> => {
//   return fetch("http://localhost:3000/api/users/login", {
//     method: "POST",
//     body: JSON.stringify(credentials),
//     headers: { "Content-Type": "application/json" },
//   });
// };
// async authorize(
//   credentials: Record<"username" | "password", string> | undefined,
//   req: NextApiRequest
// ): Promise<User | null> {
// async authorize(credentials, req) {
//   if (
//     !credentials ||
//     !credentials.hasOwnProperty("username") ||
//     !credentials.hasOwnProperty("password")
//   ) {
//     throw new Error("Missing username or password");
//   }
