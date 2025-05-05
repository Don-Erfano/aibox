import { useRef } from 'react';
import { ITextfieldProps } from './interface';
import { textfieldClassNames, textfieldWrapperClassNames } from './style';

const Textfield = ({
  variant,
  startAdornment,
  endAdornment,
  error,
  direction,
  ...props
}: ITextfieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <div
        className={textfieldWrapperClassNames({ variant, error: !!error })}
        onClick={focusInput}
      >
        {endAdornment}
        <input
          data-slot="input"
          className={textfieldClassNames({ direction })}
          ref={inputRef}
          dir="auto"
          {...props}
        />
        {startAdornment}
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

export { Textfield };
