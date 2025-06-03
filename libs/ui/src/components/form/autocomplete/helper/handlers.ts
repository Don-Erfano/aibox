/**
 * Factory functions to create event handlers for an Autocomplete component.
 *
 * Includes handlers for input change, option selection, option removal,
 * keyboard navigation, and dropdown toggling.
 */
import { ChangeEvent, KeyboardEvent, Dispatch, SetStateAction } from 'react';
import { AutocompleteOption, TVariant } from '../interface';

type SetState<T> = Dispatch<SetStateAction<T>>;

/**
 * Creates an input change handler that updates state, resets highlighting,
 * invokes external change callback, and optionally opens dropdown.
 *
 * @param atLimit - Whether the tag limit has been reached (for multiple variant).
 * @param variant - Selection variant ('single' or 'multiple').
 * @param isOpen - Current open state of the dropdown.
 * @param setInputValue - State setter for the input value.
 * @param setHighlightedId - State setter for the highlighted option ID.
 * @param setSelectedOptions - State setter for selected options (clears on single variant).
 * @param setIsOpen - State setter for dropdown open state.
 * @param propOnChange - Optional external input change callback.
 * @returns A ChangeEvent handler for the input element.
 */
export function makeOnInputChange(
  atLimit: boolean,
  variant: TVariant,
  isOpen: boolean,
  setInputValue: SetState<string>,
  setHighlightedId: SetState<string | number | null>,
  setSelectedOptions: SetState<AutocompleteOption[]>,
  setIsOpen: SetState<boolean>,
  propOnChange?: (value: string) => void
) {
  return (e: ChangeEvent<HTMLInputElement>) => {
    if (atLimit) return;
    setInputValue(e.target.value);
    setHighlightedId(null);
    propOnChange?.(e.target.value);
    if (variant === 'single') setSelectedOptions([]);
    if (!isOpen) setIsOpen(true);
  };
}

/**
 * Creates an option pick handler that adds/removes options, manages storage,
 * and triggers onSelect callback.
 *
 * @param variant - Selection variant ('single' or 'multiple').
 * @param tagLimit - Maximum number of selectable tags (for multiple variant).
 * @param selectedOptions - Current selected options.
 * @param setSelectedOptions - State setter for selected options.
 * @param setInputValue - State setter for input value.
 * @param setIsOpen - State setter for dropdown open state.
 * @param setHighlightedId - State setter for highlighted option ID.
 * @param onSelect - Callback invoked with updated selected options.
 * @returns A function to handle picking an option.
 */
export function makePickOption(
  variant: TVariant,
  tagLimit: number,
  selectedOptions: AutocompleteOption[],
  setSelectedOptions: SetState<AutocompleteOption[]>,
  setInputValue: SetState<string>,
  setIsOpen: SetState<boolean>,
  setHighlightedId: SetState<string | number | null>,
  onSelect: (opts: AutocompleteOption[]) => void
) {
  return (opt: AutocompleteOption) => {
    if (variant === 'multiple') {
      if (
        !selectedOptions.some((x) => x.id === opt.id) &&
        selectedOptions.length >= tagLimit
      ) {
        return;
      }
      setSelectedOptions((prev) => {
        const exists = prev.some((x) => x.id === opt.id);
        const next = exists
          ? prev.filter((x) => x.id !== opt.id)
          : [...prev, opt];
        onSelect(next);
        return next;
      });
      setInputValue('');
    } else {
      if (selectedOptions.length === 1 && selectedOptions[0].id === opt.id) {
        setSelectedOptions([]);
        onSelect([]);
        setInputValue('');
      } else {
        setSelectedOptions([opt]);
        onSelect([opt]);
        setInputValue(opt.label);
      }
    }
    if (variant === 'multiple') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    setHighlightedId(null);
  };
}

/**
 * Creates a handler to remove a specific option from selections,
 * updating state, invoking onSelect, and persisting.
 *
 * @param setSelectedOptions - State setter for selected options.
 * @param onSelect - Callback invoked with updated selections.
 * @returns A function to handle option removal.
 */
export function makeRemoveOption(
  setSelectedOptions: SetState<AutocompleteOption[]>,
  onSelect: (opts: AutocompleteOption[]) => void
) {
  return (opt: AutocompleteOption) => {
    setSelectedOptions((prev) => {
      const next = prev.filter((x) => x.id !== opt.id);
      onSelect(next);
      return next;
    });
  };
}

/**
 * Creates a keyboard event handler for Enter and Backspace keys
 * to support selecting freeform tags and deleting.
 *
 * @param variant - Selection variant ('single' or 'multiple').
 * @param tagLimit - Maximum tags allowed (for multiple).
 * @param inputValue - Current input text.
 * @param selectedOptions - Current selected options.
 * @param highlightedId - Currently highlighted option ID.
 * @param filteredLength - Number of filtered dropdown options.
 * @param pickOption - Handler to pick an option.
 * @param removeOption - Handler to remove an option.
 * @param setHighlightedId - State setter for highlighted option ID.
 * @returns A KeyboardEvent handler for the input.
 */
export function makeOnKeyDown(
  variant: TVariant,
  tagLimit: number,
  inputValue: string,
  selectedOptions: AutocompleteOption[],
  highlightedId: string | number | null,
  filteredLength: number,
  pickOption: (opt: AutocompleteOption) => void,
  removeOption: (opt: AutocompleteOption) => void,
  setHighlightedId: SetState<string | number | null>
): (e: KeyboardEvent<HTMLInputElement>) => void {
  return (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' &&
      variant === 'multiple' &&
      selectedOptions.length < tagLimit &&
      inputValue.trim() &&
      filteredLength === 0
    ) {
      e.preventDefault();
      pickOption({ id: inputValue, label: inputValue });
      return;
    }
    if (e.key === 'Backspace' && inputValue === '' && selectedOptions.length) {
      e.preventDefault();
      if (highlightedId == null) {
        setHighlightedId(selectedOptions[selectedOptions.length - 1].id);
      } else {
        const rm = selectedOptions.find((x) => x.id === highlightedId);
        if (rm) removeOption(rm);
        setHighlightedId(null);
      }
    }
  };
}

/**
 * Creates a toggle handler to open/close dropdown when input is clicked,
 * respecting disabled state.
 *
 * @param inputDisabled - Whether input interactions are disabled.
 * @param setIsOpen - State setter for dropdown open state.
 * @returns A click handler to toggle dropdown.
 */
export function makeToggleOpen(
  inputDisabled: boolean,
  setIsOpen: SetState<boolean>
): () => void {
  return () => {
    if (inputDisabled) return;
    setIsOpen((v) => !v);
  };
}
