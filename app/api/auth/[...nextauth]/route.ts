import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "@/backend/models/user";
import { INVALID_CREDENTIALS } from "@/contants/errorMsgs";
import { connectToDatabase } from "@/utils/database";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // Connecting to the database
        await connectToDatabase();

        // Checking for empty credentials
        if (!credentials || !email || !password) {
          throw new Error("Please enter your email and password");
        }

        // Checking if the user  exists
        const dbuser = await User.findOne({ email: email });
        if (!dbuser) {
          console.log("User does not exist");
          throw new Error(INVALID_CREDENTIALS);
        }

        // Checking if the password is correct
        const isPasswordMatch = bcrypt.compareSync(password, dbuser.password);
        if (!isPasswordMatch) {
          console.log("Password does not match");
          throw new Error(INVALID_CREDENTIALS);
        }

        const user = {
          id: dbuser._id,
          name: dbuser.username,
          email: dbuser.email,
          role: dbuser.role,
          cartId: dbuser.cartId,
        };
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },

  pages: {
    signIn: "/auth/sign-in",
  },
};

const handler = NextAuth(authOptions);

export const serverSession = async () => {
  return await getServerSession(authOptions);
};

export { handler as GET, handler as POST };
