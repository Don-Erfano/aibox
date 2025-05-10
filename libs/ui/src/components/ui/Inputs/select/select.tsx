'use client';
import { FC, useState } from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { SelectProps } from './interface';
import { CheckIcon, ChevronIcon } from '../../../icons';
import { cn } from '../../../../lib';

const Select: FC<SelectProps> = ({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  error = false,
  helperText,
  readOnly = false,
  size = 'default',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-70 flex-col">
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
            'flex items-center justify-between w-70 text-sm',
            'border-1 rounded-lg border-gray-900',
            'pb-1 px-2 gap-2 bg-transparent',
            'focus:outline-none focus-within:border-b-1 focus-within:border-teal-600',
            size === 'sm' ? 'h-8' : 'h-10',
            error &&
              'border-1 border-red-600 text-red-700 focus-within:border-red-600',
            readOnly && 'border-dashed cursor-default',
            disabled &&
              'cursor-not-allowed border-b-1 border-gray-400 text-gray-400',
            isOpen && 'border-teal-600 border-b-1'
          )}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon>
            <ChevronIcon
              className={cn(
                'w-4 h-4 transform transition-transform',
                isOpen ? 'rotate-0' : 'rotate-180'
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
              'bg-white shadow-lg z-50',
              'w-70 max-h-40',
              'border-teal-600 rounded-sm'
            )}
          >
            <RadixSelect.ScrollUpButton className="flex items-center justify-center py-1">
              <ChevronIcon className="size-5 rotate-0 text-teal-600" />
            </RadixSelect.ScrollUpButton>

            <RadixSelect.Viewport>
              {options.map((opt) => (
                <RadixSelect.Item
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                  className={cn(
                    'relative flex items-center w-full px-3 py-2 text-sm select-none outline-none',
                    'text-gray-600',
                    'data-[highlighted]:bg-gray-300',
                    'data-[state=checked]:text-teal-600',
                    'last:data-[highlighted]:rounded-b-sm',
                    'first:data-[highlighted]:rounded-t-sm',
                    opt.disabled && 'opacity-50 pointer-events-none'
                  )}
                >
                  <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator className="absolute left-3 flex h-full items-center justify-center">
                    <CheckIcon className="size-4 fill-current text-teal-600" />
                  </RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>

            <RadixSelect.ScrollDownButton className="flex items-center justify-center py-1">
              <ChevronIcon className="size-5 rotate-180 text-teal-600" />
            </RadixSelect.ScrollDownButton>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>

      {helperText && (
        <p
          className={cn(
            'mt-1 mr-1 text-xs',
            error ? 'text-red-600' : 'text-gray-500'
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Select;
