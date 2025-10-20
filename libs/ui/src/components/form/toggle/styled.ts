import { cva } from "class-variance-authority";

export const toggleGroupClass = cva("relative grid h-8 w-fit border", {
  variants: {
    variant: {
      primary: "rounded-[5px] border-teal-600",
      secondary: "rounded-[10px] border-zinc-800",
    },
    readonly: {
      true: "border-dashed",
    },
    disabled: {
      true: "opacity-40",
    },
    onOff: {
      true: "!border-gray-500",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export const toggleValueClass = cva(
  "absolute h-7 translate-y-px bg-teal-600 transition-all duration-300",
  {
    variants: {
      variant: {
        primary: "rounded-[5px]",
        secondary: "rounded-[8px]",
      },
      onOff: {
        true: "!bg-gray-400",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export const toggleItemClass = cva(
  "relative cursor-pointer px-3 py-1 font-medium text-teal-600/70 transition-colors duration-500",
  {
    variants: {
      selected: {
        true: "!text-stone-50",
      },
      variant: {
        primary: "rounded-[5px]",
        secondary: "rounded-[8px]",
      },
      onOff: {
        true: "!text-gray-500",
      },
      size: {
        fixed: "w-24",
        auto: "w-full",
      },
      disabled: {
        true: "!cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "auto",
    },
  },
);

export const labelClass = cva("text-sm font-medium text-nowrap", {
  variants: {
    size: {
      fixed: "truncate",
      auto: "",
    },
  },
  defaultVariants: {
    size: "auto",
  },
});
