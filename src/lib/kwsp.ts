// KWSP (EPF) contribution for one month's wages, per the Third Schedule effective October 2025
// wages (docs/sources/kwsp/third-schedule-2025-10-01.pdf). All amounts in sen.
import { THIRD_SCHEDULE } from "../data/kwsp/2025-10";

/** "pr" also covers non-citizens registered with KWSP before 1 August 1998 (Parts A/C). */
export type StatusKwsp = "warganegara" | "pr" | "asing";
export type Bahagian = "A" | "C" | "E" | "F";

// Basis points [employer, employee] for wages above RM20,000 (A/C/E) and for Part F at any wage.
const KADAR: Record<Bahagian, [number, number]> = { A: [1200, 1100], C: [600, 550], E: [400, 0], F: [200, 200] };

export function bahagian(status: StatusKwsp, umur60: boolean): Bahagian {
  if (status === "asing") return "F";
  if (!umur60) return "A";
  return status === "warganegara" ? "E" : "C";
}

/** gajiBiasaSen: the normal monthly wage when `gajiSen` includes a bonus (Part A note below). */
export interface Caruman { bahagian: Bahagian; majikan: number; pekerja: number; jumlah: number }

export function caruman(gajiSen: number, status: StatusKwsp, umur60: boolean, gajiBiasaSen = gajiSen): Caruman {
  const b = bahagian(status, umur60);
  // Part A note (Third Schedule p.12): a bonus that takes a RM5,000-and-below wage over RM5,000 that month -
  // employer pays 13% of the month's wages, rounded up to the next ringgit; the employee share follows the table.
  if (b === "A" && gajiBiasaSen <= 500_000 && gajiSen > 500_000) {
    const pekerja = caruman(gajiSen, status, umur60).pekerja;
    const majikan = Math.ceil((gajiSen * 13) / 10_000) * 100;
    return { bahagian: b, majikan, pekerja, jumlah: majikan + pekerja };
  }
  // Up to RM20,000 the Act requires the band amounts, not an exact percentage.
  if (b !== "F" && gajiSen <= 2_000_000) {
    const [, majikan, pekerja] = THIRD_SCHEDULE[b].find(([hulu]) => gajiSen <= hulu)!;
    return { bahagian: b, majikan, pekerja, jumlah: majikan + pekerja };
  }
  // shortcut: the Act rounds "the total contribution" up to the next ringgit without saying how
  // the split is rounded; each share is rounded up, as every band in the schedule does - confirm with KWSP.
  const [er, ee] = KADAR[b];
  const naik = (bp: number) => Math.ceil((gajiSen * bp) / 1_000_000) * 100;
  const [majikan, pekerja] = [naik(er), naik(ee)];
  // Part F has no bands to follow, so its total is the Act's wording: the 4% total rounded up.
  return { bahagian: b, majikan, pekerja, jumlah: b === "F" ? naik(er + ee) : majikan + pekerja };
}
