import React, { useEffect, useMemo, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../ui/DataTable";
import {
  AdminBadge,
  CellPrimary,
  CellSecondary,
  CellText,
  RowActions,
  EditAction,
  DeleteAction,
} from "../../ui/admin/primitives";
import { drunkDriversService } from "../../../lib/crime";
import { showToast, confirmDialog } from "../../../lib/admin-ui";
import type { DrunkDriver } from "../../../types/crime";

export const DrunkDriversTable = () => {
  const [data, setData] = useState<DrunkDriver[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    drunkDriversService
      .list()
      .then(setData)
      .catch((error) => console.error("Failed to load drunk drivers:", error))
      .finally(() => setIsLoading(false));
  }, []);

  const handleDelete = async (row: DrunkDriver) => {
    const ok = await confirmDialog({
      title: "Delete record",
      message: `Delete ${row.fullName} and ${row.photos.length} photo(s)? This cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "danger",
    });
    if (!ok) return;
    try {
      await drunkDriversService.remove(row.id);
      setData((prev) => prev.filter((item) => item.id !== row.id));
    } catch {
      showToast({ type: "error", title: "Delete failed", message: "Failed to delete the record." });
    }
  };

  const columns: ColumnDef<DrunkDriver>[] = useMemo(
    () => [
      {
        accessorKey: "fullName",
        header: "Name",
        cell: ({ row }) => (
          <div className="min-w-0">
            <CellPrimary>{row.original.fullName}</CellPrimary>
            <CellSecondary>{row.original.icNumber ? "IC on file" : "No IC"}</CellSecondary>
          </div>
        ),
      },
      {
        accessorKey: "convictedOn",
        header: "Convicted",
        cell: ({ row }) => <CellText>{row.original.convictedOn || "-"}</CellText>,
      },
      {
        id: "photos",
        header: "Photos",
        accessorFn: (r) => r.photos.length,
        cell: ({ row }) => <CellText>{row.original.photos.length}</CellText>,
      },
      {
        accessorKey: "published",
        header: "Status",
        cell: ({ row }) =>
          row.original.published ? (
            <AdminBadge variant="success" dot>Published</AdminBadge>
          ) : (
            <AdminBadge variant="warning" dot>Draft</AdminBadge>
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
              href={`/admin/crime/drunk-drivers/edit?id=${row.original.id}`}
              label={`Edit ${row.original.fullName}`}
            />
            <DeleteAction onClick={() => handleDelete(row.original)} label={`Delete ${row.original.fullName}`} />
          </RowActions>
        ),
      },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      emptyTitle="No records yet"
      emptyDescription="Add a convicted case with its court reference and source."
    />
  );
};
