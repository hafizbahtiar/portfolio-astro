import React, { useEffect, useMemo, useState } from "react";
import { Lock, Plus, Save, Trash2 } from "lucide-react";
import { accessService, type PermissionInfo, type RoleInfo } from "../../../lib/access";
import { extractApiError } from "../../../lib/projects-cms";
import { showToast, confirmDialog } from "../../../lib/admin-ui";

// Owner-only page (roles.*). The owner role always has every permission and is shown
// locked; role administration (roles.*) can't be granted to another role - the backend
// rejects it, so those boxes are disabled here.
const OWNER_ONLY_MODULE = "roles";
const CODE = /^[a-z][a-z0-9_]{1,31}$/;

export function RolesManager() {
  const [roles, setRoles] = useState<RoleInfo[]>([]);
  const [catalogue, setCatalogue] = useState<PermissionInfo[]>([]);
  const [drafts, setDrafts] = useState<Record<string, Set<string>>>({});
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState({ code: "", name: "" });

  const load = async () => {
    try {
      const [roleList, perms] = await Promise.all([accessService.listRoles(), accessService.listPermissions()]);
      setRoles(roleList);
      setCatalogue(perms);
      setDrafts(Object.fromEntries(roleList.map((r) => [r.code, new Set(r.permissions)])));
    } catch (e) {
      showToast({ type: "error", title: "Load failed", message: extractApiError(e).message });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { void load(); }, []);

  // module → its permissions, in catalogue order
  const modules = useMemo(() => {
    const byModule = new Map<string, PermissionInfo[]>();
    catalogue.forEach((p) => byModule.set(p.module, [...(byModule.get(p.module) ?? []), p]));
    return [...byModule.entries()];
  }, [catalogue]);

  const toggle = (role: string, code: string) =>
    setDrafts((prev) => {
      const next = new Set(prev[role]);
      next.has(code) ? next.delete(code) : next.add(code);
      return { ...prev, [role]: next };
    });

  const dirty = (r: RoleInfo) => {
    const d = drafts[r.code];
    return !!d && (d.size !== r.permissions.length || r.permissions.some((p) => !d.has(p)));
  };

  const save = async (r: RoleInfo) => {
    try {
      await accessService.updateRole(r.code, { permissions: [...drafts[r.code]] });
      showToast({ type: "success", title: `${r.name} saved` });
      await load();
    } catch (e) {
      showToast({ type: "error", title: "Save failed", message: extractApiError(e).message });
    }
  };

  const add = async () => {
    const code = draft.code.trim().toLowerCase();
    if (!CODE.test(code) || !draft.name.trim()) {
      showToast({ type: "warning", title: "Invalid role", message: "Code: lowercase letters, numbers, _ (2-32). Name required." });
      return;
    }
    try {
      await accessService.createRole({ code, name: draft.name.trim() });
      setDraft({ code: "", name: "" });
      await load();
    } catch (e) {
      const { message, field } = extractApiError(e);
      showToast({ type: "error", title: field ? `Invalid ${field}` : "Add failed", message });
    }
  };

  const remove = async (r: RoleInfo) => {
    const ok = await confirmDialog({ title: "Delete role", message: `Delete "${r.name}"?`, variant: "danger", confirmText: "Delete" });
    if (!ok) return;
    try { await accessService.deleteRole(r.code); await load(); }
    catch (e) { showToast({ type: "error", title: "Delete failed", message: extractApiError(e).message }); }
  };

  if (loading) return <p className="admin-help">Loading roles…</p>;

  return (
    <div className="space-y-6">
      <div className="admin-card space-y-3">
        <h3 className="admin-card-title">Add role</h3>
        <div className="flex flex-wrap items-center gap-2">
          <input className="admin-input w-40 font-mono" placeholder="editor" value={draft.code}
            onChange={(e) => setDraft({ ...draft, code: e.target.value })} aria-label="New role code" />
          <input className="admin-input max-w-56" placeholder="Editor" value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); void add(); } }} aria-label="New role name" />
          <button type="button" className="admin-btn admin-btn-primary" onClick={add}>
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
        <p className="admin-help">Starts with no permissions. Give it admin.access to let it into the admin area.</p>
      </div>

      {roles.map((r) => {
        const locked = r.code === "owner";
        const granted = drafts[r.code] ?? new Set<string>();
        return (
          <section key={r.code} className="admin-card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="admin-card-title flex items-center gap-2">
                  {r.name} <span className="font-mono text-xs font-normal text-gray-500 dark:text-gray-400">{r.code}</span>
                  {locked && <Lock className="h-3.5 w-3.5 text-gray-400" aria-label="Locked" />}
                </h3>
                <p className="admin-help">
                  {locked ? "Always has every permission." : `${r.userCount} ${r.userCount === 1 ? "user" : "users"}${r.isSystem ? " · system role" : ""}`}
                </p>
              </div>
              {!locked && (
                <div className="flex items-center gap-2">
                  <button type="button" className="admin-btn admin-btn-primary" disabled={!dirty(r)} onClick={() => save(r)}>
                    <Save className="h-4 w-4" /> Save
                  </button>
                  {!r.isSystem && (
                    <button type="button" className="admin-btn admin-btn-danger px-2!" disabled={r.userCount > 0}
                      title={r.userCount > 0 ? "Reassign its users first" : undefined}
                      onClick={() => remove(r)} aria-label={`Delete ${r.name}`}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {modules.map(([module, perms]) => (
                <fieldset key={module} className="space-y-1">
                  <legend className="font-mono text-xs/6 tracking-widest text-gray-500 uppercase dark:text-gray-400">{module}</legend>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {perms.map((p) => (
                      <label key={p.code} className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300" title={p.description ?? p.code}>
                        <input
                          type="checkbox"
                          checked={locked || granted.has(p.code)}
                          disabled={locked || module === OWNER_ONLY_MODULE}
                          onChange={() => toggle(r.code, p.code)}
                        />
                        {p.action}
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
