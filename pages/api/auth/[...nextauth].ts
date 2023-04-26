import axios from "axios";
import { NextApiRequest } from "next";
import NextAuth, { CookiesOptions, NextAuthOptions, User } from "next-auth";
import { getToken, JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";

const cookies: Partial<CookiesOptions> = {
  sessionToken: {
    name: `next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: "none",
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
      async authorize(credentials, req: NextApiRequest) {
        if (!credentials)
          throw new Error("잘못된 입력값으로 인한 오류가 발생했습니다.");

        const { username, password } = credentials;

        const res = await fetch("http://localhost:3000/api/users/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        if (res.ok && user) {
          return user.data;
        }
        throw new Error("아이디 혹은 패스워드가 틀립니다.");
      },
    }),
  ],
  callbacks: {
    // async signIn({ user, account }) {
    //   account.access_token = user.access_token;
    //   return true;
    // },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        // token.accessToken = account.access_token;
        // console.log("1. callback user", user);
        // console.log("3. callback account", account);
      }

      return token;
    },
    // 세션에 로그인한 유저 데이터 입력
    async session({ session, token, user }) {
      // const gettoken = getToken;
      if (token) {
        session.id = token.id;
        session.accessToken = token.accessToken;
      }
      // console.log("callback session", session);
      // console.log("callback token", token);

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    newUser: "/register",
  },
  secret: process.env.SECRET,
};

export default NextAuth(authOptions);
