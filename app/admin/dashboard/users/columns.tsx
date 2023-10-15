"use client";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { UserType } from "@/types/api/user";

export const columns: ColumnDef<UserType>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },

  {
    accessorKey: "email",
    header: "Email",
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
            <Button>
              <span className="mr-2">
                <FontAwesomeIcon icon={faEdit} />
              </span>
              Update Password
            </Button>
            <Button variant={"destructive"}>
              <span className="mr-2">
                <FontAwesomeIcon icon={faTrash} />
              </span>
              Delete
            </Button>
          </div>
        </>
      );
    },
  },
];
