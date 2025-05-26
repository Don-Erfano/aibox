import { THeightSize, TVariant } from './interface';

/**
 * Mapping of height size variants to their corresponding CSS utility classes.
 * Each THeightSize key maps to an object defining CSS classes for both 'single'
 * and 'multiple' Autocomplete variants.
 *
 * @constant {Record<THeightSize, Record<TVariant, string>>}
 */
const heightClasses: Record<THeightSize, Record<TVariant, string>> = {
  sm: { single: 'h-10', multiple: 'min-h-[40px]' },
  md: { single: 'h-12', multiple: 'min-h-[48px]' },
  lg: { single: 'h-14', multiple: 'min-h-[56px]' },
};

/**
 * Retrieves the appropriate CSS class based on the Autocomplete variant and size.
 *
 * @param {TVariant} variant - Autocomplete variant, either 'single' or 'multiple'.
 * @param {THeightSize} size - Height size key, one of 'sm', 'md', or 'lg'.
 * @returns {string} The CSS class to apply for the given variant and size.
 */
export function getSizeClass(variant: TVariant, size: THeightSize): string {
  return heightClasses[size][variant];
}
