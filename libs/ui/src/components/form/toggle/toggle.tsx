"use client";

import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";

import { ToggleProps } from "./interface";
import {
  labelClass,
  toggleGroupClass,
  toggleItemClass,
  toggleValueClass,
} from "./styled";

const Toggle = (props: ToggleProps) => {
  const { variant = "primary", items, size, value, onValueChange } = props;

  const selectedIndex = items.findIndex((item) => item.value === value);
  const lastItemSelected = selectedIndex + 1 === items.length;

  const disabled = "disabled" in props ? props.disabled : false;
  const readonly = "readonly" in props ? props.readonly : false;
  const onOff = "onOff" in props ? props.onOff && lastItemSelected : false;

  return (
    <ToggleGroup
      dir="rtl"
      type="single"
      value={value}
      onValueChange={onValueChange}
      disabled={variant === "primary" && (disabled || readonly)}
      className={`grid-cols-${items.length} ${toggleGroupClass({
        disabled,
        readonly,
        variant,
        onOff,
      })}`}
    >
      {value && (
        <div
          className={toggleValueClass({ variant, onOff })}
          style={{
            width: `${100 / items.length}%`,
            transform: `translateX(calc(-${selectedIndex * 100}% ${lastItemSelected ? "+" : "-"} 1px))`,
          }}
        />
      )}

      {items.map((item) => (
        <ToggleGroupItem
          key={item.value}
          value={item.value}
          disabled={value === item.value}
          className={toggleItemClass({
            selected: value === item.value,
            disabled: disabled || readonly,
            onOff,
            variant,
            size,
          })}
        >
          <p className={labelClass({ size })}>{item.label}</p>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default Toggle;
