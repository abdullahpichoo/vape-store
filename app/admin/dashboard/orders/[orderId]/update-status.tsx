"use client";

import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/toast/use-toast";
import { useUpdateOrder } from "@/helpers/queries/order/mutate";
import { OrderType, orderStatusList } from "@/types/api/order";

interface UpdateOrderStatusProps {
  order: OrderType;
}

const UpdateOrderStatus = (props: UpdateOrderStatusProps) => {
  const { order } = props;

  const [openDialog, setOpenDialog] = useState(false);
  const [status, setStatus] = useState(order.status);

  const { toast } = useToast();

  const {
    mutate: updateOrder,
    isLoading,
    error,
  } = useUpdateOrder(order._id, () => {
    toast({
      title: "Order status updated successfully",
      description: "Order status has been updated successfully",
    });
  });
  if (error) {
    toast({
      title: "Order status update failed",
      description: `Order status update failed ${error}`,
      variant: "destructive",
    });
  }

  const updateOrderStatus = async () => {
    const payload = {
      ...order,
      status: status === "ORDERED" ? "PROCESSING" : status,
    };
    await updateOrder(payload);
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button size="lg">
          <span className="mr-2">
            <FontAwesomeIcon icon={faEdit} />
          </span>
          Update Status
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h4>Update Status</h4>
        </DialogHeader>
        <label
          htmlFor="status"
          className="font-semibold text-neutral-600 ms-1 text-[1.2rem] md:text-[1.6rem]"
        >
          Choose Status
        </label>
        <select
          name="status"
          id="status"
          className="text-[1.4rem] text-gray-600 px-7 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-1 focus:border-transparent"
          defaultValue={order.status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {orderStatusList.map((status) => (
            <option key={status.label} value={status.value} className="py-2">
              {status.value}
            </option>
          ))}
        </select>

        <Button size="lg" className="my-5" onClick={updateOrderStatus}>
          <div className="flex items-center justify-center gap-4">
            {isLoading && <Spinner size="sm" color="black" />}
            <span>{isLoading ? "Updating..." : "Update"}</span>
          </div>
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateOrderStatus;
