import { Data } from "@/src/constants/apiTypes";
import axios from "axios";
import { NextApiRequest } from "next";
import NextAuth, { CookiesOptions, NextAuthOptions, User } from "next-auth";
import { getToken, JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
import session from "redux-persist/lib/storage/session";

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

const authOptions: NextAuthOptions = {
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
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        if (!username || !password) {
          throw new Error("Missing username or password");
        }

        const res = await fetch("http://localhost:3000/api/users/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const user: Data = await res.json();

        if (res.ok && user.data) {
          return user.data;
        }

        throw new Error("아이디 혹은 패스워드가 틀립니다.");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.access_token;
        console.log("user", user);

        return {
          user,
          ...token,
        };
      }

      return token;
    },
    // 세션에 로그인한 유저 데이터 입력
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
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
