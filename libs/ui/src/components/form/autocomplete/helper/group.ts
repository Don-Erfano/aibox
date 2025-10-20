import { AutocompleteOption } from "../interface";

/**
 * Filters an array of autocomplete options based on a case-insensitive match
 * against the option labels.
 *
 * @param {AutocompleteOption[]} options - The complete list of options to filter.
 * @param {string} inputValue - The current input string to filter by.
 * @returns {AutocompleteOption[]} A new array containing options whose labels include
 *   the inputValue (case-insensitive).
 */

export function filterOptions(
  options: AutocompleteOption[],
  inputValue: string,
): AutocompleteOption[] {
  return options.filter((opt) =>
    opt.label.toLowerCase().includes(inputValue.toLowerCase()),
  );
}

/**
 * Groups a flat list of autocomplete options into a Map keyed by group name.
 *
 * Each option's `group` property is used as the key; options with a null or undefined
 * `group` are placed under the empty-string key.
 *
 * @param dropdownSource - Array of AutocompleteOption items to group
 * @returns A Map where each key is a group name and the value is an array of options in that group
 */

export function groupOptions(
  dropdownSource: AutocompleteOption[],
): Map<string, AutocompleteOption[]> {
  const map = new Map<string, AutocompleteOption[]>();
  dropdownSource.forEach((opt) => {
    const key = opt.group ?? "";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(opt);
  });
  return map;
}
