'use client';

import {
  ToggleGroupItem,
  Root as ToggleGroupRoot,
} from '@radix-ui/react-toggle-group';

import { ToggleSwitchProps } from './interface';
import {
  labelClass,
  toggleGroupClass,
  toggleItemClass,
  toggleValueClass,
} from './styled';

export const ToggleSwitch = (props: ToggleSwitchProps) => {
  const {
    items,
    value,
    onValueChange,
    readonly,
    size = 'fixed',
    variant = 'default',
    disabled,
  } = props;

  const isSecondItemSelected = value === items[1].value;

  return (
    <ToggleGroupRoot
      type="single"
      value={value}
      onValueChange={onValueChange}
      disabled={disabled || readonly}
      className={toggleGroupClass({
        disabled,
        isSecondItemSelected,
        readonly,
        variant,
      })}
    >
      {value && (
        <div className={toggleValueClass({ variant, isSecondItemSelected })} />
      )}

      {items.map((item) => (
        <ToggleGroupItem
          key={item.value}
          value={item.value}
          disabled={value === item.value}
          className={toggleItemClass({
            size,
            variant,
            isSecondItemSelected,
            selected: value === item.value,
            disabled: disabled || readonly,
          })}
        >
          <p className={labelClass({ size })}>{item.label}</p>
        </ToggleGroupItem>
      ))}
    </ToggleGroupRoot>
  );
};
