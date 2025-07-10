import { FC, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { TicketTab } from '@/components/pages/ticketing/components/chat-component/tickets-list/components/ticket-tab';
import { TicketDetail } from '@/components/pages/ticketing/components/chat-component/tickets-list/components/ticket-detail';
import { TicketsListProps } from './interface';
import { ITicketWithLastMessage } from '@/services/ticketing/ticketing-list/interface';
import { useGetAllTickets } from '@/services/ticketing/ticketing-list';
import { SUPPORT_ROUTES } from '@/routes';

const TicketsList: FC<TicketsListProps> = ({
  onTicketSelect,
  selectedTicketId,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('all');
  const { tickets, isLoading } = useGetAllTickets();

  const ticketCounts = useMemo(() => {
    const allTickets = tickets.length;
    const assignedTickets = tickets.filter(
      (ticket) => ticket.operator_id
    ).length;
    const openTickets = tickets.filter(
      (ticket) => ticket.status === 'opened'
    ).length;

    return {
      all: allTickets,
      assigned: assignedTickets,
      open: openTickets,
    };
  }, [tickets]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const getFilteredTickets = (): ITicketWithLastMessage[] => {
    switch (activeTab) {
      case 'assigned':
        return tickets.filter((ticket) => ticket.operator_id);
      case 'open':
        return tickets.filter((ticket) => ticket.status === 'opened');
      case 'all':
      default:
        return tickets;
    }
  };

  const filteredTickets = getFilteredTickets();

  const handleTicketClick = (ticket: ITicketWithLastMessage) => {
    onTicketSelect(ticket.id);
    router.push(`${SUPPORT_ROUTES.TICKETING}/${ticket.id}`);
  };

  if (isLoading) {
    return (
      <div className="max-w-[500px] h-[calc(100dvh-150px)] flex items-center justify-center">
        <div>در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className="max-w-[500px] h-[calc(100dvh-150px)] flex flex-col">
      <TicketTab
        ticketCounts={ticketCounts}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <div className="h-170 flex flex-col overflow-auto">
        {filteredTickets.map((ticket) => (
          <TicketDetail
            key={ticket.id}
            id={ticket.id}
            time={new Date(ticket.created_at).toLocaleTimeString('fa-IR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
            status={ticket.status}
            username={ticket.user_id}
            message={ticket.subject}
            priority={ticket.level}
            status_name={ticket.status_name}
            isSelected={selectedTicketId === ticket.id}
            onClick={() => handleTicketClick(ticket)}
            unseenMessages={ticket.unseen_messages}
          />
        ))}
      </div>
    </div>
  );
};

export default TicketsList;
