import { NextRequest } from "next/server";
import { decode } from "next-auth/jwt";

export const isAdmin = async (req: NextRequest) => {
  const sessionToken = req.cookies.get("next-auth.session-token")?.value;
  if (!sessionToken) return false;

  const session = await decode({
    token: sessionToken,
    secret: process.env.NEXTAUTH_SECRET as string,
  });

  if (!session) return false;

  if (session.role === "admin") return true;

  return false;
};
