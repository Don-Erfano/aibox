type AccordionItem = {
  title: React.ReactNode;
  content: React.ReactNode;
};

export interface AccordionProps {
  items: AccordionItem[];
  type?: 'single' | 'multiple';
}
