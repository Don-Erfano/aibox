/**
 * Groups a flat list of autocomplete options into a Map keyed by group name.
 *
 * Each option's `group` property is used as the key; options with a null or undefined
 * `group` are placed under the empty-string key.
 *
 * @param dropdownSource - Array of AutocompleteOption items to group
 * @returns A Map where each key is a group name and the value is an array of options in that group
 */
import { AutocompleteOption } from '../interface';

export function groupOptions(
  dropdownSource: AutocompleteOption[]
): Map<string, AutocompleteOption[]> {
  const map = new Map<string, AutocompleteOption[]>();
  dropdownSource.forEach((opt) => {
    const key = opt.group ?? '';
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(opt);
  });
  return map;
}
