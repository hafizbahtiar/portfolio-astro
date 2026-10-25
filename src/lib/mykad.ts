// Mirror of the API's src/utils/mykad.ts (hono-workers) - the form shows the same date of birth and
// age the API will save. The API recomputes on save, so a drift here only affects the preview.

export const isRealDate = (v: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const t = Date.parse(`${v}T00:00:00Z`);
  return !Number.isNaN(t) && new Date(t).toISOString().startsWith(v);
};

/** YYMMDD of a 12-digit IC (dashes allowed) -> YYYY-MM-DD; a year after this year's two digits = 1900s. */
export const dobFromIc = (ic: string, today = new Date()): string | null => {
  const digits = ic.replace(/[\s-]/g, "");
  if (!/^\d{12}$/.test(digits)) return null;
  const yy = Number(digits.slice(0, 2));
  const century = yy > today.getUTCFullYear() % 100 ? 1900 : 2000;
  const dob = `${century + yy}-${digits.slice(2, 4)}-${digits.slice(4, 6)}`;
  return isRealDate(dob) ? dob : null;
};

/** Completed years from `dob` to `on`, null when `on` is before `dob`. */
export const ageOn = (dob: string, on: string): number | null => {
  if (on < dob) return null;
  const [y1, m1, d1] = dob.split("-").map(Number);
  const [y2, m2, d2] = on.split("-").map(Number);
  return y2 - y1 - (m2 < m1 || (m2 === m1 && d2 < d1) ? 1 : 0);
};
