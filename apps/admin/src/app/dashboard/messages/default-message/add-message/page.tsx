import { NextPage } from 'next';
import { AddDefaultMessage } from '@/components/pages/messages/default-message/add-default-message';

const Page: NextPage = () => <AddDefaultMessage />;
export const dynamic = 'force-dynamic';

export default Page;
