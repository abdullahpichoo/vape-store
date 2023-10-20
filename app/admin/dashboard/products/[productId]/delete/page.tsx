"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/toast/use-toast";
import { FAILED_TO_DELETE_PRODUCT } from "@/contants/errorMsgs";
import { PRODUCT_DELETED_SUCCESSFULLY } from "@/contants/successMsgs";
import { deleteProduct } from "@/helpers/network/products";

const DeleteProduct = ({ params }: { params: { productId: string } }) => {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteThisProduct = async () => {
    setIsDeleting(true);
    try {
      await deleteProduct(params.productId);
      toast({
        title: PRODUCT_DELETED_SUCCESSFULLY,
        description: "The requested product has been deleted successfully!",
      });
      setTimeout(
        () => window.location.replace("/admin/dashboard/products"),
        1000
      );
    } catch (err) {
      toast({
        title: FAILED_TO_DELETE_PRODUCT,
        description: "Something went wrong! Please try again later.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="flex flex-col gap-8 items-center">
      <div className="text-center">
        <h2>Delete Product</h2>
        <h5 className="text-gray-600">
          Are you sure you want to delete this product? This action cannot be
          undone.
        </h5>
      </div>
      <div className="flex justify-start items-center gap-5">
        <Link href={"/admin/dashboard/products"}>
          <Button size={"lg"}>Go Back</Button>
        </Link>
        <Button
          variant="destructive"
          size={"lg"}
          onClick={deleteThisProduct}
          disabled={isDeleting}
        >
          <div className="flex justify-center items-center gap-4">
            {isDeleting && (
              <div className="mt-2">
                <Spinner color="black" size="sm" />
              </div>
            )}
            <span>
              {isDeleting
                ? "Deleting This Product..."
                : "Yes, Delete This Product"}
            </span>
          </div>
        </Button>
      </div>
    </section>
  );
};

export default DeleteProduct;
