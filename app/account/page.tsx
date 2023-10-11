import { serverSession } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
export default async function AccountPage() {
  const session = await serverSession();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  return (
    <div>
      <h1>Account Page</h1>
      <p>Welcome, {session && session.user?.name}!</p>
      <p>Email: {session && session.user?.email}</p>
    </div>
  );
}
