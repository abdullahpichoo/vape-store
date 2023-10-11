import { redirect } from "next/navigation";

import { serverSession } from "@/app/api/auth/[...nextauth]/route";
import SignInCard from "@/components/auth/sign-in";

export default async function SignIn() {
  const session = await serverSession();

  if (session?.user) {
    redirect("/");
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <SignInCard />
      </div>
    </>
  );
}
