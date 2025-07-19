import { NextPage } from 'next';
import { AddPublicMessagePage } from '@/components/pages/messages';

const AddPublicMessage: NextPage = () => <AddPublicMessagePage />;
export const dynamic = 'force-dynamic';

export default AddPublicMessage;
