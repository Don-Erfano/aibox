'use client';

import {
  ToggleGroupItem,
  Root as ToggleGroupRoot,
} from '@radix-ui/react-toggle-group';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { Rect, ToggleGroupProps } from './interface';

export const ToggleGroup = (props: ToggleGroupProps) => {
  const { items, value, onValueChange } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [rect, setRect] = useState<Rect>({
    width: 0,
    height: 0,
    x: 0,
  });

  const updateRect = () => {
    const selectedIndex = items.findIndex((i) => i.value === value);
    const node = itemRefs.current[selectedIndex];

    if (node && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const nodeRect = node.getBoundingClientRect();
      setRect({
        width: nodeRect.width,
        height: nodeRect.height,
        x: nodeRect.right - containerRect.right,
      });
    }
  };

  useEffect(() => {
    updateRect();
    window.addEventListener('resize', updateRect);
    return () => {
      window.removeEventListener('resize', updateRect);
    };
  }, [value, items]);

  return (
    <div ref={containerRef} className="relative w-fit">
      <ToggleGroupRoot
        className="border border-zinc-800 rounded-[10px] py-px pl-[2px] flex gap-1 relative"
        type="single"
        value={value}
        onValueChange={onValueChange}
      >
        {value && (
          <div
            className="absolute bg-teal-600 rounded-[8px] transition-all duration-300 pointer-events-none top-[2px] right-px"
            style={{
              width: rect.width - 2,
              height: rect.height - 2,
              transform: `translateX(${rect.x}px)`,
            }}
          />
        )}

        {items.map((item, index) => (
          <ToggleGroupItem
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            key={item.value}
            value={item.value}
            aria-label={`toggle ${item.value}`}
            className={clsx(
              'relative cursor-pointer text-teal-600 px-3 py-1 rounded-[8px] font-medium outline-0 transition-colors duration-300',
              { '!text-stone-50': value === item.value }
            )}
          >
            {item.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroupRoot>
    </div>
  );
};
