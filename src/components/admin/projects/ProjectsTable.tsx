import React, { useEffect, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../ui/DataTable";
import {
  AdminBadge,
  statusBadgeVariant,
  CellPrimary,
  CellSecondary,
  RowActions,
  EditAction,
  DeleteAction,
} from "../../ui/admin/primitives";
import { projectsService } from "../../../lib/projects";
import type { Project } from "../../../types/project";

const TYPE_VARIANT = {
  business: "info",
  personal: "accent",
  work: "neutral",
} as const;

export const ProjectsTable = () => {
  const [data, setData] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projects = await projectsService.getAdminProjects();
        setData(projects);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  const confirmDelete = async (project: Project) => {
    const modal = (window as Window & { confirmModal?: any }).confirmModal;
    if (modal?.show) {
      return modal.show({
        title: "Delete project",
        message: `Delete “${project.title}”? This action cannot be undone.`,
        confirmText: "Delete",
        cancelText: "Cancel",
        variant: "danger",
      });
    }
    return confirm("Are you sure you want to delete this project?");
  };

  const handleDelete = async (project: Project) => {
    if (!project.id) {
      alert("Missing project ID");
      return;
    }
    const shouldDelete = await confirmDelete(project);
    if (!shouldDelete) return;
    try {
      const success = await projectsService.deleteProject(project.id);
      if (success) {
        setData((prev) => prev.filter((item) => item.id !== project.id));
      } else {
        alert("Failed to delete project");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete project");
    }
  };

  const columns: ColumnDef<Project>[] = [
    {
      accessorKey: "title",
      header: "Project",
      cell: ({ row }) => (
        <div className="min-w-0">
          <span className="flex items-center gap-2">
            <CellPrimary>{row.original.title}</CellPrimary>
            {row.original.featured && (
              <AdminBadge variant="accent">Featured</AdminBadge>
            )}
          </span>
          <CellSecondary mono>{row.original.slug}</CellSecondary>
        </div>
      ),
    },
    {
      accessorKey: "projectType",
      header: "Type",
      size: 120,
      cell: ({ row }) => {
        const type = row.original.projectType;
        return (
          <AdminBadge variant={TYPE_VARIANT[type] ?? "neutral"}>
            {type || "—"}
          </AdminBadge>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 140,
      cell: ({ row }) => {
        const status = (row.original.status as string) || "unknown";
        return (
          <AdminBadge variant={statusBadgeVariant(status)} dot>
            {status.replace(/-/g, " ")}
          </AdminBadge>
        );
      },
    },
    {
      accessorKey: "year",
      header: "Year",
      size: 90,
      cell: ({ row }) => (
        <span className="text-sm text-slate-700 dark:text-slate-300 tabular-nums">
          {row.original.year ?? "—"}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      size: 110,
      enableSorting: false,
      cell: ({ row }) => (
        <RowActions>
          <EditAction
            href={`/admin/projects/edit?id=${row.original.id}`}
            label={`Edit ${row.original.title}`}
          />
          <DeleteAction
            onClick={() => handleDelete(row.original)}
            label={`Delete ${row.original.title}`}
          />
        </RowActions>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      emptyTitle="No projects yet"
      emptyDescription="Create your first project to feature it on the portfolio."
    />
  );
};
