'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './Accordion';
import { AccordionItems } from './types';

export default function CustomAccordion({ items }: { items: AccordionItems }) {
  return (
    <Accordion type="single" collapsible>
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.children}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
