import { getServerSession } from "next-auth/next";

import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return <main className="">Main Page</main>;
}
