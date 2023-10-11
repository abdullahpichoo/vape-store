import AccountTabs from "@/components/account/tabs";
import Heading from "@/components/ui/heading";

export default async function AccountPage() {
  return (
    <section className="w-full">
      <Heading size="lg">My Account</Heading>
      <AccountTabs />
    </section>
  );
}
