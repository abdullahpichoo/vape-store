import { NextRequest } from "next/server";
import { decode, getToken } from "next-auth/jwt";

export const isAdmin = async (req: NextRequest) => {
  const token = await getToken({ req });

  if (!token) return false;

  if (token.role === "admin") return true;

  return false;
};
