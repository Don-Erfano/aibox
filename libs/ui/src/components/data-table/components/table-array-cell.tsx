'use client';
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../../popover';
import { ArrayCellProps } from '../types';

export const TableArrayCell: React.FC<ArrayCellProps> = ({
  items = [],
  maxVisible = 2,
}) => {
  const [open, setOpen] = useState(false);

  const visibleItems = items.slice(0, maxVisible);
  const hiddenCount = items.length - maxVisible;

  if (!items || items.length === 0) {
    return <span className="text-sm text-muted-foreground">———</span>;
  }

  return (
    <div className="flex items-center space-x-1">
      <span className="text-sm text-foreground">{visibleItems.join('، ')}</span>

      {hiddenCount > 0 && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <span
              onClick={() => setOpen(true)}
              className="text-sm text-primary underline cursor-pointer ml-1"
            >
              ... ({hiddenCount})
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-fit min-w-[150px] p-3 space-y-1">
            {items.map((item, idx) => (
              <div key={idx} className="text-sm text-foreground">
                {`${item}، `}
              </div>
            ))}
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
