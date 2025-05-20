'use client';
import { Card } from '@/components';

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-6 flex-wrap sm:flex-wrap lg:flex-nowrap">
        <Card
          hasFooter
          buttonLabel="label"
          clickHandler={() => console.log('click')}
        >
          children
        </Card>
        <Card
          hasFooter
          buttonLabel="label"
          clickHandler={() => console.log('click')}
        >
          children
        </Card>
        <Card
          hasFooter
          buttonLabel="label"
          clickHandler={() => console.log('click')}
        >
          children
        </Card>
        <Card
          hasFooter
          buttonLabel="label"
          clickHandler={() => console.log('click')}
        >
          children
        </Card>
      </div>
      <div className="w-full">
        <Card title="title hastam"></Card>
      </div>
    </div>
  );
}
