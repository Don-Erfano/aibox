import { AutocompleteOption } from '../interface';

/**
 * Key under which selected autocomplete values are saved in localStorage.
 * @constant {string}
 */
const KEY = 'selectedAutocompleteValue';

/**
 * Persists the labels of selected autocomplete options to localStorage.
 *
 * @param {AutocompleteOption[]} selected - Array of selected options to save.
 * @returns {void}
 */
export function saveToStorage(selected: AutocompleteOption[]): void {
  localStorage.setItem(KEY, JSON.stringify(selected.map((x) => x.label)));
}

/**
 * Retrieves previously saved autocomplete values from localStorage.
 *
 * Attempts to parse a JSON-encoded array of labels. If parsing fails
 * or no data is found, returns null.
 *
 * @returns {string[] | string | null} The parsed value array or single string, or null if none.
 */
export function loadFromStorage(): string[] | string | null {
  const s = localStorage.getItem(KEY);
  if (!s) return null;
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}

/**
 * Clears any saved autocomplete selection from localStorage.
 *
 * @returns {void}
 */
export function clearStorage(): void {
  localStorage.removeItem(KEY);
}
