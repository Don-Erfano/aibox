import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { Rect, ToggleGroupProps } from './interface';

export const ToggleGroup = (props: ToggleGroupProps) => {
  const { items, selected, setSelected } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [rect, setRect] = useState<Rect>({
    width: 0,
    height: 0,
    x: 0,
  });

  const updateRect = () => {
    const selectedIndex = items.findIndex((i) => i.value === selected);
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
  }, [selected, items]);

  return (
    <div ref={containerRef} className="relative w-fit">
      <ToggleGroupPrimitive.Root
        className="border border-zinc-800 rounded-[10px] py-px px-[0.5px] flex gap-1 relative"
        type="single"
        value={selected}
        onValueChange={(value) => setSelected(value)}
      >
        {selected && (
          <div
            className="absolute bg-teal-600 rounded-[8px] transition-all duration-300 pointer-events-none top-[2px]"
            style={{
              width: rect.width - 2,
              height: rect.height - 2,
              transform: `translateX(${rect.x}px)`,
            }}
          />
        )}

        {items.map((item, index) => (
          <ToggleGroupPrimitive.Item
            ref={(el) => (itemRefs.current[index] = el)}
            key={item.value}
            value={item.value}
            aria-label={`toggle ${item.value}`}
            className={clsx(
              'relative text-teal-600/50 px-3 py-1 rounded-[8px] font-medium outline-0 transition-colors duration-300',
              { '!text-stone-50': selected === item.value }
            )}
          >
            {item.label}
          </ToggleGroupPrimitive.Item>
        ))}
      </ToggleGroupPrimitive.Root>
    </div>
  );
};
