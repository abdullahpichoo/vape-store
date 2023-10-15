import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FAILED_TO_FETCH_USERS } from "@/contants/errorMsgs";
import { getUsers } from "@/helpers/network/users";
import { UserType } from "@/types/api/user";

import { columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<UserType[]> {
  try {
    const payloadUsers = await getUsers();
    return payloadUsers;
  } catch {
    throw new Error(FAILED_TO_FETCH_USERS);
  }
}

export default async function DashboardUsers() {
  const usersData = await getData();

  return (
    <div className="container mx-auto py-5">
      <div className="flex justify-between items-center mb-4">
        <h2>Users</h2>
        <Link href={"/admin/dashboard/users/add"}>
          <Button size={"lg"}>
            <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />{" "}
            <span className="hidden sm:inline-block">Add User</span>
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={usersData} />
    </div>
  );
}
