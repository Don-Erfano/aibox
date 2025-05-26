/**
 * Interface representing computed position and size offsets for dropdown positioning.
 *
 * @interface Offsets
 * @property {number} left - The x-coordinate (in pixels) of the left edge of the target element relative to the viewport.
 * @property {number} top - The y-coordinate (in pixels) at which the dropdown should be displayed,
 *   calculated as the bottom edge of the element plus a 1px gap.
 * @property {number} width - The width (in pixels) of the target element, used to match dropdown width.
 */
export interface Offsets {
  left: number;
  top: number;
  width: number;
}

/**
 * Computes the Offsets for a given HTMLElement by using its bounding client rectangle.
 *
 * @param {HTMLElement} el - The element for which to calculate dropdown offsets.
 * @returns {Offsets} An object containing left, top (element bottom + 1px), and width values.
 */
export function getOffsets(el: HTMLElement): Offsets {
  const r = el.getBoundingClientRect();
  return { left: r.left, top: r.bottom + 1, width: r.width };
}
