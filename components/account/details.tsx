import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import Button from "../ui/btn";

const AccountDetails = () => {
  const session = useSession();

  return (
    <section className="flex flex-col gap-10">
      <div>
        <h5 className="mb-3">Personal Infomation</h5>
        <hr />
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-6 flex items-center gap-3">
          <h6>Name:</h6> <p>{session?.data?.user?.name}</p>
        </div>
        <div className="col-span-6 flex items-center gap-3">
          <h6>Email Address:</h6> <p>{session?.data?.user?.email}</p>
        </div>
      </div>

      <Button size="sm" variant="black" onClick={() => signOut()}>
        Logout
      </Button>
    </section>
  );
};

export default AccountDetails;
