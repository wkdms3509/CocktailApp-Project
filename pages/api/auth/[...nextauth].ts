import NextAuth from "next-auth";

// export const authOptions = {
// }

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "User-Id",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // const { username, password } = credentials;
        // const res = await fetch("/your/endpoint", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });
        // const user = await res.json();
        // if (res.ok && user) {
        //   return user;
        // }
        // return null;
      },
    }),
  ],
  pages: {
    signIn: "../../login",
  },
});
