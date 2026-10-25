import React, { useEffect, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Switch } from "@/components/shadcn/ui/switch";
import { DataTable } from "../ui/DataTable";
import { CellPrimary, CellSecondary, CellText } from "../ui/admin/primitives";
import { aiSettingsError, aiSettingsService, type Feature } from "../../lib/ai-settings";
import { authService, can } from "../../lib/auth";
import { adminTime, confirmDialog, showToast } from "../../lib/admin-ui";

// Owner on/off switches (backend services/features.ts). /admin/ai shows the moderation group,
// /admin/showcase-modules the showcase group (table, confirm first). FeaturesCard saves on toggle.

export function FeaturesCard({ title = "Features", features, onSaved }: { title?: string; features: Feature[]; onSaved: (f: Feature) => void }) {
  const [busy, setBusy] = useState("");
  const toggle = async (f: Feature, enabled: boolean) => {
    setBusy(f.code);
    try {
      const next = await aiSettingsService.setFeature(f.code, enabled);
      if (next) onSaved(next);
      showToast({ type: "success", title: `${f.label} ${enabled ? "on" : "off"}` });
    } catch (e) {
      showToast({ type: "error", title: "Couldn't change the switch", message: aiSettingsError(e) });
    } finally {
      setBusy("");
    }
  };
  return (
    <div className="admin-card space-y-3">
      <h3 className="admin-card-title">{title}</h3>
      <ul className="space-y-3">
        {features.map((f) => (
          <li key={f.code} className="flex items-start gap-3">
            <input id={`feature-${f.code}`} type="checkbox" className="mt-1" checked={f.enabled} disabled={busy === f.code}
              onChange={(e) => void toggle(f, e.target.checked)} />
            <label htmlFor={`feature-${f.code}`} className="space-y-0.5">
              <span className="admin-label block">{f.label}</span>
              <span className="admin-help block">{f.description}</span>
              <span className="admin-help block">
                {f.overridden && f.updatedAt ? `Set ${adminTime(f.updatedAt)}${f.updatedBy?.displayName ? ` by ${f.updatedBy.displayName}` : ""}` : `Default (${f.enabled ? "on" : "off"})`}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * A whole page of one group's switches (/admin/showcase-modules) - the admin DataTable with a
 * switch per row; every change asks first. Owner only (the API's /owner/features gate is the real wall).
 */
export function FeatureGroupSwitches({ group, empty }: { group: Feature["group"]; empty: string }) {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState("");

  useEffect(() => {
    void (async () => {
      if (!can(await authService.me(), "roles.assign")) {
        window.location.replace("/admin");
        return;
      }
      try {
        setFeatures((await aiSettingsService.features()).filter((f) => f.group === group));
      } catch (e) {
        showToast({ type: "error", title: "Couldn't load the switches", message: aiSettingsError(e) });
      } finally {
        setLoading(false);
      }
    })();
  }, [group]);

  const toggle = async (f: Feature, enabled: boolean) => {
    const ok = await confirmDialog({
      title: `Turn ${f.label} ${enabled ? "on" : "off"}?`,
      message: enabled
        ? "The public page and its showcase card go live for every visitor."
        : "The public page and its API will answer 404 and the showcase card hides. Your data stays.",
      confirmText: enabled ? "Turn on" : "Turn off",
      cancelText: "Cancel",
      variant: enabled ? "primary" : "danger",
    });
    if (!ok) return;
    setBusy(f.code);
    try {
      const next = await aiSettingsService.setFeature(f.code, enabled);
      if (next) setFeatures((prev) => prev.map((x) => (x.code === next.code ? next : x)));
      showToast({ type: "success", title: `${f.label} ${enabled ? "on" : "off"}` });
    } catch (e) {
      showToast({ type: "error", title: "Couldn't change the switch", message: aiSettingsError(e) });
    } finally {
      setBusy("");
    }
  };

  const columns: ColumnDef<Feature>[] = [
    {
      accessorKey: "label",
      header: "Module",
      cell: ({ row }) => (
        <div className="min-w-0">
          <CellPrimary>{row.original.label}</CellPrimary>
          <CellSecondary>{row.original.description}</CellSecondary>
        </div>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: "Last change",
      cell: ({ row }) => {
        const f = row.original;
        return (
          <CellText>
            {f.overridden && f.updatedAt
              ? `${adminTime(f.updatedAt)}${f.updatedBy?.displayName ? ` by ${f.updatedBy.displayName}` : ""}`
              : "Default"}
          </CellText>
        );
      },
    },
    {
      id: "actions",
      header: "On",
      size: 90,
      enableSorting: false,
      cell: ({ row }) => {
        const f = row.original;
        return (
          <Switch
            checked={f.enabled}
            disabled={busy === f.code}
            onCheckedChange={(on) => void toggle(f, on)}
            aria-label={`${f.label}: ${f.enabled ? "on" : "off"}`}
          />
        );
      },
    },
  ];

  return <DataTable columns={columns} data={features} isLoading={loading} emptyTitle={empty} emptyDescription="Add one in the backend FEATURES list with group: 'showcase'." />;
}
