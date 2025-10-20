'use client';

import { useEffect, useRef } from 'react';
import { Button } from '../form';
import { ChevronsDown, RotateCw, X } from 'lucide-react';
import { DeployTerminalProps } from './interface';

const DeployTerminal = ({
  title,
  commands = <div />,
  onClose,
  onRefresh,
}: DeployTerminalProps) => {
  const shellRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToBottom = () => {
    if (shellRef.current) {
      shellRef.current.scrollTop = shellRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    handleScrollToBottom();
  }, [commands]);

  return (
    <div className="overflow-hidden rounded-lg border bg-gray-300 shadow-sm">
      <div className="flex items-center justify-between border-b px-4 py-1.5">
        <div className="flex items-center gap-1">
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              tooltip="Close"
              onClick={onClose}
            >
              <X className="size-3" />
            </Button>
          )}
          {onRefresh && (
            <Button
              variant="ghost"
              size="icon"
              tooltip="Refresh"
              onClick={onRefresh}
            >
              <RotateCw strokeWidth={1.5} />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            tooltip="Scroll To Bottom"
            onClick={handleScrollToBottom}
          >
            <ChevronsDown strokeWidth={1.5} />
          </Button>
        </div>
        {title && <h5 className="text-sm font-medium text-primary">{title}</h5>}
      </div>

      <div
        ref={shellRef}
        style={{ unicodeBidi: 'bidi-override', direction: 'ltr' }}
        className="max-h-[50vh] min-h-[400px] w-full overflow-y-auto bg-black p-4 text-left font-mono text-xs whitespace-pre-line text-gray-100"
      >
        {commands}
      </div>
    </div>
  );
};

export default DeployTerminal;
