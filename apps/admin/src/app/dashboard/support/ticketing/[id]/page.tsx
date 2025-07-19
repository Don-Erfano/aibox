import { NextPage } from 'next';
import { ChatPageComponent } from '@/components/pages/ticketing';

const ChatPage: NextPage = () => <ChatPageComponent />;
export const dynamic = 'force-dynamic';

export default ChatPage;
