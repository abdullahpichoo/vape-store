import { NextRequest } from "next/server";
import { decode, getToken } from "next-auth/jwt";

export const isAdmin = async (req: NextRequest) => {
  const token = await getToken({ req });
  const sessionCookie = req.cookies.get("next-auth.session-token")?.value;
  const session = await decode({
    token: sessionCookie,
    secret: process.env.NEXTAUTH_SECRET as string,
  });

  if (!session) return false;

  if (!token) return false;

  if (token.role === "admin" || session.role === "admin") return true;

  return false;
};
