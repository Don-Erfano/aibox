'use client';

import { FC } from 'react';
import { CustomMessageProps } from './interface';
import { Button } from '@aibox/ui';
import clsx from 'clsx';
import { Plus, Trash2 } from 'lucide-react';
import { AIBInput } from '@aibox/ui';
import { strings } from '@/constant';

const CustomMessage: FC<CustomMessageProps> = ({ value, onChange }) => {
  const values = value && value.length > 0 ? value : [''];

  const handleAdd = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    onChange([...values, '']);
  };

  const handleRemove = (idx: number) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    onChange(values.filter((_, i) => i !== idx));
  };

  const handleChange = (idx: number, newValue: string) => {
    const newValues = [...values];
    newValues[idx] = newValue;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    onChange(newValues);
  };

  return (
    <div className="flex-col items-center justify-center">
      {values.map((text, idx) => (
        <div key={idx} className="flex items-center gap-4 mb-6">
          <div className="flex-1 items-center justify-center">
            <AIBInput
              type="text"
              variant="md"
              className="w-full h-16 "
              placeholder={strings.createMessage}
              value={text}
              onChange={(e) => handleChange(idx, e.target.value)}
            />
          </div>
          {values.length > 1 && (
            <Trash2
              strokeWidth={1.5}
              className="cursor-pointer siz-6 text-gray-500 mt-3"
              onClick={() => handleRemove(idx)}
            />
          )}
        </div>
      ))}

      <Button
        onClick={handleAdd}
        variant="ghost"
        title={strings.addNewQuestion}
        className={clsx(
          'flex items-center !bg-teal-600 justify-center mx-auto mt-4',
          'size-9 rounded-full bg-transparent text-2xl'
        )}
      >
        <Plus strokeWidth={1.5} className="text-white size-7" />
      </Button>
    </div>
  );
};

export default CustomMessage;
