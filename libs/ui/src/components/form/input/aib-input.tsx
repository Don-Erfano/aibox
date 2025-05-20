'use client';

import { cn } from '../../../lib';
import { forwardRef, useRef, useState } from 'react';
import { AIBInputProps } from './interface';
import { textfieldClassNames, textfieldWrapperClassNames } from './style';
import { Eye, EyeOff } from 'lucide-react';

const BaseTextField = forwardRef<HTMLInputElement, AIBInputProps>(
  (
    {
      variant,
      startAdornment,
      endAdornment,
      direction,
      label,
      readOnly,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(props.type);

    const focusInput = () => {
      inputRef.current?.focus();
    };

    const handleChangeType = () => {
      if (type === 'password') {
        setType('text');
      } else {
        setType('password');
      }
    };

    return (
      <div className="relative w-full flex flex-col gap-2" ref={ref}>
        {label ? (
          <span className="text-gray-500 text-sm font-normal">{label}</span>
        ) : null}
        <div
          className={textfieldWrapperClassNames({
            readOnly,
            disabled,
          })}
          onClick={focusInput}
        >
          {startAdornment}
          <input
            {...props}
            data-slot="input"
            className={cn(
              textfieldClassNames({
                direction,
              }),
              className
            )}
            readOnly={readOnly}
            dir="auto"
            ref={inputRef}
            type={type}
            disabled={disabled}
            {...props}
          />
          {props.type === 'password' ? (
            <div
              className="cursor-pointer"
              id="password-icon"
              onClick={handleChangeType}
            >
              {type === 'password' ? <Eye /> : <EyeOff />}
            </div>
          ) : (
            endAdornment
          )}
        </div>
      </div>
    );
  }
);

export { BaseTextField };
