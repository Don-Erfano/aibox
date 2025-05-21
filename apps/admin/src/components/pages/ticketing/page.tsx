'use client';
import { FC } from 'react';
import { Button } from '@aibox/ui';
import { Plus } from 'lucide-react';

const TicketingPage: FC = () => {
  return (
    <div>
      <div className="relative">
        <Button
          className="h-14 w-14 absolute top-0 left-0 shadow-2xl text-2xl rounded-full bg-teal-600 hover:bg-teal-700"
          variant="ghost"
        >
          <Plus strokeWidth={2.5} className="text-white size-6" />
        </Button>
      </div>
    </div>
  );
};
export default TicketingPage;
