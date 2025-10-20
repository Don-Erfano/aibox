import { FC } from 'react';

import { TTextareaProps } from './interface';
import { cn } from '../../../lib';

const AIBTextarea: FC<TTextareaProps> = ({ className, ...props }) => (
  <textarea
    data-slot="textarea"
    className={cn(
      `flex field-sizing-content min-h-10 w-full rounded-[4px] px-3 py-2.5 text-sm text-zinc-600 outline-1 outline-gray-500 placeholder:text-xs placeholder:text-gray-400 hover:outline-zinc-600 focus-visible:text-zinc-700 focus-visible:outline-slate-800 disabled:cursor-default disabled:outline-gray-400 disabled:placeholder:text-gray-400 aria-invalid:outline-red-600 aria-readonly:pointer-events-none aria-readonly:resize-none aria-readonly:outline-zinc-600 aria-readonly:outline-dashed`,
      {
        'pointer-events-none text-gray-500 outline-gray-500 outline-dashed hover:outline-gray-500':
          props.readOnly,
        'pointer-events-none cursor-default text-gray-400 outline-gray-400':
          props.disabled,
        '!text-red-600 focus:text-zinc-600': props.error,
      },
      className
    )}
    onChange={(e) => {
      if (props?.maxLength === e.target.value?.length) {
        e.preventDefault();
      } else {
        props.onChange?.(e);
      }
    }}
    {...props}
  />
);

export default AIBTextarea;
