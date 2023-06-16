import { CredentialsType } from "@/src/constants/apiQueryTypes";
import {
  Data,
  RequestUserData,
  UserResponseData,
} from "@/src/constants/apiTypes";
import axios, { AxiosResponse } from "axios";
import { NextApiRequest } from "next";
import NextAuth, { CookiesOptions, NextAuthOptions, Session } from "next-auth";
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

          const fetchUserInfo = async <T extends UserResponseData>(
            path: string,
            params: RequestUserData
          ): Promise<any> => {
            try {
              const { status, data }: AxiosResponse<T> = await axios.post(
                path,
                params
              );
              return status === 200 ? data : null;
            } catch (error) {
              console.log(error);
              return null;
            }
          };

          const user = await fetchUserInfo<UserResponseData>(
            "http://localhost:3000/api/users/login",
            { username, password }
          );

          // const res: AxiosResponse<User | null> = await fetchUserInfo();

          // const user = res.data.data;

          if (!user) {
            return null;
          }

          return user.data;
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
        // token.accessToken = user.access_token;

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
