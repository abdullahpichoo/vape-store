import { getServerSession } from "next-auth/next";

import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex flex-col gap-5 items-center justify-center">
      <>{console.log("Session", session)}</>
      {session ? (
        <p>
          Logged In As: {session?.user?.name} <br />
        </p>
      ) : (
        <p>Not Logged In</p>
      )}
    </main>
  );
}
