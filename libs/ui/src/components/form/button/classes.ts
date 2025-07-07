import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  `flex flex-nowrap cursor-pointer w-fit items-center justify-center
     gap-2 whitespace-nowrap rounded-md text-sm font-medium
     transition-all disabled:pointer-events-none disabled:opacity-50
     [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4
     shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring
     focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20
     aria-invalid:border-destructive`,
  {
    variants: {
      variant: {
        default: `rounded-[20px] text-primary-foreground shadow-xs hover:bg-primary/90`,
        destructive: `!bg-red-600 !border rounded-[6px] !border-transparent px-3 py-2
          !text-white hover:!bg-red-400 hover:!border-red-600 hover:!text-white disabled:!bg-error-100/20
          disabled:!border-error-100/20`,
        outline: `border rounded-[6px] border-transparent bg-teal-600 active:ring
             disabled:bg-teal-600/12 disabled:border-teal-600/32 disabled:text-teal-600/32`,
        ghost: `p-2 overflow-hidden rounded-[14px]`,
        link: `text-primary underline-offset-4 hover:text-teal-600 !border-transparent !px-3 !py-1.5 hover:!bg-gray-200 text-teal-600 active:!border-gray-400 active:!ring-0 disabled:text-teal-600/32`,
      },
      size: {
        default: `px-4 py-2`,
        sm: `gap-1.5 px-3 py-2`,
        lg: `w-[136px] px-2 py-2 has-[>svg]:px-4`,
        icon: `size-10`,
        full: '!w-full px-4 py-2',
      },
      isFilled: {
        true: `bg-teal-600 border border-transparent text-white hover:bg-white hover:border-teal-600
           hover:text-teal-600 active:border-white active:bg-teal-600 active:text-white disabled:bg-teal-600/12
           disabled:border-teal-600/12 disabled:text-teal-600/25`,
        false: `bg-transparent border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white active:bg-teal-600 active:ring`,
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      isFilled: false,
    },
    compoundVariants: [
      {
        variant: 'outline',
        isFilled: false,
        className: `hover:bg-gray-200/40 hover:border-teal-600 hover:text-teal-600 active:bg-teal-600/25 
                      active:ring-0 disabled:bg-white disabled:border-teal-600/32 disabled:text-teal-600/32`,
      },
      {
        variant: 'outline',
        isFilled: true,
        className: 'dieabled:bg-teal-600/12',
      },
      {
        variant: 'ghost',
        isFilled: false,
        className: `bg-transparent text-zinc-700 border border-transparent hover:bg-gray-100 active:text-teal-600 !p-2 active:bg-zinc-200 
                    acitve:ring-0 active:border-teal-600 aria-selected:bg-teal-600 aria-selected:text-white hover:text-teal-600`,
      },
    ],
  }
);

export { buttonVariants };
