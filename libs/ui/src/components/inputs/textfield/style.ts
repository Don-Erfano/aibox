import { cva } from 'class-variance-authority';

const textfieldWrapperClassNames = cva(
  'flex justify-center items-center gap-2.5 border border-gray-500 hover:border-zinc-600 px-2 text-sm text-zinc-800 rounded focus-within:!border-slate-900',
  {
    variants: {
      variant: {
        bulk: 'py-[18px]',
        dense: 'py-[14px]',
      },
      error: {
        true: '',
      },
    },
    defaultVariants: {
      variant: 'dense',
    },
    compoundVariants: [
      {
        error: true,
        className: '!border-red-600',
      },
    ],
  }
);

const textfieldClassNames = cva('w-full placeholder:text-gray-500 outline-0', {
  variants: {
    direction: {
      rtl: 'text-right',
      ltr: 'text-left',
    },
  },
  defaultVariants: {
    direction: 'rtl',
  },
});

export { textfieldClassNames, textfieldWrapperClassNames };
