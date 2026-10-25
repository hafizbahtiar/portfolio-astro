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
import { subscriptionsService } from "../../../lib/subscriptions";
import { showToast, confirmDialog } from "../../../lib/admin-ui";
import type { Currency, Subscription } from "../../../types/subscriptions";

const money = (amount: number, currency: Currency) =>
  `${currency === "MYR" ? "RM" : "$"}${amount.toFixed(2)}`;

/** Fixed cost per month: yearly / 12; usage-only and free rows count only their metered usage. */
const perMonth = (s: Subscription) =>
  s.billing === "monthly" ? s.cost : s.billing === "yearly" ? s.cost / 12 : 0;

export const SubscriptionsTable = () => {
  const [data, setData] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    subscriptionsService
      .list()
      .then(setData)
      .catch((error) => console.error("Failed to load subscriptions:", error))
      .finally(() => setIsLoading(false));
  }, []);

  const handleDelete = async (row: Subscription) => {
    const ok = await confirmDialog({
      title: "Delete subscription",
      message: row.meterCode
        ? `Delete ${row.name}? Its meter goes with it, so the API refuses ${row.meterCode} calls until a subscription has that meter again.`
        : `Delete ${row.name}?`,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "danger",
    });
    if (!ok) return;
    try {
      await subscriptionsService.remove(row.id);
      setData((prev) => prev.filter((item) => item.id !== row.id));
    } catch {
      showToast({ type: "error", title: "Delete failed", message: "Failed to delete the subscription." });
    }
  };

  // Active rows only, per currency: fixed monthly share + this month's metered usage.
  const totals = useMemo(() => {
    const sum: Partial<Record<Currency, number>> = {};
    for (const s of data.filter((x) => x.active))
      sum[s.currency] = (sum[s.currency] ?? 0) + perMonth(s) + (s.usageCostThisMonth ?? 0);
    return (Object.entries(sum) as [Currency, number][]).map(([c, n]) => money(n, c)).join(" + ") || "-";
  }, [data]);

  const columns: ColumnDef<Subscription>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Service",
        cell: ({ row }) => (
          <div className="min-w-0">
            <CellPrimary>{row.original.name}</CellPrimary>
            <CellSecondary>{row.original.plan || "-"}</CellSecondary>
          </div>
        ),
      },
      {
        accessorKey: "cost",
        header: "Cost",
        cell: ({ row }) => {
          const s = row.original;
          if (s.billing === "free") return <CellText>Free</CellText>;
          if (s.billing === "usage")
            return <CellText>{s.unitPrice != null ? `${money(s.unitPrice, s.currency)} / 1,000` : "By use"}</CellText>;
          return <CellText>{`${money(s.cost, s.currency)} / ${s.billing === "yearly" ? "year" : "month"}`}</CellText>;
        },
      },
      {
        id: "usage",
        header: "This month",
        accessorFn: (r) => (r.monthlyCap ? r.usedThisMonth / r.monthlyCap : -1),
        cell: ({ row }) => {
          const s = row.original;
          if (!s.meterCode || s.monthlyCap == null) return <CellText>-</CellText>;
          const share = s.monthlyCap ? s.usedThisMonth / s.monthlyCap : 1;
          return (
            <div className="min-w-0 space-y-1">
              <AdminBadge variant={share >= 1 ? "danger" : share >= 0.8 ? "warning" : "neutral"}>
                {`${s.usedThisMonth.toLocaleString()} / ${s.monthlyCap.toLocaleString()}${share >= 1 ? " - stopped" : ""}`}
              </AdminBadge>
              <CellSecondary>
                {s.usageCostThisMonth ? `${money(s.usageCostThisMonth, s.currency)} past the free ${s.freeUnits ?? 0}` : "Within free use"}
              </CellSecondary>
            </div>
          );
        },
      },
      {
        accessorKey: "renewsOn",
        header: "Renews",
        cell: ({ row }) => <CellText>{row.original.renewsOn || "-"}</CellText>,
      },
      {
        accessorKey: "active",
        header: "Status",
        cell: ({ row }) =>
          row.original.active ? (
            <AdminBadge variant="success" dot>Active</AdminBadge>
          ) : (
            <AdminBadge variant="neutral" dot>Off</AdminBadge>
          ),
      },
      {
        id: "actions",
        header: "Actions",
        size: 110,
        enableSorting: false,
        cell: ({ row }) => (
          <RowActions>
            <EditAction href={`/admin/subscriptions/edit?id=${row.original.id}`} label={`Edit ${row.original.name}`} />
            <DeleteAction onClick={() => handleDelete(row.original)} label={`Delete ${row.original.name}`} />
          </RowActions>
        ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-700 dark:text-gray-300">
        <span className="font-semibold">This month (active):</span> {totals}
      </p>
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        emptyTitle="No subscriptions yet"
        emptyDescription="Add each paid service so its cost and renewal date sit in one place."
      />
    </div>
  );
};
