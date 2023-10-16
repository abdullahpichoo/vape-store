"use client";

import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import ErrorPage from "@/components/error";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FAILED_TO_FETCH_USERS } from "@/contants/errorMsgs";
import { usersTag } from "@/contants/tags";
import { getUsers } from "@/helpers/network/users";
import { useQuery } from "@/lib/react-query";
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

export default function DashboardUsers() {
  const { data: usersData, isLoading, error } = useQuery([usersTag], getData);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="w-full h-[5rem]" />
        <Skeleton className="w-full h-[30rem]" />
      </div>
    );
  }

  if (error) {
    return <ErrorPage message={FAILED_TO_FETCH_USERS} />;
  }

  return (
    <>
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
        {usersData && usersData.length > 0 ? (
          <DataTable columns={columns} data={usersData} />
        ) : (
          <DataTable columns={columns} data={[]} />
        )}
      </div>
    </>
  );
}
