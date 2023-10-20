"use client";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColumnDef } from "@tanstack/react-table";

import EditUser from "@/components/dashboard/users/edit-user";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
            <Dialog>
              <DialogTrigger>
                <Button>
                  <span className="mr-2">
                    <FontAwesomeIcon icon={faEdit} />
                  </span>
                  Update Password
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    <h4>Update Password</h4>
                  </DialogTitle>
                </DialogHeader>
                <EditUser user={user} />
              </DialogContent>
            </Dialog>
          </div>
        </>
      );
    },
  },
];
