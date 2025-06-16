'use client';

import { FC, useState } from 'react';
import { SupportAccordionProps } from './interface';
import { QuestionIcon, HintIcon } from '@aibox/ui';
import { ChevronDown, ChevronUp, Edit } from 'lucide-react';

const SupportAccordion: FC<SupportAccordionProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setIsOpen((o) => !o)}
        aria-expanded={isOpen}
        className={`
          w-full h-12 flex items-center justify-between
          px-4 py-4 focus:outline-none
          cursor-pointer
          ${isOpen ? 'bg-zinc-200 rounded-l-lg' : 'bg-white'}
          relative
        `}
      >
        <div className="flex items-center space-x-2">
          <QuestionIcon />
          <span className="text-sm font-medium text-zin-700">{question}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Edit className="w-5 h-5" />
          {isOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
        <span
          className="absolute top-0 right-0 h-full w-1 bg-teal-600 z-10"
          aria-hidden="true"
        />
      </div>

      {isOpen && (
        <div className="relative flex space-x-2 px-4 py-2  bg-white items-center ">
          <HintIcon />
          <div className="w-full text-start">
            <p className="text-sm text-gray-600 leading-relaxed text-justify">
              {answer}
            </p>
          </div>
          <span
            className="absolute top-0 right-0 h-full w-1 bg-gray-500"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
};

export default SupportAccordion;
