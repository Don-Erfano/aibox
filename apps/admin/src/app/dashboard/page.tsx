'use client';
import { NextPage } from 'next';
import { Dashboard } from '@/components/pages';
const Page: NextPage = () => <Dashboard />;
export const dynamic = 'force-static';
export default Page;
