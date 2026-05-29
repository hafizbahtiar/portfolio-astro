import React, { useMemo, useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    flexRender,
    type ColumnDef,
    type SortingState,
} from "@tanstack/react-table";
import {
    ArrowDown,
    ArrowUp,
    ChevronLeft,
    ChevronRight,
    ChevronsUpDown,
    Loader2,
    Rows3,
    Search,
} from "lucide-react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    isLoading?: boolean;
    enableRowSelection?: boolean;
}

const checkboxClass =
    "h-4 w-4 rounded border-slate-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500/30 dark:border-slate-600 dark:bg-slate-800";

export function DataTable<TData, TValue>({
    columns,
    data,
    isLoading = false,
    enableRowSelection = false,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [rowSelection, setRowSelection] = useState({});
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const tableColumns = useMemo(() => {
        if (!enableRowSelection) return columns;

        const selectionColumn: ColumnDef<TData, TValue> = {
            id: "select",
            header: ({ table }) => (
                <div className="flex items-center justify-center">
                    <input
                        type="checkbox"
                        checked={table.getIsAllPageRowsSelected()}
                        onChange={table.getToggleAllPageRowsSelectedHandler()}
                        aria-label="Select all rows"
                        className={checkboxClass}
                    />
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center justify-center">
                    <input
                        type="checkbox"
                        checked={row.getIsSelected()}
                        onChange={row.getToggleSelectedHandler()}
                        aria-label="Select row"
                        className={checkboxClass}
                    />
                </div>
            ),
            enableSorting: false,
            enableHiding: false,
            size: 44,
        };

        return [selectionColumn, ...columns];
    }, [columns, enableRowSelection]);

    const table = useReactTable({
        data,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        state: {
            sorting,
            globalFilter,
            rowSelection,
            pagination,
        },
        enableRowSelection,
    });

    const selectedCount = Object.keys(rowSelection).length;
    const visibleRowCount = table.getRowModel().rows.length;
    const totalRows = table.getFilteredRowModel().rows.length;
    const pageCount = table.getPageCount() || 1;

    return (
        <div className="space-y-3">
            <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-sm">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        type="search"
                        placeholder="Search table"
                        value={globalFilter ?? ""}
                        onChange={(event) => setGlobalFilter(event.target.value)}
                        className="block h-10 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400"
                    />
                </div>

                <div className="flex items-center justify-between gap-3 sm:justify-end">
                    <div className="hidden items-center gap-2 text-sm text-slate-500 dark:text-slate-400 sm:flex">
                        <Rows3 className="h-4 w-4" />
                        <span>{totalRows} rows</span>
                    </div>
                    <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <span>Rows</span>
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={(event) => table.setPageSize(Number(event.target.value))}
                            className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                        >
                            {[10, 20, 30, 40, 50].map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] text-left text-sm text-slate-600 dark:text-slate-300">
                        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        const sorted = header.column.getIsSorted();
                                        return (
                                            <th
                                                key={header.id}
                                                scope="col"
                                                className="px-4 py-3 font-semibold tracking-wide first:pl-5 last:pr-5"
                                                style={{
                                                    width: header.getSize() !== 150 ? header.getSize() : undefined,
                                                }}
                                            >
                                                {header.isPlaceholder ? null : (
                                                    <button
                                                        type="button"
                                                        disabled={!header.column.getCanSort()}
                                                        onClick={header.column.getToggleSortingHandler()}
                                                        className="flex items-center gap-2 text-left transition-colors enabled:hover:text-slate-900 disabled:cursor-default dark:enabled:hover:text-slate-100"
                                                    >
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                        {header.column.getCanSort() && (
                                                            <span className="text-slate-400">
                                                                {sorted === "asc" ? (
                                                                    <ArrowUp className="h-3.5 w-3.5" />
                                                                ) : sorted === "desc" ? (
                                                                    <ArrowDown className="h-3.5 w-3.5" />
                                                                ) : (
                                                                    <ChevronsUpDown className="h-3.5 w-3.5" />
                                                                )}
                                                            </span>
                                                        )}
                                                    </button>
                                                )}
                                            </th>
                                        );
                                    })}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/80">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={tableColumns.length} className="px-5 py-14 text-center">
                                        <div className="flex flex-col items-center justify-center gap-3 text-slate-500 dark:text-slate-400">
                                            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                                            <p className="text-sm">Loading data</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : visibleRowCount > 0 ? (
                                table.getRowModel().rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        className={row.getIsSelected()
                                            ? "bg-blue-50/80 dark:bg-blue-950/20"
                                            : "transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/35"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="px-4 py-4 align-middle first:pl-5 last:pr-5">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={tableColumns.length} className="px-5 py-14 text-center text-sm text-slate-500 dark:text-slate-400">
                                        No results found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col gap-3 border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                        {selectedCount > 0 ? (
                            <span className="mr-3 font-medium text-blue-600 dark:text-blue-400">
                                {selectedCount} selected
                            </span>
                        ) : null}
                        Page {table.getState().pagination.pageIndex + 1} of {pageCount}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                        </button>
                        <button
                            type="button"
                            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
