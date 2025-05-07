import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'flex items-center justify-center py-2 gap-2 border border-transparent whitespace-nowrap transition-all cursor-pointer disabled:pointer-events-none [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none border border-transparent',
  {
    variants: {
      variant: {
        general: 'px-4 rounded-[20px] text-slate-200 ',
        form: 'px-3 rounded-lg text-white border border-transparent',
      },
      fullWidth: {
        true: 'w-full',
      },
      error: {
        true: '',
      },
      filled: {
        true: '',
        false: '',
      },
      loading: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'general',
      filled: true,
    },
    compoundVariants: [
      {
        filled: true,
        variant: 'general',
        class:
          'bg-teal-600 hover:bg-white hover:border-teal-600 hover:text-teal-600 active:ring active:ring-teal-600 active:ring-offset-1 active:bg-teal-600 active:text-slate-200 hover:shadow-[0px_0px_7px_0px_rgba(50,_45,_115,_0.85)] active:shadow-[0px_2px_6px_0px_rgba(50,_45,_115,_0.90)]',
      },
      {
        filled: false,
        variant: 'general',
        class:
          'hover:bg-teal-600 hover:text-white border-teal-600 text-teal-600 hover:shadow-none !ring-0 !ring-opacity-0 active:shadow-[0px_0px_7px_0px_rgba(50,_45,_115,_0.24)]',
      },
      {
        filled: true,
        variant: 'form',
        class:
          'border-teal-600f bg-teal-600 hover:text-teal-600 hover:border-teal-600 hover:bg-white active:ring active:ring-teal-600 active:ring-offset-1 active:bg-teal-600 active:text-white',
      },
      {
        filled: false,
        variant: 'form',
        class:
          'border-teal-600 hover:bg-gray-100 hover:text-teal-600 text-teal-600 hover:shadow-none !ring-0 !ring-opacity-0 active:bg-teal-600/25',
      },
      {
        error: true,
        variant: 'form',
        class:
          'bg-red-600 hover:bg-red-400 hover:border-red-600 text-white hover:text-white active:bg-red-400 active:ring-transparent !shadow-none',
      },
      {
        variant: 'form',
        filled: false,
        loading: true,
        class: 'cursor-default pointer-events-none bg-gray-100',
      },
      {
        variant: 'form',
        filled: true,
        loading: true,
        class:
          'bg-white text-[#0F766E] border-teal-600sy cursor-default pointer-events-none',
      },
      {
        variant: 'form',
        loading: true,
        error: true,
        class:
          'bg-red-600 cursor-default pointer-events-none ring-red-400 !border-red-600',
      },
      {
        variant: 'general',
        loading: true,
        class:
          'bg-white text-teal-600 border-teal-600 pointer-events-none shadow-[0px_0px_7px_0px_rgba(50,_45,_115,_0.85))]',
      },
    ],
  }
);

export { buttonVariants };
