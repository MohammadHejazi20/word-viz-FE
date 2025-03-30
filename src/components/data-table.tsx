import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";

import { ColorBadge } from "@/components/color-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Hash } from "lucide-react";

// Define our data type
interface WordCount {
  word: string;
  count: number;
}

// Define our columns
const columns: ColumnDef<WordCount>[] = [
  {
    accessorKey: "word",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting()}
          className="p-0 hover:bg-transparent"
        >
          Word
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("word")}</div>
    ),
  },
  {
    accessorKey: "count",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Count
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue("count")}</div>
      );
    },
  },
];

interface DataTableProps {
  data: WordCount[];
  title: string;
  badgeColor?:
    | "blue"
    | "purple"
    | "emerald"
    | "amber"
    | "rose"
    | "indigo"
    | "teal"
    | "orange";
  height?: string;
  searchPlaceholder?: string;
}

export function DataTable({
  data,
  title,
  badgeColor = "emerald",
  height = "300px",
  searchPlaceholder = "Filter words...",
}: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        <ColorBadge color={badgeColor} icon={Hash}>
          {data && data.length} items
        </ColorBadge>
      </div>

      <div>
        <div className="flex items-center gap-3">
          <Input
            placeholder={searchPlaceholder}
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-sm"
          />
          {globalFilter && (
            <div className="text-sm text-muted-foreground">
              Showing {table.getFilteredRowModel().rows.length} of {data.length}{" "}
              items
            </div>
          )}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="grid grid-cols-2 grid-rows-1 gap-4"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="flex flex-row">
                      <div
                        className={
                          header.column.getCanSort()
                            ? "flex items-center cursor-pointer select-none"
                            : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {header.column.getCanSort() && (
                          <div className="ml-1 flex">
                            {header.column.getIsSorted() === "asc" ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ArrowUpDown className="h-4 w-4 opacity-50" />
                            )}
                          </div>
                        )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
        </Table>

        <ScrollArea style={{ height }}>
          <Table>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="grid grid-cols-2 grid-rows-1 gap-4"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="flex flex-row pl-6">
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
        </ScrollArea>
      </div>
    </div>
  );
}
