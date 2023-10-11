import { redirect } from "next/navigation";

import AccountTabs from "@/components/account/tabs";
import Heading from "@/components/ui/heading";

import { serverSession } from "../api/auth/[...nextauth]/route";

export default async function AccountPage() {
  const session = await serverSession();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  return (
    <section className="w-full">
      <Heading size="lg">My Account</Heading>
      <AccountTabs />
    </section>
  );
}
