import { useSession } from "next-auth/react";

import Orders from "./orders";

const OrderHistory = () => {
  const session = useSession();

  return (
    <>
      <h2 className="mb-5">Past Orders</h2>
      {session && session.data && session.data.user && (
        <Orders userId={session.data.user.id} />
      )}
    </>
  );
};

export default OrderHistory;
