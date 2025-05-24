/**
 * Custom hook providing the core logic for an Autocomplete component.
 * It manages input state, option filtering, selection, keyboard navigation,
 * portal positioning, and integration with localStorage.
 *
 * @param props - Props for configuring the autocomplete behavior and appearance
 * @param props.options - List of available options to display
 * @param props.onSelect - Callback invoked with selected options when selection changes
 * @param props.variant - "single" or "multiple", determining selection behavior
 * @param props.value - Controlled current value (string for single, string[] for multiple)
 * @param props.onChange - Controlled change handler for input value
 * @param props.disabled - Whether the autocomplete is disabled
 * @param props.readOnly - Whether selections are read-only
 * @param props.limited_tag - Maximum number of tags (for multiple variant)
 * @param props.h_size - Height size variant for styling
 * @param props.isLoading - Whether options are still loading
 *
 * @returns {object} An object containing state values, refs, and handlers:
 *   @property {string} inputValue - Current value of the input
 *   @property {AutocompleteOption[]} selectedOptions - Currently selected items
 *   @property {boolean} isOpen - Whether the dropdown is open
 *   @property {Offsets} offsets - Computed dropdown position relative to the input
 *   @property {string|number|null} highlightedId - ID of the currently highlighted option
 *   @property {number} extraCount - Number of hidden tags when in multiple mode
 *   @property {AutocompleteOption[]} visibleTags - Tags visible in multiple mode
 *   @property {string} sizeClass - Computed CSS class for size variant
 *   @property {boolean} atLimit - Whether tag limit has been reached
 *   @property {boolean} removeDisabled - Whether remove actions are disabled
 *   @property {boolean} inputDisabled - Whether input is disabled
 *   @property {Record<string, any>} grouped - Options grouped for rendering
 *   @property {boolean} isLoading - Loading state passed through
 *   @property {object} refs - Refs for input, portal, measuring, and click-away
 *   @property {object} handlers - Event handlers for input, keyboard, and toggling
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  AutocompleteOption,
  IAutocompleteProps,
  THeightSize,
  TVariant,
} from '../../interface';
import {
  filterOptions,
  getDropdownSource,
  getOffsets,
  groupOptions,
  makeOnInputChange,
  makeOnKeyDown,
  makePickOption,
  makeRemoveOption,
  makeToggleOpen,
  Offsets,
  computeVisibleCount,
} from '../../helper';
import { getSizeClass } from '../../classes';

export function useAutocompleteLogic(
  props: IAutocompleteProps & { onSelect: (opts: AutocompleteOption[]) => void }
) {
  const {
    options,
    onSelect,
    variant,
    value: propValue,
    onChange: propOnChange,
    disabled,
    readOnly,
    limited_tag,
    h_size,
    isLoading = false,
  } = props;

  // State
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<AutocompleteOption[]>(
    []
  );
  const [isOpen, setIsOpen] = useState(false);
  const [offsets, setOffsets] = useState<Offsets>({
    left: 0,
    top: 0,
    width: 0,
  });
  const [highlightedId, setHighlightedId] = useState<string | number | null>(
    null
  );
  const [visibleCount, setVisibleCount] = useState(0);

  // Refs
  const inputRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const ignoreClickAwayRef = useRef(false);

  // Limits & disabled
  const tagLimit =
    typeof limited_tag === 'number' && limited_tag > 0 ? limited_tag : Infinity;
  const atLimit = variant === 'multiple' && selectedOptions.length >= tagLimit;
  const removeDisabled = disabled || readOnly;
  const inputDisabled =
    disabled ||
    readOnly ||
    (variant === 'multiple' && selectedOptions.length >= tagLimit);

  // Size
  const sizeClass = getSizeClass(variant as TVariant, h_size as THeightSize);

  // Filtering & grouping
  const filtered = useMemo(
    () => filterOptions(options, inputValue),
    [options, inputValue]
  );
  const dropdownSource = useMemo(
    () => getDropdownSource(variant as TVariant, options, filtered),
    [variant, options, filtered]
  );
  const grouped = useMemo(() => groupOptions(dropdownSource), [dropdownSource]);

  // Portal positioning
  const updateOffsets = useCallback(() => {
    const el = inputRef.current;
    if (!el) return;
    setOffsets(getOffsets(el));
  }, []);
  useEffect(() => {
    updateOffsets();
    window.addEventListener('scroll', updateOffsets, true);
    return () => window.removeEventListener('scroll', updateOffsets, true);
  }, [updateOffsets]);
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    updateOffsets();
    const ro = new ResizeObserver(updateOffsets);
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateOffsets]);
  useEffect(() => {
    if (isOpen) updateOffsets();
  }, [isOpen, selectedOptions, updateOffsets]);

  // (two-row)
  useEffect(() => {
    if (variant !== 'multiple') {
      setVisibleCount(0);
      return;
    }
    if (readOnly) {
      setVisibleCount(selectedOptions.length);
      return;
    }
    const m = measureRef.current;
    if (!m) {
      setVisibleCount(0);
      return;
    }
    const chips = Array.from(m.children) as HTMLElement[];
    setVisibleCount(
      computeVisibleCount(chips, offsets.width, variant as TVariant)
    );
  }, [selectedOptions, offsets.width, variant, readOnly]);

  // Sync incoming value prop
  useEffect(() => {
    if (variant === 'multiple' && Array.isArray(propValue)) {
      // Build a selectedOptions array by mapping each label
      // to either an existing option or a new freeform one:
      const next = propValue.map((label) => {
        const found = options.find((o) => o.label === label);
        return found ?? { id: label, label };
      });
      setSelectedOptions(next);
      setInputValue('');
    } else if (variant === 'single' && typeof propValue === 'string') {
      const found = options.find((o) => o.label === propValue);
      if (found) {
        setSelectedOptions([found]);
        setInputValue(found.label);
      } else if (propValue.trim() !== '') {
        setSelectedOptions([{ id: propValue, label: propValue }]);
        setInputValue(propValue);
      }
    } else {
      setSelectedOptions([]);
      setInputValue('');
    }
  }, [propValue, options, variant]);

  // ─── HANDLERS ─────────────────────────────────────────────────────────
  const onInputChange = makeOnInputChange(
    atLimit,
    variant as TVariant,
    isOpen,
    setInputValue,
    setHighlightedId,
    setSelectedOptions,
    setIsOpen,
    propOnChange
  );

  const rawPickOption = makePickOption(
    variant as TVariant,
    tagLimit,
    selectedOptions,
    setSelectedOptions,
    setInputValue,
    setIsOpen,
    setHighlightedId,
    onSelect
  );

  const pickOption = useCallback(
    (opt: AutocompleteOption) => {
      // prevent click-away from instantly closing
      ignoreClickAwayRef.current = true;
      rawPickOption(opt);
    },
    [rawPickOption]
  );

  const removeOption = makeRemoveOption(setSelectedOptions, onSelect);
  const onKeyDown = makeOnKeyDown(
    variant as TVariant,
    tagLimit,
    inputValue,
    selectedOptions,
    highlightedId,
    filtered.length,
    pickOption,
    removeOption,
    setHighlightedId
  );
  const toggleOpen = makeToggleOpen(inputDisabled, setIsOpen);

  // ─── EXTRA & VISIBLE TAGS ─────────────────────────────────────────────
  const extraCount =
    variant === 'multiple' && selectedOptions.length > visibleCount
      ? selectedOptions.length - visibleCount
      : 0;
  const visibleTags =
    variant === 'multiple'
      ? selectedOptions.slice(0, visibleCount)
      : selectedOptions;

  return {
    inputValue,
    selectedOptions,
    isOpen,
    offsets,
    highlightedId,
    extraCount,
    visibleTags,
    sizeClass,
    atLimit,
    removeDisabled,
    inputDisabled,
    grouped,
    isLoading,
    refs: {
      inputRef,
      portalRef,
      measureRef,
      ignoreClickAwayRef,
    },
    handlers: {
      onInputChange,
      onKeyDown,
      pickOption,
      removeOption,
      toggleOpen,
      setIsOpen,
      setHighlightedId,
    },
  };
}
