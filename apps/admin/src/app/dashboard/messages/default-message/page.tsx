import { NextPage } from 'next';
import { DefaultMessageList } from '@/components/pages/messages/default-message/default-message-list';

const Page: NextPage = () => <DefaultMessageList />;

export const dynamic = 'force-dynamic';

export default Page;
