'use client';

import DOMPurify from 'isomorphic-dompurify';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '../form';
import { ExpandableTextProps } from './interface';

const ExpandableText = ({ text, minLine = 3 }: ExpandableTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandTrigger, setShowExpandTrigger] = useState(false);

  const textRef = useRef<HTMLParagraphElement>(null);

  const expandableHeightThreshold = minLine * 24;
  const sanitizedText = DOMPurify.sanitize(text);

  useEffect(() => {
    const checkHeight = () => {
      if (textRef.current) {
        setShowExpandTrigger(
          textRef.current.scrollHeight > expandableHeightThreshold
        );
      }
    };

    checkHeight();

    const resizeObserver = new ResizeObserver(checkHeight);
    if (textRef.current) {
      resizeObserver.observe(textRef.current);
    }

    window.addEventListener('resize', checkHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', checkHeight);
    };
  }, [text, minLine]);

  return (
    <div className="flex flex-col items-start gap-2">
      <p
        ref={textRef}
        dangerouslySetInnerHTML={{ __html: sanitizedText }}
        className="overflow-hidden text-sm/6 font-normal text-zinc-800 transition-all duration-500 ease-in-out"
        style={{
          maxHeight: isExpanded ? '1000px' : `${expandableHeightThreshold}px`,
        }}
      />

      {showExpandTrigger && (
        <Button variant="link" onClick={() => setIsExpanded((prev) => !prev)}>
          {isExpanded ? 'جمع کردن' : 'بیشتر بخوانید'}
          {isExpanded ? <ChevronsRight /> : <ChevronsLeft />}
        </Button>
      )}
    </div>
  );
};

export default ExpandableText;
