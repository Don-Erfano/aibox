import { ComponentProps } from "react";
import type { VariantProps } from "class-variance-authority";

import badgeVariants from "./classess";

type TBadgeProps = ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean };

export type { TBadgeProps };
