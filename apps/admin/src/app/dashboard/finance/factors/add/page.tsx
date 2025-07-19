'use client';

import { NextPage } from 'next';

import { FactorForm } from '@/components/pages/factors';

const AddFactorPage: NextPage = () => <FactorForm />;
export const dynamic = 'force-dynamic';

export default AddFactorPage;
