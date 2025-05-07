import * as React from 'react';

import { buttonVariants } from './style';
import { TButtonProps } from './interface';
import { cn } from '../../../lib';

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
    ...rest
  } = props;

  return (
    <button
      data-slot="button"
      className={cn(
        buttonVariants({ variant, className, filled, error, loading })
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
