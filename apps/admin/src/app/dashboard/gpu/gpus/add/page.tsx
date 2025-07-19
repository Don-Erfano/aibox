'use client';

import { NextPage } from 'next';

import { GpuForm } from '@/components';

const Page: NextPage = () => <GpuForm />;
export const dynamic = 'force-dynamic';

export default Page;
