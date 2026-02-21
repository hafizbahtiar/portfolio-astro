import React, { useEffect, useMemo, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../ui/DataTable";
import { experiencesService } from "../../../lib/experiences";
import type { Experience } from "../../../types/experiences";

const formatDate = (value: string | null) => {
  if (!value) return "Present";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

export const ExperiencesTable = () => {
  const [data, setData] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const experiences = await experiencesService.getAdminExperiences();
        setData(experiences);
      } catch (error) {
        console.error("Failed to load experiences:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadExperiences();
  }, []);

  const confirmDelete = async (experience: Experience) => {
    const modal = (window as Window & { confirmModal?: any }).confirmModal;
    if (modal?.show) {
      return modal.show({
        title: "Delete experience",
        message: `Delete “${experience.companyName} - ${experience.role}”? This action cannot be undone.`,
        confirmText: "Delete",
        cancelText: "Cancel",
        variant: "danger",
      });
    }
    return confirm("Are you sure you want to delete this experience?");
  };

  const handleDelete = async (experience: Experience) => {
    if (!experience.id) {
      alert("Missing experience ID");
      return;
    }
    const shouldDelete = await confirmDelete(experience);
    if (!shouldDelete) return;
    try {
      const success = await experiencesService.deleteExperience(experience.id);
      if (success) {
        setData((prev) => prev.filter((item) => item.id !== experience.id));
      } else {
        alert("Failed to delete experience");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete experience");
    }
  };

  const columns: ColumnDef<Experience>[] = useMemo(
    () => [
      {
        accessorKey: "companyName",
        header: "Company",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-medium text-white">
              {row.original.companyName}
            </span>
            <span className="text-xs text-gray-500 font-mono">
              {row.original.role}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => (
          <span className="text-sm text-gray-300">
            {row.original.location || "—"}
          </span>
        ),
      },
      {
        accessorKey: "startDate",
        header: "Duration",
        cell: ({ row }) => (
          <span className="text-sm text-gray-300 font-mono">
            {formatDate(row.original.startDate)} —{" "}
            {formatDate(row.original.endDate)}
          </span>
        ),
      },
      {
        accessorKey: "displayOrder",
        header: "Order",
        cell: ({ row }) => (
          <span className="text-sm text-gray-300 font-mono">
            {row.original.displayOrder}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <a
              href={`/admin/experiences/edit?id=${row.original.id}`}
              className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 rounded-lg transition-colors"
              title="Edit Experience"
              aria-label={`Edit ${row.original.companyName}`}
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
            <button
              onClick={() => handleDelete(row.original)}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
              title="Delete Experience"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  return <DataTable columns={columns} data={data} isLoading={isLoading} />;
};
