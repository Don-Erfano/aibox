'use client';

import { NextPage } from 'next';
import { usePathname } from 'next/navigation';

const Page: NextPage = () => {
  const pathName = usePathname();
  return <p>{pathName}</p>;
};

export default Page;
