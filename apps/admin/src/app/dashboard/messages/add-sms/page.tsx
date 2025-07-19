import { NextPage } from 'next';
import AddSmsPage from '@/components/pages/messages/sms/add-sms/add-sms';

const AddSmsMessage: NextPage = () => <AddSmsPage />;
export const dynamic = 'force-dynamic';

export default AddSmsMessage;
