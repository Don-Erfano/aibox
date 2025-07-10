'use client';

import { Button, Modal } from '@aibox/ui';
import {
  ArrowLeft,
  MessageSquareX,
  SquarePen,
  UserRoundPlus,
} from 'lucide-react';
import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChatContainerProps } from './interface';
import {
  ChatSection,
  TicketsList,
} from '@/components/pages/ticketing/components/chat-component';

import {
  AssignModal,
  CloseModal,
  EditTicketForm,
} from '@/components/pages/ticketing/components/chat-component/container/index';
import { useGetAllTickets } from '@/services/ticketing/ticketing-list';
import { strings } from '@/constant';

const ChatContainer: FC<ChatContainerProps> = ({ ticket_id }) => {
  const { back, push } = useRouter();
  const { tickets } = useGetAllTickets();
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

  useEffect(() => {
    if (ticket_id) {
      setSelectedTicketId(ticket_id);
    }
  }, [ticket_id]);

  const handleTicketSelect = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    const selectedTicket = tickets.find((ticket) => ticket.id === ticketId);
    if (selectedTicket) {
      push(`/dashboard/support/ticketing/${selectedTicket.ticket_num}`);
    }
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };
  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };
  const handleAssignClick = () => {
    setIsAssignModalOpen(true);
  };
  const handleCloseClick = () => {
    setIsCloseModalOpen(true);
  };

  const currentTicketId = selectedTicketId || ticket_id;

  const currentTicket = tickets.find((ticket) => ticket.id === currentTicketId);
  const displayTicketNum = currentTicket?.ticket_num;

  return (
    <div className="flex flex-col h-fit w-full">
      <div className="flex justify-between items-center h-12 px-4 py-3 sm:px-8 md:px-16 lg:px-4 bg-gray-100 border-b border-t border-gray-200">
        <h5 className="text-md font-medium text-slate-950">
          {strings.ticket}
          {displayTicketNum}
        </h5>
        <div className="flex">
          <Button variant="ghost" size="icon" onClick={handleEditClick}>
            <SquarePen size={48} />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleAssignClick}>
            <UserRoundPlus size={48} />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleCloseClick}>
            <MessageSquareX size={48} />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => back()}>
            <ArrowLeft size={48} />
          </Button>
        </div>
      </div>

      <div className="w-full h-fit flex justify-between">
        <div className="hidden md:block">
          <TicketsList
            onTicketSelect={handleTicketSelect}
            selectedTicketId={selectedTicketId}
          />
        </div>
        <div className="w-full h-fit">
          <ChatSection ticketId={selectedTicketId} />
        </div>
      </div>

      <Modal
        title={strings.editTicketCategory}
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onClose={handleEditModalClose}
      >
        <EditTicketForm
          ticketId={currentTicketId}
          onSuccess={handleEditModalClose}
        />
      </Modal>

      <AssignModal
        open={isAssignModalOpen}
        onOpenChange={setIsAssignModalOpen}
        ticketId={currentTicketId}
      />

      <CloseModal
        open={isCloseModalOpen}
        onOpenChange={setIsCloseModalOpen}
        ticketId={currentTicketId}
      />
    </div>
  );
};

export default ChatContainer;
