import axios from "axios";
import NextAuth, { CookiesOptions, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
      // ...​
    },
  },
};

const authOptions: NextAuthOptions = {
  cookies: cookies,
  session: {
    strategy: "jwt",
    maxAge: 30 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "User-Id",
      type: "credentials",
      credentials: {
        id: { label: "Id", type: "text", placeholder: "id" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      // 로그인 유효성 검사
      async authorize(credentials, req) {
        if (!credentials)
          throw new Error("잘못된 입력값으로 인한 오류가 발생했습니다.");

        const { id, password } = credentials;

        const res = await axios.post("http://localhost:3001/api/users/login", {
          id,
          password,
        });

        const user = res.data.data;

        if (res.status === 200 && user) {
          return user;
        }
        // return null;
        throw new Error("아이디 혹은 패스워드가 틀립니다.");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.access_token;
        token.userRole = "admin";
      }
      return token;
    },
    // 세션에 로그인한 유저 데이터 입력
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  secret: process.env.SECRET,
};

export default NextAuth(authOptions);

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "User-Id",
//       type: "credentials",
//       credentials: {
//         id: { label: "Id", type: "text", placeholder: "id" },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "password",
//         },
//       },
//       // 로그인 유효성 검사
//       async authorize(credentials, req) {
//         if (!credentials)
//           throw new Error("잘못된 입력값으로 인한 오류가 발생했습니다.");

//         const { id, password } = credentials;

//         const res = await axios.post("http://localhost:3001/api/users/login", {
//           id,
//           password,
//         });

//         const user = res.data.data;

//         if (res.status === 200 && user) {
//           return user;
//         }
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user, account }) {
//       if (user && account) {
//         token.accessToken = user.access_token;
//         token.userRole = "admin";
//         console.log(user);
//       }
//       //   if (account && user) {
//       //       token.accessToken = user.access_token,
//       //       accessTokenExpires = account.expires_at,
//       //         refreshToken = account.refresh_token,
//       //     }
//       return token;
//     },
//     // 세션에 로그인한 유저 데이터 입력
//     async session({ session, token }) {
//       //   session.accessToken = token.accessToken;
//       //   session.user = token.user as User;
//       //   session.accessTokenExpires = token.accessTokenExpires;
//       //   session.error = token.error;

//       session.accessToken = token.accessToken;
//       //   console.log("session", session);
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//     newUser: "/register",
//   },
//   secret: process.env.SECRET,
// });
