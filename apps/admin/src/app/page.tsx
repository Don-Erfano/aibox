import { Button } from '@aibox/ui';
import Link from 'next/link';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <div>
      <Link href="/dashboard">
        <Button variant="general">Dashboard</Button>
      </Link>
    </div>
  );
}
