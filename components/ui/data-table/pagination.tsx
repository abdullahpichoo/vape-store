import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "@tanstack/react-table";

import { Button } from "../button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-8 py-5 border-neutral-100 border-2 rounded-lg font-hind">
      <div className="flex-1 text-2xl text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-[100px] text-muted-foreground items-center justify-center text-2xl font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-4 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
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
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <FontAwesomeIcon icon={faAngleLeft} className="text-2xl" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-4"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <FontAwesomeIcon icon={faAngleRight} className="text-2xl" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-4 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
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
  );
}
