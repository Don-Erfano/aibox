'use client';

import { NextPage } from 'next';

import { AddTransactionForm } from '@/components/pages/transactions';

const AddTransactionPage: NextPage = () => <AddTransactionForm />;
export const dynamic = 'force-dynamic';

export default AddTransactionPage;
