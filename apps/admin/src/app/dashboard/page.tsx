'use client';

import { NextPage } from 'next';

import { Dashboard } from '@/components/pages';

const Page: NextPage = () => <Dashboard />;
export const dynamic = 'force-dynamic';

export default Page;
