'use client';

import { forwardRef, useRef, useState } from 'react';
import { IBaseTextfieldProps } from './interface';
import { textfieldClassNames, textfieldWrapperClassNames } from './style';
import { Eye, EyeOff } from 'lucide-react';

const BaseTextField = forwardRef<HTMLInputElement, IBaseTextfieldProps>(
  (
    {
      variant,
      startAdornment,
      endAdornment,
      error,
      direction,
      label,
      readOnly,
      disabled,
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
            variant,
            error: !!error,
            readOnly,
            disabled,
          })}
          onClick={focusInput}
        >
          {startAdornment}
          <input
            {...props}
            data-slot="input"
            className={textfieldClassNames({
              direction,
              error: !!error,
            })}
            readOnly={readOnly}
            dir="auto"
            ref={inputRef}
            type={type}
            disabled={disabled}
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
        {error ? (
          <p className="absolute text-red-600 text-xs -bottom-4 left-auto right-2 w-fit">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);

export { BaseTextField };
