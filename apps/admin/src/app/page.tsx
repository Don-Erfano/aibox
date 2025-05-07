import { Button } from '@aibox/ui';
import { services } from '@aibox/services';
import { theme } from '@aibox/theme';
import Link from 'next/link';

export default function Index() {
  console.log(services());
  console.log(theme());
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <div>
      <Link href="/dashboard">
        <Button variant="link">Dashboard</Button>
      </Link>
    </div>
  );
}
