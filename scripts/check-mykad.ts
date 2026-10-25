// bun scripts/check-mykad.ts - src/lib/mykad.ts mirrors hono-workers src/utils/mykad.ts (IC -> date of birth -> age).
import { expect } from "bun:test";
import { ageOn, dobFromIc, isRealDate } from "../src/lib/mykad";
import * as api from "../../hono-workers/src/utils/mykad";

const today = new Date("2026-10-25");
const ics = ["900101145678", "900101-14-5678", "050315101234", "261024101234", "270101101234", "901332145678", "900230145678", "abc"];
for (const ic of ics) expect(dobFromIc(ic, today)).toBe(api.dobFromIc(ic.replace(/[\s-]/g, ""), today));
expect(dobFromIc("900101-14-5678", today)).toBe("1990-01-01");
expect(dobFromIc("050315101234", today)).toBe("2005-03-15");
expect(dobFromIc("270101101234", today)).toBe("1927-01-01"); // a year after this year's two digits = 1900s

const pairs: [string, string][] = [["1990-01-03", "2026-01-02"], ["1990-01-02", "2026-01-02"], ["2024-02-29", "2025-02-28"], ["2027-01-01", "2026-01-02"]];
for (const [dob, on] of pairs) expect(ageOn(dob, on)).toBe(api.ageOn(dob, on));
expect(ageOn("1990-01-03", "2026-01-02")).toBe(35);

for (const d of ["2026-13-01", "2026-02-30", "2024-02-29", "2026-1-01"]) expect(isRealDate(d)).toBe(api.isRealDate(d));
console.log("check-mykad: frontend IC/age preview matches the API");
