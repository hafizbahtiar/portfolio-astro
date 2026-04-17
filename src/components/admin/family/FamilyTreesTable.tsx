import React, { useEffect, useMemo, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../ui/DataTable";
import { familyService } from "../../../lib/family";
import type { FamilyTree } from "../../../types/family";

export const FamilyTreesTable = () => {
  const [data, setData] = useState<FamilyTree[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTrees = async () => {
      try {
        const trees = await familyService.getAdminTrees();
        setData(trees);
      } catch (error) {
        console.error("Failed to load family trees:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTrees();
  }, []);

  const columns: ColumnDef<FamilyTree>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Family Tree",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-medium text-white">{row.original.name}</span>
            <span className="text-xs font-mono text-cyan-300">
              /{row.original.slug}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
          <span className="text-sm text-gray-300">
            {row.original.description || "No description yet."}
          </span>
        ),
      },
      {
        accessorKey: "isPublic",
        header: "Visibility",
        cell: ({ row }) => (
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${row.original.isPublic
                ? "bg-emerald-500/10 text-emerald-300"
                : "bg-gray-700/60 text-gray-300"
              }`}
          >
            {row.original.isPublic ? "PUBLIC" : "PRIVATE"}
          </span>
        ),
      },
      {
        accessorKey: "updatedAt",
        header: "Updated",
        cell: ({ row }) => (
          <span className="text-sm font-mono text-gray-300">
            {new Date(row.original.updatedAt).toLocaleDateString()}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <a
              href={`/admin/family/edit?id=${row.original.id}`}
              className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 rounded-lg transition-colors"
              title="Open Builder"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
            </a>
          </div>
        ),
      },
    ],
    [],
  );

  return <DataTable columns={columns} data={data} isLoading={isLoading} />;
};
