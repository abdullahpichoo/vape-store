import { NextRequest, NextResponse } from "next/server";

import { connectToDatabase } from "@/utils/database";

export const POST = async (req: NextRequest) => {
  await connectToDatabase();

  const data = await req.json();

  console.log("Request Body", data);

  return NextResponse.json({ status: 200 });
  //   const { name, email, password } = req.body;
};
