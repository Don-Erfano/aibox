import { AutocompleteOption, TVariant } from '../interface';

/**
 * Selects the source list for the dropdown menu based on the autocomplete variant.
 *
 * In both 'single' and 'multiple' modes, returns the filtered subset when there's input,
 * otherwise returns the full options list.
 *
 * @param {'single' | 'multiple'} variant - The selection variant of the autocomplete.
 * @param {AutocompleteOption[]} options - The full list of available options.
 * @param {AutocompleteOption[]} filtered - The filtered list based on input.
 * @param {string} inputValue - The current input value to determine if filtering should apply.
 * @returns {AutocompleteOption[]} The array of options to display in the dropdown.
 */
export function getDropdownSource(
  variant: TVariant,
  options: AutocompleteOption[],
  filtered: AutocompleteOption[],
  inputValue: string
): AutocompleteOption[] {
  if (inputValue.trim()) {
    return filtered;
  }
  return options;
}
