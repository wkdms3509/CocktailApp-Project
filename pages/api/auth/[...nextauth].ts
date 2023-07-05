import { CredentialsType } from "@/src/constants/apiQueryTypes";
import {
  Data,
  RequestUserData,
  UserResponseData,
} from "@/src/constants/apiTypes";
import axios, { AxiosResponse } from "axios";
import { NextApiRequest } from "next";
import NextAuth, {
  CookiesOptions,
  NextAuthOptions,
  Session,
  User,
} from "next-auth";
import { getToken, JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
import session from "redux-persist/lib/storage/session";

interface CustomSession extends Session {
  user: {
    id: string;
    auth?: string | null;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}

const cookies: Partial<CookiesOptions> = {
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

async function fetchUserInfo<T>(path: string, params: T): Promise<Data | null> {
  try {
    if (
      params !== null &&
      typeof params === "object" &&
      "username" in params &&
      "password" in params
    ) {
      const { status, data }: AxiosResponse<Data> = await axios.post(
        path,
        params
      );

      return status === 200 && data ? data : null;
    }
    return null;
  } catch (error) {
    console.log("에러", error);
    return null;
  }
}

export const authOptions: NextAuthOptions = {
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
      async authorize(credentials, req) {
        try {
          const { username, password } = credentials as {
            username: string;
            password: string;
          };

          if (!username || !password) {
            throw new Error("Missing username or password");
          }

          const userResult = await fetchUserInfo<RequestUserData>(
            "http://localhost:3000/api/users/login",
            { username, password }
          );

          if (!userResult || !userResult.data) {
            return null;
          }

          const { data: user } = userResult;
          // return user;

          return {
            id: user.id,
            auth: user.auth ?? null,
            name: user.name ?? null,
            email: user.email ?? null,
            idx: user.idx ?? null,
          } as User;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.auth = user.auth;

        return {
          ...user,
          ...token,
        };
      }

      return token;
    },
    // 세션에 로그인한 유저 데이터 입력
    async session({ session, token, user }): Promise<Session> {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string | null,
          auth: token.auth as string | null,
        },
      };
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
