/**
 * Extract a 4-digit year from a date-like string for display.
 *
 * Public family birth dates for living people are already reduced to a
 * year-only string ("2022") server-side. Re-parsing those with
 * `new Date(value).getFullYear()` drifts by a year for viewers west of UTC,
 * so display code must read the year textually instead of via `Date`.
 */
export const displayYear = (
  value: string | null | undefined,
): string | null => {
  if (!value) return null;
  const match = String(value).match(/\d{4}/);
  return match ? match[0] : null;
};
