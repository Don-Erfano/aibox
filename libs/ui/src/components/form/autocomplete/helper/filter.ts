/**
 * Filters an array of autocomplete options based on a case-insensitive match
 * against the option labels.
 *
 * @param {AutocompleteOption[]} options - The complete list of options to filter.
 * @param {string} inputValue - The current input string to filter by.
 * @returns {AutocompleteOption[]} A new array containing options whose labels include
 *   the inputValue (case-insensitive).
 */
import { AutocompleteOption, TVariant } from '../interface';

export function filterOptions(
  options: AutocompleteOption[],
  inputValue: string
): AutocompleteOption[] {
  return options.filter((opt) =>
    opt.label.toLowerCase().includes(inputValue.toLowerCase())
  );
}

/**
 * Selects the source list for the dropdown menu based on the autocomplete variant.
 *
 * In 'single' mode, always returns the full options list; in 'multiple' mode,
 * returns the filtered subset.
 *
 * @param {'single' | 'multiple'} variant - The selection variant of the autocomplete.
 * @param {AutocompleteOption[]} options - The full list of available options.
 * @param {AutocompleteOption[]} filtered - The filtered list based on input.
 * @returns {AutocompleteOption[]} The array of options to display in the dropdown.
 */
export function getDropdownSource(
  variant: TVariant,
  options: AutocompleteOption[],
  filtered: AutocompleteOption[]
): AutocompleteOption[] {
  return variant === 'single' ? options : filtered;
}
