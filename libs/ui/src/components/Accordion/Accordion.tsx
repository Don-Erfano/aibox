'use client';

import { ChevronLeft } from 'lucide-react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { AccordionProps } from './inetrface';

const Accordion = ({ items, type = 'single' }: AccordionProps) => {
  return (
    <AccordionPrimitive.Root type={type} collapsible>
      {items.map(({ title, content }, index) => (
        <AccordionPrimitive.AccordionItem
          dir="rtl"
          className="border"
          key={index}
          value={`item-${index}`}
        >
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-start gap-4 py-3 px-2 font-medium transition-colors duration-200 ease-in-out [&[data-state=open]>svg]:-rotate-90 data-[state=open]:bg-teal-600/12">
              <ChevronLeft className="size-10 text-zinc-700 p-2 shrink-0 ring-1 ring-transparent transition-colors duration-200 ease-in-out bg-transparent rounded-[14px] hover:text-teal-600 hover:bg-[#E3E5E5] hover:ring-teal-600" />
              {title}
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>

          <AccordionPrimitive.Content className="p-3 overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down data-[state=open]:border-t data-[state=open]:border-gray-200">
            <div className="pb-4 pt-0">{content}</div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.AccordionItem>
      ))}
    </AccordionPrimitive.Root>
  );
};

export default Accordion;
