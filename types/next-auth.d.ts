import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: ROLE;
      cartId: string;
    } & DefaultSession["user"];
  }
}
