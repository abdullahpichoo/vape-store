import { NextRequest, NextResponse } from "next/server";

// There is no need for a route handler here!
// Just write the POST logic in the function below as this API (/product/new) is only for adding a new product
// For the GET, PUT, DELETE, go to the [id]/route.ts file
export async function POST(req: NextRequest) {
  // Write the POST logic here and use "NextRequest", "NextResponse", not NextApiResponse
  const { email, password } = await req.json();
  console.log("Params", email, password);

  return NextResponse.json(
    {
      body: {
        email: email,
        password: password,
      },
    },
    { status: 201 }
  );
}
