/**
 * Calculates how many chip elements can be visibly displayed within two rows
 * based on the container width, subtracting one spot if there are overflow extras
 * to accommodate an "extra count" indicator chip.
 *
 * Only applicable for the 'multiple' variant; returns 0 otherwise or if no chips provided.
 *
 * @param {HTMLElement[]} chips - Array of chip elements representing selected options.
 * @param {number} containerWidth - The available width (in pixels) to display chips.
 * @param {TVariant} variant - The autocomplete variant, must be 'multiple' to compute count.
 * @returns {number} The number of chips that fit visually (capped to two rows minus one
 * for overflow indicator when needed).
 *
 * @example
 * // Given chip elements with two rows fitting 5 chips and 3 extras
 * computeVisibleCount(chips, 300, 'multiple'); // returns 4 (5 fit - 1 extra indicator)
 */
import { TVariant } from '../interface';

export function computeVisibleCount(
  chips: HTMLElement[],
  containerWidth: number,
  variant: TVariant
): number {
  if (variant !== 'multiple') return 0;
  if (!chips.length) return 0;

  const tops = Array.from(new Set(chips.map((c) => c.offsetTop))).sort(
    (a, b) => a - b
  );
  const twoRows = tops.slice(0, 2);
  const fit = chips.filter((c) => twoRows.includes(c.offsetTop)).length;
  const extras = chips.length - fit;
  return extras > 0 ? Math.max(fit - 1, 0) : fit;
}
