'use client';

import {
  AccordionWrapper,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { AccordionItems } from './inetrface';

export default function Accordion({ items }: { items: AccordionItems }) {
  return (
    <AccordionWrapper type="single" collapsible>
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.children}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionWrapper>
  );
}
