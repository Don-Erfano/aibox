'use client';

import React, { FC, useState } from 'react';
import { Button } from '@aibox/ui';
import clsx from 'clsx';
import { Plus, Trash2 } from 'lucide-react';
import { AIBInput } from '@aibox/ui';

const CustomMessage: FC = () => {
  const [rows, setRows] = useState<string[]>(['']);

  const handleAdd = () => {
    setRows((prev) => [...prev, '']);
  };

  const handleRemove = (idx: number) => {
    setRows((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleChange = (idx: number, value: string) => {
    setRows((prev) => prev.map((row, i) => (i === idx ? value : row)));
  };

  return (
    <div className="flex-col items-center justify-center">
      {rows.map((text, idx) => (
        <div key={idx} className="flex items-center gap-4 mb-6">
          <div className="flex-1 items-center justify-center">
            <AIBInput
              type="text"
              variant="md"
              className="w-full h-16 "
              placeholder="متن راهنما پیش‌فرض"
              value={text}
              onChange={(e) => handleChange(idx, e.target.value)}
            />
          </div>
          <Trash2
            strokeWidth={1.5}
            className="cursor-pointer siz-6 text-gray-500 mt-3"
            onClick={() => handleRemove(idx)}
          />
        </div>
      ))}
      <div className="items-center justify-center flex ">
        <Button
          onClick={handleAdd}
          variant="ghost"
          className={clsx(
            'relative items-center !mx-auto mt-4',
            'size-6 rounded-full bg-transparent text-2xl',
            'hover:!bg-teal-600/40 border-1 border-gray-500'
          )}
        >
          <Plus strokeWidth={1} className="text-zinc-700 size-6" />
        </Button>
      </div>
    </div>
  );
};

export default CustomMessage;
