import { ComponentProps, ComponentType } from "react";
import { VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { buttonVariants } from "./classes";

type buttonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    tooltip?: string;
    loading?: boolean;
  };

export type { buttonProps };

export interface InnerButtonProps extends buttonProps {
  Comp: "button" | typeof Slot | ComponentType<buttonProps>;
}
