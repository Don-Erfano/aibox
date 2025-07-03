import { cva } from 'class-variance-authority';

export const toggleGroupClass = cva(
  'relative border border-teal-700 rounded-[5px] h-8 grid grid-cols-2 w-fit',
  {
    variants: {
      readonly: {
        true: 'border-dashed',
      },
      disabled: {
        true: 'opacity-50',
      },
      variant: {
        onOff: '',
        default: '',
      },
      isSecondItemSelected: {
        true: '',
      },
    },
    compoundVariants: [
      {
        variant: 'onOff',
        isSecondItemSelected: true,
        className: '!border-gray-500',
      },
    ],
  }
);

export const toggleValueClass = cva(
  'absolute translate-y-px w-1/2 h-7 bg-teal-700 rounded-[5px] transition-all duration-300',
  {
    variants: {
      variant: {
        onOff: '',
        default: '',
      },
      isSecondItemSelected: {
        true: '-translate-x-[calc(100%-1px)]',
        false: '-translate-x-px',
      },
    },
    compoundVariants: [
      {
        variant: 'onOff',
        isSecondItemSelected: true,
        className: '!bg-gray-400',
      },
    ],
  }
);

export const toggleItemClass = cva(
  'relative cursor-pointer text-teal-600/50 py-1 px-3 rounded-[5px] font-medium',
  {
    variants: {
      selected: {
        true: '!text-stone-50',
      },
      variant: {
        onOff: '',
        default: '',
      },
      isSecondItemSelected: {
        true: '',
      },
      size: {
        fixed: 'w-24',
        auto: 'w-full',
      },
      disabled: {
        true: '!cursor-not-allowed',
      },
    },
    compoundVariants: [
      {
        variant: 'onOff',
        isSecondItemSelected: true,
        className: '!text-gray-500',
      },
    ],
  }
);

export const labelClass = cva('text-nowrap text-sm font-medium', {
  variants: {
    size: {
      fixed: 'truncate',
      auto: '',
    },
  },
});
