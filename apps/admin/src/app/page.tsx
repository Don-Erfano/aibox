import Link from 'next/link';
import { theme } from '@aibox/theme';

export default function Index() {
  console.log(theme());

  return (
    <div>
      <Link href="/dashboard">
        <p>dashbaord</p>
      </Link>
    </div>
  );
}
