'use client';
import { useLayoutPadding } from './layoutContext';
import { Button } from '@aibox/ui';

export default function Dashboard() {
  const { setMode } = useLayoutPadding();

  const fullWidthChildren = () => {
    setMode('full');
  };
  const paddingChildren = () => {
    setMode('default');
  };
  return (
    <div className="bg-teal-600 lg:bg-red-800">
      Dashboard
      <div>
        <Button onClick={fullWidthChildren}>full width layout</Button>
      </div>
      <div>
        <Button onClick={paddingChildren}>with padding layout</Button>
      </div>
    </div>
  );
}
