// PERKESO contributions for one month's wages: Act 4 (SOCSO, with the Lindung 24 / SKBBK employee share from June
// 2026 wages) and Act 800 (EIS), from the official band tables in src/data/perkeso/2026-06.ts. Amounts in sen.
import { PERKESO_2026_06 as T } from "../data/perkeso/2026-06";
import type { StatusKwsp } from "./kwsp";

export type JenisPerkeso = "pertama" | "kedua";

/** First month (of 2026) with the Lindung 24 employee share. */
export const BULAN_SKBBK = 6;

export function perkeso(gajiSen: number, status: StatusKwsp, umur60: boolean, bulan: number) {
  // Second category (employment injury only) for workers aged 60+ and foreign workers; EIS covers citizens and PR
  // under 60 only.
  const jenis: JenisPerkeso = umur60 || status === "asing" ? "kedua" : "pertama";
  const sipLayak = !umur60 && status !== "asing";
  if (gajiSen <= 0) return { jenis, majikan: 0, pekerja: 0, skbbk: 0, sipMajikan: 0, sipPekerja: 0, sipLayak };
  const i = T.bands.findIndex((hulu) => gajiSen <= hulu * 100);
  const row = i === -1 ? T.bands.length : i; // over RM6,000 = the last row
  const skbbkBerlaku = bulan >= BULAN_SKBBK;
  let majikan: number, keilatan: number, skbbk: number;
  if (jenis === "pertama") [majikan, keilatan, skbbk] = T.pertama[row];
  else[[majikan, skbbk], keilatan] = [T.kedua[row], 0];
  if (!skbbkBerlaku) skbbk = 0;
  const sip = sipLayak ? T.sip[row] : 0;
  return { jenis, majikan, pekerja: keilatan + skbbk, skbbk, sipMajikan: sip, sipPekerja: sip, sipLayak };
}
