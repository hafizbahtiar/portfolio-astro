import { jsxs, jsx } from 'react/jsx-runtime';
import React, { useState } from 'react';
import { useReactTable, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, getCoreRowModel, flexRender } from '@tanstack/react-table';

function DataTable({
  columns,
  data,
  isLoading = false,
  enableRowSelection = false
}) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const tableColumns = React.useMemo(() => {
    if (!enableRowSelection) return columns;
    const selectionColumn = {
      id: "select",
      header: ({ table: table2 }) => /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: table2.getIsAllPageRowsSelected(),
          onChange: table2.getToggleAllPageRowsSelectedHandler(),
          "aria-label": "Select all",
          className: "w-4 h-4 rounded border-gray-600 bg-gray-800 text-cyan-600 focus:ring-cyan-500 focus:ring-offset-gray-900"
        }
      ) }),
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: row.getIsSelected(),
          onChange: row.getToggleSelectedHandler(),
          "aria-label": "Select row",
          className: "w-4 h-4 rounded border-gray-600 bg-gray-800 text-cyan-600 focus:ring-cyan-500 focus:ring-offset-gray-900"
        }
      ) }),
      enableSorting: false,
      enableHiding: false,
      size: 50
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
      pagination
    },
    enableRowSelection
  });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative w-full md:w-72", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx(
          "svg",
          {
            className: "h-4 w-4 text-gray-400",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "2",
                d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Search...",
            value: globalFilter ?? "",
            onChange: (e) => setGlobalFilter(e.target.value),
            className: "block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg leading-5 bg-gray-900/50 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm transition-colors"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "datatable-page-size",
            className: "text-sm font-medium text-gray-400 font-mono tracking-wide",
            children: "// Rows"
          }
        ),
        /* @__PURE__ */ jsx(
          "select",
          {
            id: "datatable-page-size",
            value: table.getState().pagination.pageSize,
            onChange: (e) => table.setPageSize(Number(e.target.value)),
            className: "w-24 bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white outline-none transition-all font-mono focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500",
            children: [10, 20, 30, 40, 50].map((size) => /* @__PURE__ */ jsx("option", { value: size, children: size }, size))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl overflow-hidden shadow-xl", children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm text-gray-400", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-900/80 text-gray-200 uppercase font-mono text-xs border-b border-gray-700", children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx("tr", { children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx(
          "th",
          {
            scope: "col",
            className: "px-6 py-4 font-medium tracking-wider",
            style: { width: header.getSize() !== 150 ? header.getSize() : void 0 },
            children: header.isPlaceholder ? null : /* @__PURE__ */ jsxs(
              "div",
              {
                className: `flex items-center gap-2 ${header.column.getCanSort() ? "cursor-pointer select-none hover:text-cyan-400 transition-colors" : ""}`,
                onClick: header.column.getToggleSortingHandler(),
                children: [
                  flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  ),
                  header.column.getCanSort() && /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: {
                    asc: /* @__PURE__ */ jsx(
                      "svg",
                      {
                        className: "w-3 h-3 text-cyan-500",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /* @__PURE__ */ jsx(
                          "path",
                          {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2",
                            d: "M5 15l7-7 7 7"
                          }
                        )
                      }
                    ),
                    desc: /* @__PURE__ */ jsx(
                      "svg",
                      {
                        className: "w-3 h-3 text-cyan-500",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /* @__PURE__ */ jsx(
                          "path",
                          {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2",
                            d: "M19 9l-7 7-7-7"
                          }
                        )
                      }
                    )
                  }[header.column.getIsSorted()] ?? /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "w-3 h-3 opacity-0 group-hover:opacity-50",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: "2",
                          d: "M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        }
                      )
                    }
                  ) })
                ]
              }
            )
          },
          header.id
        )) }, headerGroup.id)) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-700/50", children: isLoading ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
          "td",
          {
            colSpan: columns.length,
            className: "px-6 py-12 text-center text-gray-500",
            children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
              /* @__PURE__ */ jsx("div", { className: "inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500 mb-4" }),
              /* @__PURE__ */ jsx("p", { className: "font-mono text-sm", children: "Loading data..." })
            ] })
          }
        ) }) : table.getRowModel().rows.length > 0 ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(
          "tr",
          {
            className: `transition-colors group ${row.getIsSelected() ? "bg-cyan-900/10 hover:bg-cyan-900/20" : "hover:bg-gray-700/30"}`,
            children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx("td", { className: "px-6 py-4 align-middle", children: flexRender(
              cell.column.columnDef.cell,
              cell.getContext()
            ) }, cell.id))
          },
          row.id
        )) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
          "td",
          {
            colSpan: columns.length,
            className: "px-6 py-12 text-center text-gray-500 font-mono",
            children: "No results found."
          }
        ) }) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-900/50 px-6 py-4 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-400 font-mono", children: [
          enableRowSelection && Object.keys(rowSelection).length > 0 && /* @__PURE__ */ jsxs("span", { className: "text-cyan-400 mr-4", children: [
            Object.keys(rowSelection).length,
            " selected"
          ] }),
          "Page ",
          table.getState().pagination.pageIndex + 1,
          " of",
          " ",
          table.getPageCount() || 1
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "px-3 py-1 border border-gray-600 rounded-md text-sm text-gray-300 hover:bg-gray-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
              onClick: () => table.previousPage(),
              disabled: !table.getCanPreviousPage(),
              children: "Previous"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "px-3 py-1 border border-gray-600 rounded-md text-sm text-gray-300 hover:bg-gray-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
              onClick: () => table.nextPage(),
              disabled: !table.getCanNextPage(),
              children: "Next"
            }
          )
        ] })
      ] })
    ] })
  ] });
}

export { DataTable as D };
