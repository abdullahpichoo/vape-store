"use client";

import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../ui/dialog";

import AddAddress from "./add-address";
import Addresses from "./addresses";

const AddressBook = () => {
  const session = useSession();
  const [openDialog, setOpenDialog] = useState(false);

  const closeDialog = () => setOpenDialog(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <h2>Address Book</h2>
        {session && session.data && session.data.user && (
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button size={"lg"}>
                <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />{" "}
                <span className="hidden sm:inline-block">Add Address</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <h4>Create a New Address</h4>
              </DialogHeader>
              <AddAddress
                userId={session.data?.user.id}
                closeDialog={closeDialog}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
      {session && session.data && <Addresses userId={session.data?.user.id} />}
    </>
  );
};

export default AddressBook;
