import { useEffect, useRef } from 'react';
import { Button } from '../form';
import { RefreshCw, X } from 'lucide-react';
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
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" tooltip="Refresh" onClick={onRefresh}>
        <RefreshCw className="size-5" />
      </Button>
      <Button variant="ghost" size="icon" tooltip="Close" onClick={onClose}>
        <X className="size-5" />
      </Button>
    </div>
  );

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-4xl max-h-[90vh] w-full bg-white rounded-lg shadow-lg z-50 p-0">
          <div className="px-6 py-2 border-b">
            <Dialog.Title className="flex items-center justify-between flex-row-reverse">
              <div className="flex items-center gap-2">
                {title && (
                  <h5 className="text-primary text-lg font-semibold">
                    {title}
                  </h5>
                )}
              </div>
              <div className="flex items-center gap-2">{controllerButtons}</div>
            </Dialog.Title>
          </div>

          <div className="flex flex-col">
            <section
              ref={shellRef}
              className="overflow-y-auto bg-black text-gray-100 p-4 text-xs whitespace-pre-line font-mono w-full max-h-[70vh] min-h-[400px]"
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
