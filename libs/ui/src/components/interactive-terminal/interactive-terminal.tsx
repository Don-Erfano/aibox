'use client';
import { useState, useRef } from 'react';
import { InteractiveTerminalProps } from './interface';

const InteractiveTerminal = ({
  title,
  onCommandSubmit,
}: InteractiveTerminalProps) => {
  const [history, setHistory] = useState<string[]>([]);
  const [command, setCommand] = useState('');
  const shellRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleCommandSubmit = async () => {
    if (!command.trim()) return;

    setHistory((prev) => [...prev, `--> ${command}`]);

    if (onCommandSubmit) {
      try {
        const result = await onCommandSubmit(command);

        if (Array.isArray(result)) {
          setHistory((prev) => [...prev, ...result]);
        } else if (typeof result === 'string') {
          setHistory((prev) => [...prev, result]);
        } else if (result && typeof result === 'object' && 'result' in result) {
          setHistory((prev) => [...prev, String((result as any).result)]);
        } else {
          setHistory((prev) => [...prev, JSON.stringify(result)]);
        }
      } catch (error) {
        setHistory((prev) => [...prev, `${(error as Error).message}`]);
      }
    }

    setCommand('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommandSubmit();
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border bg-gray-300">
      <div className="flex items-end justify-end border-b px-5 py-3">
        {title && <h5 className="text-sm font-medium text-primary">{title}</h5>}
      </div>
      <div
        dir="ltr"
        ref={shellRef}
        style={{ unicodeBidi: 'bidi-override', direction: 'ltr' }}
        className="max-h-[50vh] min-h-[400px] w-full overflow-y-auto bg-black p-4 text-left font-mono text-xs whitespace-pre-line text-gray-100"
      >
        {history.map((line, i) => (
          <div dir="ltr" key={i}>
            {line}
          </div>
        ))}
        <div dir="ltr" className="flex items-center">
          <span dir="ltr" className="mr-2 text-green-400">
            {'-->'}
          </span>
          <input
            dir="ltr"
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border-none bg-transparent font-mono text-xs text-gray-100 outline-none"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default InteractiveTerminal;
