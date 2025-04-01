import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: FontType[] = [
  {
    id: "m5gr84i9",
    name: "Exapmple 1",
    fonts: "Example of Arial",
    count: 5,
  },
  {
    id: "3u1reuv4",
    name: "Exaple 2",
    fonts: "Example of Roboto",
    count: 0,
  },
  {
    id: "derv1ws0",
    name: "Example 3",
    fonts: "Example of Times new Roman",
    count: 1,
  },
  {
    id: "3u1re23v4",
    name: "Roboto",
    fonts: "Example of Roboto",
    count: 3,
  },
];

export type FontType = {
  id: string;
  name: string;
  fonts: string;
  count: number;
};

export const columns: ColumnDef<FontType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "fonts",
    header: () => {
      return <div> Fonts</div>;
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("fonts")}</div>,
  },

  {
    accessorKey: "count",
    header: () => {
      return <div>Count</div>;
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("count")}</div>,
  },

  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <div className="whitespace-nowrap">
          <Button variant="ghost" className="text-blue-500">
            Edit
          </Button>
          <Button variant="ghost" className="text-red-500">
            Delete
          </Button>
        </div>
      );
    },
  },
];

export function FontGroup() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full pt-4">
      <div className="rounded-md border py-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
