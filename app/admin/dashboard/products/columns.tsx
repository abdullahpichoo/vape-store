"use client";

import {
  faEdit,
  faEllipsis,
  faLocationArrow,
  faSort,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { ProductType } from "@/types/api/product";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center px-5 py-1.5 rounded-lg hover:bg-neutral-200 ease-in duration-200 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Price</span>
          <FontAwesomeIcon icon={faSort} className="text-lg ml-2" />
        </div>
      );
    },
  },
  {
    accessorKey: "countInStock",
    header: "Stock",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "trending",
    header: "Trending",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="text-xl text-center w-fit px-5 py-1.5 rounded-lg hover:bg-neutral-200 ease-in duration-200 cursor-pointer">
              <FontAwesomeIcon icon={faEllipsis} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => console.log("Product Id", product._id)}
            >
              <span className="mr-2">
                <FontAwesomeIcon icon={faLocationArrow} />
              </span>
              <span className="font-semibold text-black">View</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-yellow-600">
              <span className="mr-2">
                <FontAwesomeIcon icon={faEdit} />
              </span>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <span className="mr-2">
                <FontAwesomeIcon icon={faTrash} />
              </span>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
