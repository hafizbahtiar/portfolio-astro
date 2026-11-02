// bun scripts/check-perkeso.ts - SOCSO (Act 4, with Lindung 24) and EIS (Act 800) against PERKESO's tables
// (docs/sources/perkeso/, see scripts/perkeso/caruman.py) and a payroll.my cross-check.
import { expect } from "bun:test";
import { perkeso } from "../src/lib/perkeso";

const rm = (sen: number) => sen / 100;
const pick = (r: ReturnType<typeof perkeso>) => [r.majikan, r.pekerja, r.sipMajikan, r.sipPekerja].map(rm);

// Official rows, as printed (FAQ Lampiran 1 / Act 800 image), June 2026 onwards. [wage RM, SOCSO er, ee, EIS each].
const OFFICIAL: [number, number, number, number][] = [
  [30, 0.4, 0.3, 0.05], // row 1: RM0.40, RM0.10 + RM0.20, 5 sen
  [30.01, 0.7, 0.5, 0.1], // row 2
  [5000, 86.65, 61.9, 9.9], // row 54: RM86.65, RM24.75 + RM37.15, RM9.90
  [5000.01, 88.35, 63.1, 10.1], // row 55
  [6000, 104.15, 74.4, 11.9], // row 64: RM104.15, RM29.75 + RM44.65, RM11.90
  [20000, 104.15, 74.4, 11.9], // row 65: over RM6,000 = the ceiling row
];
for (const [gaji, er, ee, sip] of OFFICIAL) {
  expect(pick(perkeso(Math.round(gaji * 100), "warganegara", false, 6)), `official RM${gaji}`).toEqual([er, ee, sip, sip]);
}
// Second category (60+ / foreign): row 64 RM74.40 employer, RM44.65 SKBBK employee; no EIS.
expect(pick(perkeso(600_000, "warganegara", true, 6)), "60+ RM6,000").toEqual([74.4, 44.65, 0, 0]);
// Before June 2026 there is no SKBBK: first category RM5,000 employee = invalidity RM24.75 only; second = RM0.
expect(pick(perkeso(500_000, "warganegara", false, 5)), "May RM5,000").toEqual([86.65, 24.75, 9.9, 9.9]);
expect(perkeso(500_000, "asing", false, 5).pekerja, "May foreign employee").toBe(0);
expect(pick(perkeso(0, "warganegara", false, 6)), "no wage").toEqual([0, 0, 0, 0]);

// payroll.my (HR.my, not PERKESO), fetched 2026-11-02 with "2026 Jun": SOCSO category "Employment Injury & Invalidity
// & Lindung 24" + EIS for a citizen under 60, "Employment Injury & Lindung 24" without EIS for 60+ and foreign.
// [status, 60+, wage RM, SOCSO er, SOCSO ee, EIS er, EIS ee] - all 27 equal ours.
const PAYROLL_MY: ["warganegara" | "asing", boolean, number, number, number, number, number][] = [
  ["warganegara", false, 25, 0.4, 0.3, 0.05, 0.05],
  ["warganegara", false, 1500, 25.35, 18.1, 2.9, 2.9],
  ["warganegara", false, 3000, 51.65, 36.9, 5.9, 5.9],
  ["warganegara", false, 4950, 86.65, 61.9, 9.9, 9.9],
  ["warganegara", false, 5000, 86.65, 61.9, 9.9, 9.9],
  ["warganegara", false, 5000.5, 88.35, 63.1, 10.1, 10.1],
  ["warganegara", false, 5950, 104.15, 74.4, 11.9, 11.9],
  ["warganegara", false, 6000, 104.15, 74.4, 11.9, 11.9],
  ["warganegara", false, 8000, 104.15, 74.4, 11.9, 11.9],
  ["warganegara", true, 25, 0.3, 0.2, 0, 0],
  ["warganegara", true, 1500, 18.1, 10.85, 0, 0],
  ["warganegara", true, 3000, 36.9, 22.15, 0, 0],
  ["warganegara", true, 4950, 61.9, 37.15, 0, 0],
  ["warganegara", true, 5000, 61.9, 37.15, 0, 0],
  ["warganegara", true, 5000.5, 63.1, 37.85, 0, 0],
  ["warganegara", true, 5950, 74.4, 44.65, 0, 0],
  ["warganegara", true, 6000, 74.4, 44.65, 0, 0],
  ["warganegara", true, 8000, 74.4, 44.65, 0, 0],
  ["asing", false, 25, 0.3, 0.2, 0, 0],
  ["asing", false, 1500, 18.1, 10.85, 0, 0],
  ["asing", false, 3000, 36.9, 22.15, 0, 0],
  ["asing", false, 4950, 61.9, 37.15, 0, 0],
  ["asing", false, 5000, 61.9, 37.15, 0, 0],
  ["asing", false, 5000.5, 63.1, 37.85, 0, 0],
  ["asing", false, 5950, 74.4, 44.65, 0, 0],
  ["asing", false, 6000, 74.4, 44.65, 0, 0],
  ["asing", false, 8000, 74.4, 44.65, 0, 0],
];
for (const [status, umur60, gaji, ...expected] of PAYROLL_MY) {
  expect(pick(perkeso(Math.round(gaji * 100), status, umur60, 11)), `payroll.my ${status} ${umur60 ? "60+" : ""} RM${gaji}`).toEqual(expected);
}
console.log("check-perkeso: ok", `${OFFICIAL.length} official rows`, `${PAYROLL_MY.length} payroll.my cases`);
