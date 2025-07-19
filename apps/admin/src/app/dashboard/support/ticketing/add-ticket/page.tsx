'use client';

import { NextPage } from 'next';
import { AddTicketPage } from '@/components/pages/ticketing';

const Page: NextPage = () => <AddTicketPage />;
export const dynamic = 'force-dynamic';

export default Page;
