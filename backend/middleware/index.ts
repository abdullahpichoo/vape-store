import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDatabase } from "@/utils/database";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const connectToDB = async () => {
  const isConnected = await connectToDatabase();
  if (isConnected) {
    return NextResponse.next();
  }
  return NextResponse.json({
    body: {
      success: false,
      status: 500,
      message: "Failed to connect to database",
    },
  });
};

export const isAuthenticated = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    return NextResponse.next();
  }

  return NextResponse.redirect("/api/auth/signin");
};

export const isAdmin = async () => {
  const session = await getServerSession(authOptions);

  if (session && session?.user?.email === "admin@admin.com") {
    return NextResponse.next();
  }

  return NextResponse.redirect("/");
};
