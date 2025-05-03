import { FC, useState } from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { SelectProps } from './interface';
import { cn } from '../../../../lib/utils';
import { CheckIcon, ChevronIcon } from '../../../icons';

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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <RadixSelect.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      onOpenChange={setIsOpen}
      data-error={error ? '' : undefined}
      data-readonly={readOnly ? '' : undefined}
      data-size={size}
    >
      <RadixSelect.Trigger
        disabled={disabled || readOnly}
        className={cn(
          'flex items-center justify-between w-60 text-sm',
          'border-b border-[var(--select-border-color)]',
          'pb-1 px-2 gap-2 bg-transparent',
          'focus:outline-none focus-within:border-b-2 focus-within:border-[var(--select-focus-border-color)]',
          size === 'sm' ? 'h-8' : 'h-10',
          error &&
            'border-b-2 border-[var(--select-error-border-color)] text-[var(--select-error-text)]',
          readOnly && 'border-b border-dashed cursor-default',
          disabled &&
            'cursor-not-allowed border-b-2 border-[var(--select-disabled-border)] text-[var(--select-disabled-text)]'
        )}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon>
          <ChevronIcon
            className={cn(
              'w-4 h-4 transform transition-transform',
              isOpen ? 'rotate-180' : 'rotate-0'
            )}
          />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          side="bottom"
          align="start"
          className={cn(
            'bg-white shadow-lg overflow-hidden z-50',
            'w-[var(--radix-select-trigger-width)]',
            'border-[var(--select-focus-border-color)] rounded-b-sm'
          )}
        >
          <RadixSelect.ScrollUpButton className="flex items-center justify-center py-1">
            <ChevronIcon className="w-4 h-4 rotate-180 text-[var(--select-placeholder-color,#9CA3AF)]" />
          </RadixSelect.ScrollUpButton>

          <RadixSelect.Viewport className="py-1">
            {options.map((opt) => (
              <RadixSelect.Item
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
                className={cn(
                  'relative flex items-center w-full px-3 py-2 text-sm select-none outline-none',
                  'text-[var(--select-text)]',
                  'data-[highlighted]:bg-[var(--select-hover-bg)] data-[highlighted]:text-[var(--select-hover-text)]',
                  'aria-selected:bg-white aria-selected:text-[var(--select-selected-text)]',
                  opt.disabled && 'opacity-50 pointer-events-none'
                )}
              >
                <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator className="absolute right-3 flex h-full items-center justify-center">
                  <CheckIcon className="w-4 h-4 fill-current text-[var(--select-selected-text)]" />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>

          <RadixSelect.ScrollDownButton className="flex items-center justify-center py-1">
            <ChevronIcon className="w-4 h-4 text-[var(--select-placeholder-color)]" />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};

export default Select;
