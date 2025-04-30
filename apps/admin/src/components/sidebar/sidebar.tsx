'use client';
import { Button } from '@aibox/ui';
import { useState } from 'react';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div
      className={`h-[calc(100vh_-_64px)] ${
        isOpen ? 'w-[11.5rem]' : 'w-[60px]'
      } max-[905px]:hidden transition-all duration-[0.5s] flex flex-col justify-between pt-8 pb-3 text-white bg-[#022C22]`}
    >
      <Button onClick={() => setIsOpen((open) => !open)} variant="secondary">
        Its {isOpen ? 'open' : 'close'}
      </Button>
      Sidebar
    </div>
  );
};
