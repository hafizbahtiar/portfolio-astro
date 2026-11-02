// bun scripts/check-pcb.ts - PCB (MTD) against the worked examples in LHDN's 2026 specification
// (docs/sources/pcb/spesifikasi-pcb-2026.pdf). "p." = PDF page (the printed page number is one less).
// Every expected value below is printed in the PDF; none is computed here.
import { expect } from "bun:test";
import { naik5sen, pcb, pcbBukanPemastautin, selepasZakat } from "../src/lib/pcb";
import { caruman } from "../src/lib/kwsp";

// Exhibit 5 (p.46-47): category 3, 3 children, RM5,500 a month, EPF RM605, no TP1 deductions.
const ex5 = { gajiSen: 550_000, kwspSen: 60_500, kategori: 3 as const, anak: { biasa: 3 } };
const jan = pcb({ ...ex5, bulan: 1 }); // p.46
expect(jan.n, "Jan n").toBe(11);
expect(jan.K2, "Jan K2 (RM308.63)").toBe(30_863);
expect(jan.P, "Jan P (RM47,000.07)").toBe(4_700_007);
expect(jan.M, "Jan M").toBe(3_500_000);
expect(jan.R, "Jan R").toBe(6);
expect(jan.B, "Jan B").toBe(60_000);
expect(jan.pcbSen, "Jan MTD (RM110.00)").toBe(11_000);
const feb = pcb({ ...ex5, bulan: 2 }); // p.47 - X = January's RM110 comes from the month loop
expect(feb.n, "Feb n").toBe(10);
expect(feb.K, "Feb K").toBe(60_500);
expect(feb.X, "Feb X").toBe(11_000);
expect(feb.K2, "Feb K2 (RM279.00)").toBe(27_900);
expect(feb.P, "Feb P (RM47,000.00)").toBe(4_700_000);
expect(feb.pcbSen, "Feb MTD (RM110)").toBe(11_000);
// March (p.48): TP1 RM300 in March; X = RM220 from the loop.
const lp = [0, 0, 30_000, 30_000];
const mar = pcb({ ...ex5, bulan: 3, lpSen: lp });
expect([mar.n, mar.X, mar.K2, mar.LP, mar.P], "Mar n, X, K2 (RM242.77), ΣLP+LP1, P (RM46,700.07)").toEqual([9, 22_000, 24_277, 30_000, 4_670_007]);
expect(mar.pcbSen, "Mar MTD (RM108.20)").toBe(10_820);
// April (p.49-52): TP1 RM300 again (ΣLP RM300 from March) + bonus RM8,250 with EPF RM908, 5-step formula.
const apr = pcb({ ...ex5, bulan: 4, lpSen: lp, bonus: { gajiSen: 825_000, kwspSen: 90_800 } });
expect([apr.X, apr.K2, apr.P, apr.pcbSebelumZakat], "Apr step 1: X RM328.20, K2 RM197.50, P RM46,400, [C] RM106.20").toEqual([32_820, 19_750, 4_640_000, 10_620]);
const t = apr.tambahan!;
expect([t.setahun, t.K2, t.P, t.cukaiSetahun], "Apr [E] RM1,284, step 2 K2 RM84, P RM54,650, step 3 RM2,011.50").toEqual([128_400, 8_400, 5_465_000, 201_150]);
expect([t.pcbBonus, apr.pcbSen], "Apr step 4 RM727.50, step 5 RM833.70").toEqual([72_750, 83_370]);

// Non-resident (p.10): RM3,000 x 30% = RM900.00.
expect(pcbBukanPemastautin(300_000), "non-resident RM3,000").toBe(90_000);

// Term 2 (p.20): round up to the next 5 sen.
expect(naik5sen(28_702), "287.02 -> 287.05").toBe(28_705);
expect(naik5sen(15_206), "152.06 -> 152.10").toBe(15_210);
expect(naik5sen(11_000), "110.00 stays").toBe(11_000);

// Terms 3-5 (p.20-21), table 5(i): MTD before zakat < RM10 is not deducted; net after zakat < RM10 is.
expect(selepasZakat(800, 500), "5(i)a 8.00 - 5.00").toBe(0);
expect(selepasZakat(1_500, 2_000), "5(i)b 15.00 - 20.00").toBe(0);
expect(selepasZakat(1_500, 800), "5(i)c 15.00 - 8.00").toBe(700);
expect(selepasZakat(12_000, 10_000), "5(i)d 120.00 - 100.00").toBe(2_000);

// Cross-check against payroll.my (HR.my's calculator, not LHDN) - fetched 2026-11-02 from
// https://payroll.my/cs/payroll.php with "PCB (MTD)/SOCSO" = "2026 Jun", citizen, EPF 11% / 13% (12% over RM5,000).
// payroll.my has no month field; its answers equal our January. Owner's choice (2026-11-02): payroll.my cases are
// enough to show PCB on the page. Rows: [wage RM, category, children, zakat RM, non-resident, EPF employee RM, PCB RM].
// Known difference, NOT in the table: RM4,000 category 1 (and 3 with no children) - payroll.my RM16.70, ours RM50.00.
// LHDN cuts K2 to the sen (Term 1; Exhibit 5's K2 = RM308.63), so K2 = RM323.63 and P = RM35,000.07, just over
// RM35,000 where the RM400 rebate (B = -250) ends; payroll.my keeps P = RM35,000.00. We follow the spec.
const PAYROLL_MY: [number, 1 | 2 | 3, number, number, boolean, number, number][] = [
  [3000, 1, 0, 0, false, 330, 0],
  [3000, 2, 0, 0, false, 330, 0],
  [3000, 2, 2, 0, false, 330, 0],
  [3000, 3, 0, 0, false, 330, 0],
  [3000, 3, 3, 0, false, 330, 0],
  [4000, 2, 0, 0, false, 440, 0],
  [4000, 2, 2, 0, false, 440, 0],
  [4000, 3, 3, 0, false, 440, 0],
  [5000, 1, 0, 0, false, 550, 110],
  [5000, 2, 0, 0, false, 550, 90],
  [5000, 2, 2, 0, false, 550, 70],
  [5000, 3, 0, 0, false, 550, 110],
  [5000, 3, 3, 0, false, 550, 80],
  [6500, 1, 0, 0, false, 715, 262.5],
  [6500, 2, 0, 0, false, 715, 225.85],
  [6500, 2, 2, 0, false, 715, 189.2],
  [6500, 3, 0, 0, false, 715, 262.5],
  [6500, 3, 3, 0, false, 715, 207.5],
  [8000, 1, 0, 0, false, 880, 514.2],
  [8000, 2, 0, 0, false, 880, 450.85],
  [8000, 2, 2, 0, false, 880, 387.5],
  [8000, 3, 0, 0, false, 880, 514.2],
  [8000, 3, 3, 0, false, 880, 419.2],
  [10000, 1, 0, 0, false, 1100, 929.2],
  [10000, 2, 0, 0, false, 1100, 845.85],
  [10000, 2, 2, 0, false, 1100, 767.5],
  [10000, 3, 0, 0, false, 1100, 929.2],
  [10000, 3, 3, 0, false, 1100, 804.2],
  [15000, 1, 0, 0, false, 1650, 2179.2],
  [15000, 2, 0, 0, false, 1650, 2095.85],
  [15000, 2, 2, 0, false, 1650, 2012.5],
  [15000, 3, 0, 0, false, 1650, 2179.2],
  [15000, 3, 3, 0, false, 1650, 2054.2],
  [25000, 1, 0, 0, false, 2750, 4679.2],
  [25000, 2, 0, 0, false, 2750, 4595.85],
  [25000, 2, 2, 0, false, 2750, 4512.5],
  [25000, 3, 0, 0, false, 2750, 4679.2],
  [25000, 3, 3, 0, false, 2750, 4554.2],
  [6500, 1, 0, 100, false, 715, 162.5],
  [10000, 1, 0, 100, false, 1100, 829.2],
  [15000, 2, 2, 300, false, 1650, 1712.5],
  [3000, 1, 0, 0, true, 330, 900],
  [8000, 1, 0, 0, true, 880, 2400],
];
for (const [gaji, kategori, anak, zakat, bukan, epf, expected] of PAYROLL_MY) {
  const kwspSen = caruman(gaji * 100, "warganegara", false).pekerja;
  const label = `payroll.my RM${gaji} kat ${kategori} anak ${anak} zakat ${zakat}${bukan ? " non-resident" : ""}`;
  expect(kwspSen, `${label} EPF`).toBe(epf * 100);
  const got = bukan
    ? Math.max(pcbBukanPemastautin(gaji * 100) - zakat * 100, 0)
    : pcb({ gajiSen: gaji * 100, kwspSen, bulan: 1, kategori, anak: { biasa: anak }, zakatSen: zakat * 100 }).pcbSen;
  expect(got, label).toBe(Math.round(expected * 100));
}
const k4000 = pcb({ gajiSen: 400_000, kwspSen: 44_000, bulan: 1, kategori: 1 });
expect([k4000.K2, k4000.P, k4000.pcbSen], "RM4,000 known difference (spec truncation)").toEqual([32_363, 3_500_007, 5_000]);

// payroll.my with bonus ("Salary and Bonus") and allowable deduction, January, fetched 2026-11-02 - 25 of 37 equal.
// Rows: [wage RM, bonus RM, category, children, TP1 RM, EPF employer, EPF employee (on wage + bonus), PCB RM].
// The 12 others all differ for the K2 reason above: payroll.my does not cut K2 to the sen. 9 are 5 sen (e.g. RM8,000 +
// RM3,000 single: our year tax RM6,740.01 -> step 4 RM569.61, rounded up (Term 2) RM569.65; theirs RM569.60) and 3 are
// RM4,000 single (its normal-pay PCB is RM16.70, ours RM50.00, so its step 4 is RM366.30 higher).
const BONUS_MY: [number, number, 1 | 2 | 3, number, number, number, number, number][] = [
  [3000, 3000, 1, 0, 0, 780, 660, 0],
  [3000, 3000, 2, 2, 0, 780, 660, 0],
  [3000, 10000, 1, 0, 0, 1690, 1430, 140],
  [3000, 10000, 2, 2, 0, 1690, 1430, 0],
  [3000, 30000, 1, 0, 0, 4290, 3630, 1830],
  [3000, 30000, 2, 2, 0, 4290, 3630, 1200],
  [4000, 3000, 2, 2, 0, 910, 770, 0],
  [4000, 10000, 2, 2, 0, 1820, 1540, 720],
  [4000, 30000, 2, 2, 0, 4420, 3740, 2270],
  [5000, 3000, 1, 0, 0, 1040, 880, 290],
  [5000, 3000, 2, 2, 0, 1040, 880, 250],
  [5000, 10000, 1, 0, 0, 1950, 1650, 1060],
  [5000, 10000, 2, 2, 0, 1950, 1650, 670],
  [5000, 30000, 2, 2, 0, 4550, 3850, 2820],
  [8000, 30000, 1, 0, 0, 4560, 4180, 6993.8],
  [8000, 30000, 2, 2, 0, 4560, 4180, 6387.5],
  [15000, 30000, 1, 0, 0, 5400, 4950, 9678.8],
  [15000, 30000, 2, 2, 0, 5400, 4950, 9512.5],
  [5500, 8250, 3, 3, 0, 1656, 1518, 867.5],
  [5000, 0, 1, 0, 300, 650, 550, 108.5],
  [5000, 0, 1, 0, 3000, 650, 550, 95],
  [8000, 0, 1, 0, 300, 960, 880, 509.45],
  [8000, 0, 1, 0, 3000, 960, 880, 466.7],
  [15000, 0, 1, 0, 300, 1800, 1650, 2172.95],
  [15000, 0, 1, 0, 3000, 1800, 1650, 2116.7],
];
const withBonus = (gaji: number, bonus: number, kategori: 1 | 2 | 3, anak: number, lp: number) => {
  const biasa = caruman(gaji * 100, "warganegara", false);
  const semua = caruman((gaji + bonus) * 100, "warganegara", false, gaji * 100);
  const p = pcb({
    gajiSen: gaji * 100, kwspSen: biasa.pekerja, bulan: 1, kategori, anak: { biasa: anak }, lpSen: [lp * 100],
    bonus: bonus ? { gajiSen: bonus * 100, kwspSen: semua.pekerja - biasa.pekerja } : undefined
  });
  return [semua.majikan / 100, semua.pekerja / 100, p.pcbSen / 100];
};
for (const [gaji, bonus, kategori, anak, lp, ...expected] of BONUS_MY) {
  expect(withBonus(gaji, bonus, kategori, anak, lp), `payroll.my RM${gaji} + bonus RM${bonus} kat ${kategori} TP1 RM${lp}`).toEqual(expected);
}
expect(withBonus(8000, 3000, 1, 0, 0)[2], "known: K2 cut to the sen -> RM1,083.85 (payroll.my RM1,083.80)").toBe(1083.85);
expect(withBonus(4000, 3000, 1, 0, 0), "known: RM4,000 single + bonus, 13% employer rule").toEqual([910, 770, 230]);

console.log("check-pcb: ok", `Mar RM${mar.pcbSen / 100}`, `Apr RM${apr.pcbSen / 100}`, `${PAYROLL_MY.length} + ${BONUS_MY.length} payroll.my cases`, `Jan RM${jan.pcbSen / 100}`, `Feb RM${feb.pcbSen / 100}`);
