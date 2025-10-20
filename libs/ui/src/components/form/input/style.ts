import { cva } from "class-variance-authority";

const textfieldWrapperClassNames = cva(
  "flex items-center justify-center gap-2 rounded-[8px] px-2 text-sm text-zinc-800 outline outline-gray-500 focus-within:outline-slate-900 hover:outline-zinc-600",
  {
    variants: {
      variant: {
        lg: "py-[18px]",
        md: "py-[14px]",
        sm: "py-[10px]",
      },
      error: {
        true: "!text-red-600",
      },
      readOnly: {
        true: "pointer-event-none !text-gray-500 outline-gray-500 !outline-dashed",
      },
      disabled: {
        true: "pointer-event-none !text-gray-400 !outline-gray-400 placeholder:!text-gray-400",
      },
    },
    defaultVariants: {
      variant: "md",
    },
    compoundVariants: [
      {
        error: true,
        className: "focus-within:!outeline-red-600 !outline-red-600",
      },
    ],
  },
);

const textfieldClassNames = cva(
  "read-only:pointer-event-none w-full outline-0 placeholder:text-gray-500 read-only:text-zinc-600 read-only:placeholder:text-zinc-600 disabled:placeholder:text-gray-400",
  {
    variants: {
      direction: {
        rtl: "text-right",
        ltr: "text-left",
      },
      error: {
        true: "text-red-600 placeholder:!text-red-600 focus:!text-zinc-800",
      },
    },
    defaultVariants: {
      direction: "rtl",
    },
  },
);

export { textfieldClassNames, textfieldWrapperClassNames };
