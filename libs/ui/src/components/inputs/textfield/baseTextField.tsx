'use client';

import { forwardRef, useRef, useState } from 'react';
import { IBaseTextfieldProps } from './interface';
import { textfieldClassNames, textfieldWrapperClassNames } from './style';
import { Eye, EyeOff } from 'lucide-react';

const BaseTextField = forwardRef<HTMLInputElement, IBaseTextfieldProps>(
  (
    { variant, startAdornment, endAdornment, error, direction, ...props },
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
      <div className="relative w-full" ref={ref}>
        <div
          className={textfieldWrapperClassNames({ variant, error: !!error })}
          onClick={focusInput}
        >
          {startAdornment}
          <input
            {...props}
            data-slot="input"
            className={textfieldClassNames({ direction })}
            dir="auto"
            ref={inputRef}
            type={type}
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
