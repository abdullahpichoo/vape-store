import { INVALID_CREDENTIALS } from "@/contants/errorMsgs";
import User from "@/models/user";
import { connectToDatabase } from "@/utils/database";

import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith@mail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials, req) {
        console.log("Request", req);
        console.log("Credentials", credentials);

        // Connecting to the database
        try {
          await connectToDatabase();
        } catch (e) {
          throw new Error(e as string);
        }

        // Checking for empty credentials
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Please enter your email and password");
        }

        // Checking if the user  exists
        const dbuser = await User.findOne({ email: credentials.email });
        //   if (!user) {
        //     throw new Error(INVALID_CREDENTIALS);
        //   }
        console.log("User", dbuser);
        const user = {
          id: "123",
          name: "Name",
          email: "something@mail.com",
        };
        if (!user) {
          return null;
        }
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("Token", token);
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      console.log("Server Session", session);
      console.log("Server Token", token);
      return session;
    },
  },

  //   pages: {
  //     signIn: "/auth/signIn",
  //   },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
