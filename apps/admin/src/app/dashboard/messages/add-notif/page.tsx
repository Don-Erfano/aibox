import { NextPage } from 'next';
import AddNotificationPage from '@/components/pages/messages/notifications/add-notification/add-notification';

const AddNotification: NextPage = () => <AddNotificationPage />;
export const dynamic = 'force-dynamic';

export default AddNotification;
