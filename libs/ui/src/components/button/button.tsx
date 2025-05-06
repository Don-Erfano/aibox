import * as React from 'react';

import { cn } from '../../lib';
import { buttonVariants } from './style';
import { TButtonProps } from './interface';

const Button: React.FC<TButtonProps> = (props) => {
  const {
    className,
    variant,
    filled,
    error,
    children,
    startIcon,
    endIcon,
    loading,
    fullWidth,
    ...rest
  } = props;

  return (
    <button
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          className,
          filled,
          error,
          loading,
          fullWidth,
        })
      )}
      {...rest}
    >
      {!loading ? (
        <>
          {startIcon}
          {children}
          {endIcon}
        </>
      ) : (
        'loading'
      )}
    </button>
  );
};

export { Button, buttonVariants };
