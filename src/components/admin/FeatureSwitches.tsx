import React, { useEffect, useState } from "react";
import { aiSettingsError, aiSettingsService, type Feature } from "../../lib/ai-settings";
import { authService, can } from "../../lib/auth";
import { adminTime, showToast } from "../../lib/admin-ui";

// Owner on/off switches (backend services/features.ts). /admin/ai shows the moderation group,
// /admin/showcase-modules the showcase group. Saves on toggle.

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

/** A whole page of one group's switches - owner only (the API's /owner/features gate is the real wall). */
export function FeatureGroupSwitches({ group, title, empty }: { group: Feature["group"]; title: string; empty: string }) {
  const [features, setFeatures] = useState<Feature[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    void (async () => {
      if (!can(await authService.me(), "roles.assign")) {
        window.location.replace("/admin");
        return;
      }
      try {
        setFeatures((await aiSettingsService.features()).filter((f) => f.group === group));
      } catch (e) {
        setError(aiSettingsError(e));
      }
    })();
  }, [group]);

  if (error) return <p className="admin-error">Couldn't load the switches: {error}</p>;
  if (!features) return <p className="admin-help">Loading…</p>;
  if (!features.length) return <p className="admin-help">{empty}</p>;
  return <FeaturesCard title={title} features={features} onSaved={(n) => setFeatures((prev) => prev?.map((f) => (f.code === n.code ? n : f)) ?? null)} />;
}
