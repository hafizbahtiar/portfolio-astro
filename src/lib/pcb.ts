// PCB (Potongan Cukai Bulanan / MTD) for normal remuneration, per LHDN's computerized-calculation
// specification (src/data/pcb/2026.ts; page refs there). Pure, all amounts in integer sen.
// Scope: resident, the same wage every month from January, allowable deductions (TP1, LP) per month, and one
// additional remuneration (bonus) in the requested month only (5-step formula, spec p.12-13). No TP3 / BIK.
import { PCB_2026 } from "../data/pcb/2026";

export type DataPcb = typeof PCB_2026;
export type Kategori = 1 | 2 | 3;

export interface InputPcb {
  gajiSen: number; // Y1: monthly normal remuneration (taxable part only)
  kwspSen: number; // K1: employee EPF on that wage (src/lib/kwsp.ts)
  bulan: number; // 1-12: month being paid
  kategori: Kategori; // 1 single, 2 spouse not working, 3 spouse working / divorced / widowed / single with adopted child
  anak?: { biasa?: number; ipt?: number; oku?: number; okuIpt?: number };
  oku?: boolean; // DU
  pasanganOku?: boolean; // SU
  zakatSen?: number; // zakat deducted every month
  lpSen?: number[]; // allowable deductions (TP1) by month, index 0 = January; earlier months add up as ΣLP
  bonus?: { gajiSen: number; kwspSen: number }; // Yt and Kt: additional remuneration paid in `bulan`, and its EPF
}

// Term 2: 1-4 sen up to 5, 6-9 up to 10.
export const naik5sen = (sen: number) => Math.ceil(sen / 5) * 5;

// Terms 3-5: MTD under RM10 before zakat is not deducted; after zakat, whatever is left is.
export const selepasZakat = (mtdSen: number, zakatSen: number) => Math.max((mtdSen < 1_000 ? 0 : mtdSen) - zakatSen, 0);

// shortcut: the spec gives only "30% of remuneration" (p.10); Term 2's 5-sen rounding is applied too.
export const pcbBukanPemastautin = (gajiSen: number, d: DataPcb = PCB_2026) =>
  naik5sen(Math.trunc((gajiSen * d.kadarBukanPemastautin) / 100));

export function pcb(input: InputPcb, d: DataPcb = PCB_2026) {
  const { gajiSen: Y, kwspSen, bulan, kategori, anak = {}, oku, pasanganOku, zakatSen: zakat = 0, lpSen = [], bonus } = input;
  if (!Number.isInteger(bulan) || bulan < 1 || bulan > 12) throw new RangeError(`bulan ${bulan}`);
  const had = d.hadKwsp * 100;
  const C =
    kategori === 1
      ? 0 // category 1: C = 0 (p.11)
      : (anak.biasa ?? 0) * d.anak.biasa + (anak.ipt ?? 0) * d.anak.ipt + (anak.oku ?? 0) * d.anak.oku + (anak.okuIpt ?? 0) * d.anak.okuIpt;
  const pelepasan = 100 * (d.D + (kategori === 2 ? d.S : 0) + (oku ? d.DU : 0) + (pasanganOku ? d.SU : 0) + d.Q * C);

  // Σ(Y−K), K, X, Z are what earlier months of this year paid; with one constant wage they are
  // rebuilt by running January up to the requested month.
  // Table 1 for a P (sen): M, R, B and the year's tax, cut to the sen (Term 1).
  const cukai = (P: number) => {
    const baris = d.jadual1.findLast(([M]) => P > M * 100);
    const [M, R, B13, B2] = baris ? baris.map((v, i) => (i === 1 ? v : v * 100)) : [0, 0, 0, 0];
    const B = kategori === 2 ? B2 : B13;
    return { M, R, B, cukaiSetahun: baris ? Math.trunc(((P - M) * R) / 100) + B : 0 };
  };

  let sigmaYK = 0, K = 0, X = 0, Z = 0, sigmaLP = 0;
  for (let m = 1; ; m++) {
    const n = 12 - m;
    const LP = sigmaLP + (lpSen[m - 1] ?? 0); // ΣLP + LP1
    const K1 = Math.min(kwspSen, had - K); // K + K1 + K2·n within the yearly qualifying amount
    const K2 = n ? Math.min(Math.trunc((had - K - K1) / n), K1) : 0;
    const P = sigmaYK + (Y - K1) + (Y - K2) * n - pelepasan - LP;
    const { M, R, B, cukaiSetahun } = cukai(P);
    const semasa = naik5sen(Math.max(Math.trunc((cukaiSetahun - (Z + X)) / (n + 1)), 0)); // Step 1[C]
    const pcbSebelumZakat = selepasZakat(semasa, 0);
    const bersih = selepasZakat(pcbSebelumZakat, zakat); // Step 1[D]
    if (m === bulan) {
      const biasa = { n, K, K1, K2, X, Z, sigmaYK, sigmaLP, LP, P, M, R, B, cukaiSetahun, pcbSebelumZakat };
      if (!bonus || bonus.gajiSen <= 0) return { ...biasa, pcbSen: bersih, tambahan: null };
      // Steps 1[E]-5: the year's tax with the bonus, minus what normal pay will have paid by December.
      const setahun = X + semasa * (n + 1); // Step 1[E]
      const Kt = Math.min(bonus.kwspSen, had - K - K1); // Kt*: within the qualifying amount too
      const K2t = n ? Math.min(Math.trunc((had - K - K1 - Kt) / n), K1) : 0;
      const Pt = sigmaYK + (Y - K1) + (Y - K2t) * n + (bonus.gajiSen - Kt) - pelepasan - LP; // Step 2[B]
      const t = cukai(Pt); // Step 3
      const pcbBonus = naik5sen(Math.max(t.cukaiSetahun - (setahun + Z), 0)); // Step 4
      return { ...biasa, pcbSen: bersih + pcbBonus, tambahan: { setahun, Kt, K2: K2t, P: Pt, ...t, pcbBonus } }; // Step 5
    }
    sigmaYK += Y - K1;
    K += K1;
    X += bersih;
    Z += zakat;
    sigmaLP = LP;
  }
}
