import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'flex justify-center items-center gap-2 [&>svg]:size-6 transition-all duration-300 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        general: 'h-10 px-3 py-2 rounded-full',
        form: 'h-9 px-3 py-2 rounded-[7px]',
        text: 'h-9 px-3 py-[6px] border border-white rounded-[4px] bg-white text-teal-600 focus:bg-[#E3E5E5] focus:border focus:border-gray-300 disabled:bg-white disabled:text-teal-600/25',
        icon: 'size-10 border border-white rounded-[14px] text-zinc-700 hover:bg-[#E3E5E5] hover:text-teal-600 hover:border-[#E3E5E5] focus:bg-[#E3E5E5] focus:text-teal-600 focus:border-teal-600 disabled:bg-white disabled:text-[#D1D5DB] disabled:border-white aria-selected:bg-teal-600 aria-selected:text-white aria-selected:border-teal-600 data-[activated=true]:bg-white data-[activated=true]:text-teal-600 data-[activated=true]:border-white',
        warning:
          'h-9 px-3 py-2 rounded-[7px] bg-[#B00020] border border-white text-white hover:bg-[#C0334D] hover:border-[#B00020] focus:bg-[#C0334D] focus:border-[#B00020] disabled:bg-[#EFCCD2] disabled:border-[#EFCCD2]',
      },
      isFilled: {
        true: '',
        false: '',
      },
      size: {
        default: '',
        fixed:
          'w-[136px] h-9',
      },
    },
    compoundVariants: [
      {
        variant: 'general',
        isFilled: true,
        className:
          'bg-teal-600 border border-teal-600 text-slate-200 shadow-[0_0_7px_0] shadow-transparent hover:bg-white hover:text-teal-600 hover:shadow-teal-600/85 focus:bg-teal-600 focus:text-slate-200 focus:shadow-teal-600/85 aria-selected:bg-white aria-selected:text-teal-600 aria-selected:shadow-[0_2px_6px_0] aria-selected:shadow-teal-600/90 disabled:bg-teal-600/25 disabled:text-white disabled:border-teal-600/25',
      },
      {
        variant: 'general',
        isFilled: false,
        className:
          'bg-white border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white focus:bg-white focus:text-teal-600 aria-selected:bg-teal-600 aria-selected:text-white disabled:bg-[#E3E5E5]/25 disabled:text-teal-600/25 disabled:border-teal-600/25',
      },
      {
        variant: 'form',
        isFilled: true,
        className:
          'bg-teal-600 border border-teal-600 text-slate-200 hover:bg-white hover:text-teal-600 focus:bg-teal-600 focus:text-slate-200 disabled:bg-teal-600/25 disabled:text-white disabled:border-teal-600/25',
      },
      {
        variant: 'form',
        isFilled: false,
        className:
          'bg-white border border-teal-600 text-teal-600 hover:bg-gray-200 hover:text-teal-600 focus:bg-teal-600/25 disabled:bg-white disabled:text-gray-300 disabled:border-gray-300',
      },
    ],
    defaultVariants: {
      variant: 'general',
      isFilled: true,
      size: 'default',
    },
  }
);
