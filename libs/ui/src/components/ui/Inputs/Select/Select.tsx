import { FC } from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { SelectProps } from './interface';
import { cn } from '../../../../lib/utils';

const Select: FC<SelectProps> = ({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select…',
  error = false,
  readOnly = false,
  size = 'default',
  disabled = false,
}) => {
  return (
    <RadixSelect.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      data-error={error ? '' : undefined}
      data-readonly={readOnly ? '' : undefined}
      data-size={size}
    >
      <RadixSelect.Trigger
        disabled={disabled || readOnly}
        className={cn(
          'flex items-center justify-between text-sm w-70 bg-transparent border-b border-gray-300  pb-1 px-2 gap-2 text-gray-600 ',
          'focus:outline-none focus-within:border-b-[var(--select-focus-border-color)]',
          size === 'sm' ? 'h-12' : 'h-10',
          error &&
            'border-[var(--select-error-border-color)] text-[var(--select-error-text)]',
          readOnly && 'border-dashed cursor-default',
          disabled &&
            'cursor-not-allowed border-[var(--select-disabled-border)] text-[var(--select-disabled-text)]'
        )}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon asChild>
          <ChevronDownIcon
            className={cn(
              'size-4 transition-transform',
              disabled
                ? 'text-[var(--select-disabled-border)]'
                : error
                ? 'text-[var(--select-error-border-color)]'
                : 'text-[var(--select-placeholder-color)]',
              'group-[data-state=open]:rotate-180'
            )}
          />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content className="bg-white rounded-md shadow-md overflow-hidden z-50 w-full min-w-[var(--radix-select-trigger-width)] data-[state=open]:animate-in data-[state=closed]:animate-out">
          <RadixSelect.ScrollUpButton className="flex items-center justify-center py-1">
            <ChevronDownIcon className="size-4 text-[var(--select-placeholder-color)] rotate-180" />
          </RadixSelect.ScrollUpButton>

          <RadixSelect.Viewport className="py-1">
            {options.map((opt) => (
              <RadixSelect.Item
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
                className={cn(
                  'relative flex items-center w-full px-3 py-2 text-sm select-none outline-none transition-colors',
                  'text-[var(--select-text)]',
                  'data-[highlighted]:bg-[var(--select-hover-bg)] data-[highlighted]:text-[var(--select-hover-text)]',
                  'aria-selected:bg-[var(--select-selected-bg)] aria-selected:text-[var(--select-selected-text)]',
                  opt.disabled && 'opacity-50 pointer-events-none'
                )}
              >
                <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator className="absolute right-3 flex h-full items-center justify-center">
                  <CheckIcon className="size-4 text-[var(--select-selected-text)]" />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>

          <RadixSelect.ScrollDownButton className="flex items-center justify-center py-1">
            <ChevronDownIcon className="size-4 text-[var(--select-placeholder-color)] rotate-180" />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};

export default Select;
