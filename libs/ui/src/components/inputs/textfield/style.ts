import { cva } from 'class-variance-authority';

const textfieldWrapperClassNames = cva(
  'flex justify-center items-center gap-2 outline outline-gray-500 hover:outline-zinc-600 px-2 text-sm text-zinc-800 rounded-[8px] focus-within:outline-slate-900',
  {
    variants: {
      variant: {
        lg: 'py-[18px]',
        md: 'py-[14px]',
        sm: 'py-[10px]',
      },
      error: {
        true: '!text-red-600',
      },
      readOnly: {
        true: '!outline-dashed pointer-event-none outline-gray-500 !text-gray-500',
      },
      disabled: {
        true: '!outline-gray-400 !text-gray-400 placeholder:!text-gray-400 pointer-event-none',
      },
    },
    defaultVariants: {
      variant: 'md',
    },
    compoundVariants: [
      {
        error: true,
        className: '!outline-red-600 focus-within:!outeline-red-600',
      },
    ],
  }
);

const textfieldClassNames = cva(
  'w-full placeholder:text-gray-500 outline-0 disabled:placeholder:text-gray-400 read-only:text-zinc-600 read-only:placeholder:text-zinc-600 read-only:pointer-event-none',
  {
    variants: {
      direction: {
        rtl: 'text-right',
        ltr: 'text-left',
      },
      error: {
        true: 'placeholder:!text-red-600 text-red-600 focus:!text-zinc-800',
      },
    },
    defaultVariants: {
      direction: 'rtl',
    },
  }
);

export { textfieldClassNames, textfieldWrapperClassNames };
