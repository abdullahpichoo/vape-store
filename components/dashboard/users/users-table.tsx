"use client";

import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faEdit,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pagination, SearchParams } from "@/types";
import { UserType } from "@/types/api/user";

import EditUser from "./edit-user";

interface UsersTableProps {
  data: UserType[];
  pagination: Pagination;
  params: SearchParams;
  setParams: (params: SearchParams) => void;
}

const UsersTable = (props: UsersTableProps) => {
  const { data, pagination, params, setParams } = props;

  const [openDialog, setOpenDialog] = useState(false);
  const closeDialog = () => setOpenDialog(false);

  const columns: ColumnDef<UserType>[] = [
    {
      accessorKey: "_id",
      header: "#",
      cell: ({ row }) => {
        return <p>{row.index + 1}</p>;
      },
    },
    {
      accessorKey: "username",
      header: () => {
        return (
          <div
            className="flex items-center px-5 py-1.5 rounded-lg hover:bg-neutral-200 ease-in duration-200 cursor-pointer"
            role="button"
            onClick={() => {
              setParams({
                ...params,
                sortBy: "username",
                orderBy: params.orderBy === "asc" ? "desc" : "asc",
              });
            }}
          >
            <span>Username</span>
            <FontAwesomeIcon icon={faSort} className="text-lg ml-2" />
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: () => {
        return (
          <div
            className="flex items-center px-5 py-1.5 rounded-lg hover:bg-neutral-200 ease-in duration-200 cursor-pointer"
            role="button"
            onClick={() => {
              setParams({
                ...params,
                sortBy: "email",
                orderBy: params.orderBy === "asc" ? "desc" : "asc",
              });
            }}
          >
            <span>Email</span>
            <FontAwesomeIcon icon={faSort} className="text-lg ml-2" />
          </div>
        );
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <>
            <div className="flex justify-start gap-5">
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <span className="mr-2">
                      <FontAwesomeIcon icon={faEdit} />
                    </span>
                    Update Password
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <h4>Update Password</h4>
                  </DialogHeader>
                  <EditUser user={user} closeDialog={closeDialog} />
                </DialogContent>
              </Dialog>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      {data && (
        <>
          <DataTable data={data} columns={columns} />
          <div className="flex items-center justify-between px-8 py-5 border-neutral-100 border-2 rounded-lg font-hind">
            <div className="flex items-center space-x-6 lg:space-x-8">
              <div className="flex w-[100px] text-muted-foreground items-center justify-center text-2xl font-medium">
                Page {pagination.currentPage} of {pagination.totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-4 lg:flex"
                  onClick={() => {
                    setParams({
                      ...params,
                      pageNumber: "1",
                    });
                  }}
                  disabled={
                    pagination.currentPage === 1 || pagination.prevPage === 0
                  }
                >
                  <span className="sr-only">Go to first page</span>
                  <FontAwesomeIcon
                    icon={faAnglesLeft}
                    className="text-2xl text-orange-1"
                  />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-4"
                  onClick={() => {
                    setParams({
                      ...params,
                      pageNumber: !!pagination.prevPage
                        ? pagination.prevPage.toString()
                        : pagination.totalPages.toString(),
                    });
                  }}
                  disabled={
                    pagination.currentPage === 1 || pagination.prevPage === 0
                  }
                >
                  <span className="sr-only">Go to previous page</span>
                  <FontAwesomeIcon icon={faAngleLeft} className="text-2xl" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-4"
                  onClick={() => {
                    setParams({
                      ...params,
                      pageNumber: !!pagination.nextPage
                        ? pagination.nextPage.toString()
                        : "1",
                    });
                  }}
                  disabled={pagination.nextPage === 0}
                >
                  <span className="sr-only">Go to next page</span>
                  <FontAwesomeIcon icon={faAngleRight} className="text-2xl" />
                </Button>
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-4 lg:flex"
                  onClick={() => {
                    setParams({
                      ...params,
                      pageNumber: pagination.totalPages.toString(),
                    });
                  }}
                  disabled={pagination.nextPage === 0}
                >
                  <span className="sr-only">Go to last page</span>
                  <FontAwesomeIcon
                    icon={faAnglesRight}
                    className="text-2xl text-orange-1"
                  />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UsersTable;
