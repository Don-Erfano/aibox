import { ComponentProps, FC } from "react";
import { Root } from "@radix-ui/react-accordion";

const Accordion: FC<ComponentProps<typeof Root>> = ({ ...props }) => (
  <Root data-slot="accordion" {...props} />
);

export default Accordion;
