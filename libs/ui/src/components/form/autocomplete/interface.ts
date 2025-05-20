import { Control, FieldValues, Path } from 'react-hook-form';

interface AIBAutocompleteProps {
  options: { label: string; value: string }[];
}

interface RHFAutocompleteProps<TField extends FieldValues>
  extends Omit<AIBAutocompleteProps, 'name'> {
  control?: Control<TField>;
  name: Path<TField>;
  description?: string;
  label: string;
}

export type { AIBAutocompleteProps, RHFAutocompleteProps };
