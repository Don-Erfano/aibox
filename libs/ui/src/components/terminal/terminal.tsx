'use client';

import { useEffect, useRef } from 'react';
import { Button } from '../form';
import { ChevronsDown, RotateCw, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { TerminalModalProps } from './interface';

const Terminal = ({
  commands = <div />,
  title,
  isOpen,
  onClose,
  onRefresh,
}: TerminalModalProps) => {
  const shellRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToBottom = () => {
    if (shellRef?.current) {
      shellRef.current.scrollTop = shellRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    handleScrollToBottom();
  }, [commands]);

  const controllerButtons = (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon" tooltip="بستن" onClick={onClose}>
        <X className="size-3" />
      </Button>
      {onRefresh && (
        <Button
          size="icon"
          variant="ghost"
          tooltip="Refresh"
          onClick={onRefresh}
        >
          <RotateCw strokeWidth={1.5} />
        </Button>
      )}
      <Button
        size="icon"
        variant="ghost"
        tooltip="Scroll To Bottom"
        onClick={handleScrollToBottom}
      >
        <ChevronsDown strokeWidth={1.5} />
      </Button>
    </div>
  );

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="dire fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-0 shadow-lg lg:w-full">
          <div className="border-b px-4 py-1.5">
            <Dialog.Title className="flex flex-row flex-wrap items-center justify-between">
              <div className="flex items-center gap-2">{controllerButtons}</div>
              <div className="flex items-center gap-2">
                {title && (
                  <h5 className="text-sm font-medium text-primary">{title}</h5>
                )}
              </div>
            </Dialog.Title>
          </div>

          <div className="flex flex-col">
            <section
              ref={shellRef}
              style={{ unicodeBidi: 'bidi-override', direction: 'ltr' }}
              className="max-h-[70vh] min-h-[400px] w-full overflow-y-auto bg-black p-4 text-left font-mono text-xs whitespace-pre-line text-gray-100"
            >
              {commands}
            </section>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Terminal;
