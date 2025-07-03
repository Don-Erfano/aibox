'use client';

import Link from 'next/link';

export default function Index() {
  return (
    <div>
      <Link href="/dashboard">
        <p>dashbaord</p>
      </Link>
    </div>
  );
}
