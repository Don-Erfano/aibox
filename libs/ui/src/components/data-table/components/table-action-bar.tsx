'use client';

import { createPortal } from 'react-dom';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Table } from '@tanstack/react-table';
import { XIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Separator } from '../../separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../tooltip';

import { TableActionBarSelectionProps } from '../types';
import { cn } from '../../../lib/utils';
import { Button } from '../../form';

interface TableActionBarProps<TData>
  extends React.ComponentProps<typeof motion.div> {
  table: Table<TData>;
  visible?: boolean;
  container?: Element | DocumentFragment | null;
}
export function TableActionBar<TData>({
  table,
  visible: visibleProp,
  container: containerProp,
  children,
}: TableActionBarProps<TData>) {
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        table.toggleAllRowsSelected(false);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [table]);

  const container =
    containerProp ?? (mounted ? globalThis.document?.body : null);

  if (!container) return null;

  const visible =
    visibleProp ?? table.getFilteredSelectedRowModel().rows.length > 0;

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          role="toolbar"
          aria-orientation="horizontal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className={cn(
            'fixed inset-x-0 bottom-6 z-50 mx-auto flex w-fit flex-wrap items-center justify-center gap-2 rounded-md border bg-background p-2 text-foreground shadow-sm'
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    container
  );
}

export function TableActionBarSelection<TData>({
  table,
}: TableActionBarSelectionProps<TData>) {
  const onClearSelection = useCallback(() => {
    table.toggleAllRowsSelected(false);
  }, [table]);

  return (
    <div className="flex h-7 items-center rounded-md border pr-1 pl-2.5">
      <span className="whitespace-nowrap text-xs">
        {table.getFilteredSelectedRowModel().rows.length} سطر انتخاب شده
      </span>
      <Separator
        orientation="vertical"
        className="mr-1 ml-2 data-[orientation=vertical]:h-4"
      />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="size-5"
            onClick={onClearSelection}
          >
            <XIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          sideOffset={10}
          className="flex items-center gap-2 border bg-accent px-2 py-1 font-semibold text-foreground dark:bg-zinc-900 [&>span]:hidden"
        >
          <p>حذف انتخاب</p>
          <kbd className="select-none rounded border bg-background px-1.5 py-px font-mono font-normal text-[0.7rem] text-foreground shadow-xs">
            <abbr title="Escape" className="no-underline">
              بستن
            </abbr>
          </kbd>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
