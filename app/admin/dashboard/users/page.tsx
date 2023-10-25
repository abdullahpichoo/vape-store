"use client";

import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

import AddUser from "@/components/dashboard/users/add-user";
import UsersTable from "@/components/dashboard/users/users-table";
import ErrorPage from "@/components/error";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { FAILED_TO_FETCH_USERS } from "@/contants/errorMsgs";
import { useFetchUsers } from "@/helpers/queries/users/fetch";
import { SearchParams } from "@/types";
import { convertSearchParamsToURL } from "@/utils/client";

export default function DashboardUsers() {
  const [searchBy, setSearchBy] = useState({
    searchBy: "",
    search: "",
  });
  const [params, setParams] = useState<SearchParams>({
    pageSize: "10",
    pageNumber: "1",
    sortBy: "createdAt",
    orderBy: "desc",
    searchBy: "",
    search: "",
  });
  const [query] = useDebounce(searchBy, 750);

  const [openDialog, setOpenDialog] = useState(false);
  const closeDialog = () => setOpenDialog(false);

  useEffect(() => {
    if (!query.search) {
      setParams((prev) => ({
        ...prev,
        searchBy: "",
        search: "",
      }));
    } else {
      setParams((prev) => ({
        ...prev,
        searchBy: query.searchBy,
        search: query.search,
      }));
    }
  }, [query]);

  const {
    data: usersData,
    isLoading,
    error,
  } = useFetchUsers(convertSearchParamsToURL("", params));

  const getParams = (params: SearchParams) => {
    setParams(params);
  };

  const renderTable = useMemo(() => {
    return (
      <>
        {usersData && (
          <UsersTable
            data={usersData.users}
            pagination={usersData.pagination}
            params={params}
            setParams={getParams}
          />
        )}
      </>
    );
  }, [usersData, params]);

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
        <div className="flex justify-between items-center mb-5">
          <h2>Users</h2>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button size={"lg"}>
                <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />{" "}
                <span className="hidden sm:inline-block">Add User</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <h4>Create a New User</h4>
              </DialogHeader>
              <AddUser closeDialog={closeDialog} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-col sm:flex-row gap-10 mb-5">
          <div className="form-item flex flex-col gap-2">
            <label
              htmlFor="name"
              className="font-semibold text-neutral-600 ms-1 text-[1.2rem] md:text-[1.6rem]"
            >
              Search by Username
            </label>
            <input
              id="name"
              type="text"
              className="px-8 py-2 rounded-xl text-[1.4rem] md:text-[1.6rem] focus:outline-orange-1"
              placeholder="Enter username"
              onChange={(e) => {
                setSearchBy({
                  searchBy: "username",
                  search: e.target.value,
                });
              }}
              defaultValue={
                searchBy.searchBy === "username" ? searchBy.search : ""
              }
            />
          </div>
          <div className="form-item flex flex-col gap-2">
            <label
              htmlFor="name"
              className="font-semibold text-neutral-600 ms-1 text-[1.2rem] md:text-[1.6rem]"
            >
              Search by Email
            </label>
            <input
              id="name"
              type="text"
              className="px-8 py-2 rounded-xl text-[1.4rem] md:text-[1.6rem] focus:outline-orange-1"
              placeholder="Enter email address"
              onChange={(e) => {
                setSearchBy({
                  searchBy: "email",
                  search: e.target.value,
                });
              }}
              defaultValue={
                searchBy.searchBy === "email" ? searchBy.search : ""
              }
            />
          </div>
        </div>
        {renderTable}
      </div>
    </>
  );
}
