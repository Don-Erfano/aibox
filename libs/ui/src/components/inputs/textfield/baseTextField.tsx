'use client';

import { useRef } from 'react';
import { IBaseTextfieldProps } from './interface';
import { textfieldClassNames, textfieldWrapperClassNames } from './style';

const BaseTextField = ({
  variant,
  startAdornment,
  endAdornment,
  error,
  direction,
  ...props
}: IBaseTextfieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <div
        className={textfieldWrapperClassNames({ variant, error: !!error })}
        onClick={focusInput}
      >
        {startAdornment}
        <input
          data-slot="input"
          className={textfieldClassNames({ direction })}
          ref={inputRef}
          dir="auto"
          {...props}
        />
        {endAdornment}
      </div>
      {error ? (
        <p
          className="absolute text-red-600 text-xs -bottom-4 left-auto right-2 w-fit"
          lang="fa"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
};

export { BaseTextField };
