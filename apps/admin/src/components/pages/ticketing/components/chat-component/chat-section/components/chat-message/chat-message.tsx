import { FC, useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChatMessageFormData, chatMessageSchema } from './schema';
import { Button, Form, RHFInput } from '@aibox/ui';
import { SendHorizontal, FileText, Download, User } from 'lucide-react';
import {
  FileUploader,
  UserInfo,
} from '@/components/pages/ticketing/components/chat-component/chat-section/components';
import {
  ChatMessageProps,
  TicketApiMessage,
  ConvertedMessage,
} from './interface';
import { useAnswerTicket } from '@/services/ticketing/ticketing-list';
import { strings } from '@/constant';

export const ChatMessage: FC<ChatMessageProps> = ({ ticket }) => {
  const { mutate: answerTicket } = useAnswerTicket();
  const isClosed = ticket.status === 'closed';

  const convertMessages = (
    apiMessages: TicketApiMessage[]
  ): ConvertedMessage[] =>
    (apiMessages || []).map((msg) => {
      const isUserMessage = msg.author_id === ticket.user;
      return {
        id: msg.id,
        content: msg.body,
        sender: isUserMessage ? 'user' : 'admin',
        senderName: isUserMessage ? strings.user : ticket.operator_id,
        timestamp: new Date(msg.created_at).toLocaleTimeString('fa-IR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        date: new Date(msg.created_at).toLocaleDateString('fa-IR'),
        avatar: isUserMessage ? ticket.user_avatar : ticket.operator_avatar,
        senderId: msg.author_id,
        hasAttachment: !!msg.attachments,
        fileUrl: msg.attachments,
        fileType: '',
        attachmentName: msg.attachments ? strings.attachedFile : '',
      };
    });

  const [localMessages, setLocalMessages] = useState<ConvertedMessage[]>(
    convertMessages(ticket.messages)
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalMessages(convertMessages(ticket.messages));
  }, [
    ticket.messages,
    ticket.id,
    ticket.user_avatar,
    ticket.operator_avatar,
    ticket.operator_id,
    ticket.user,
  ]);

  const form = useForm<ChatMessageFormData>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: { message: '' },
  });

  const { control, handleSubmit, reset, watch } = form;
  const messageValue = watch('message');

  useEffect(() => {
    scrollToBottom();
  }, [localMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAnswerTicket = (body: string, attachments?: string | null) => {
    if (!ticket.id) return;

    answerTicket({
      path: { id: ticket.id },
      payload: {
        data: {
          body,
          attachments,
        },
      },
    });
  };

  const onSubmit = (data: ChatMessageFormData) => {
    if (data.message.trim() && ticket.id) {
      const now = new Date();
      const newMessage: ConvertedMessage = {
        id: `temp-${ticket.id}-${now.getTime()}`,
        content: data.message,
        sender: 'admin',
        senderName: ticket.operator_id,
        timestamp: now.toLocaleTimeString('fa-IR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        date: now.toLocaleDateString('fa-IR'),
        avatar: ticket.operator_avatar,
        senderId: ticket.operator_id,
        hasAttachment: false,
        fileUrl: '',
        fileType: '',
        attachmentName: '',
      };

      setLocalMessages((prev) => [...prev, newMessage]);
      handleAnswerTicket(data.message);
      reset();
    }
  };

  const formatDate = (dateStr: string) => dateStr;

  const shouldShowAvatar = (index: number) => {
    if (index === 0) return true;
    const current = localMessages[index];
    const prev = localMessages[index - 1];
    return current.sender !== prev.sender || current.date !== prev.date;
  };

  const isLastInGroup = (index: number) => {
    if (index === localMessages.length - 1) return true;
    const current = localMessages[index];
    const next = localMessages[index + 1];
    return current.sender !== next.sender || current.date !== next.date;
  };

  if (!ticket.id) return null;

  const currentDate = new Date().toLocaleDateString('fa-IR');

  return (
    <div className="relative flex flex-col h-[calc(100dvh-200px)]">
      <div className="overflow-y-auto">
        <div className="flex-1 pb-16">
          <div className="p-4 space-y-1">
            <div className="mb-[-16px] pt-8">
              <UserInfo
                userName={strings.user}
                userEmail={ticket.user_id}
                userAvatar={ticket.user_avatar}
                user={ticket.user}
              />
            </div>

            {localMessages.map((message, index) => (
              <div key={message.id}>
                {(index === 0 ||
                  localMessages[index - 1].date !== message.date) && (
                  <div className="flex justify-center mb-4">
                    <div className="px-4 py-2 text-sm font-normal text-zinc-700">
                      {formatDate(message.date)}
                    </div>
                  </div>
                )}

                <div
                  className={`flex ${
                    message.sender === 'admin' ? 'justify-start' : 'justify-end'
                  } ${shouldShowAvatar(index) ? 'mb-2' : 'mb-1'}`}
                >
                  <div
                    className={`flex items-start max-w-[70%] ${
                      message.sender === 'admin'
                        ? 'flex-row space-x-2'
                        : 'flex-row-reverse space-x-reverse space-x-2'
                    }`}
                  >
                    <div className="w-10 h-10 flex-shrink-0">
                      {shouldShowAvatar(index) ? (
                        <div className="w-10 h-10 rounded-full bg-gray-300 border-1 border-zinc-700 flex items-start justify-center overflow-hidden">
                          {message.avatar ? (
                            <img
                              src={message.avatar}
                              alt={message.senderName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-10 h-10 text-gray-500" />
                          )}
                        </div>
                      ) : (
                        <div className="w-10 h-10" />
                      )}
                    </div>

                    <div className="text-right">
                      <div
                        className={`rounded-lg p-3 ${
                          message.sender === 'admin'
                            ? 'bg-white text-zinc-700 border border-zinc-200'
                            : 'bg-teal-500 text-white'
                        } ${
                          shouldShowAvatar(index)
                            ? message.sender === 'admin'
                              ? 'rounded-tl-xs'
                              : 'rounded-tr-xs'
                            : ''
                        }`}
                      >
                        {message.hasAttachment && message.fileUrl && (
                          <div className="mb-2">
                            {message.fileUrl?.endsWith('.png') && (
                              <div className="relative">
                                <img
                                  src={message.fileUrl}
                                  alt={message.attachmentName}
                                  className="max-w-50 max-h-40 rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                                  onClick={() =>
                                    window.open(message.fileUrl, '_blank')
                                  }
                                />
                              </div>
                            )}
                            {message.fileUrl?.endsWith('.pdf') && (
                              <div
                                className="flex items-center gap-2 p-3 bg-gray-100 rounded-md border border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors"
                                onClick={() =>
                                  window.open(message.fileUrl, '_blank')
                                }
                              >
                                <FileText className="w-8 h-8 text-red-500" />
                                <div className="flex-1 text-right">
                                  <div className="text-sm font-medium text-gray-800">
                                    {message.attachmentName}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {strings.pdfFile}
                                  </div>
                                </div>
                                <Download className="w-4 h-4 text-gray-400" />
                              </div>
                            )}
                          </div>
                        )}
                        {message.content && (
                          <p className="text-sm font-normal leading-relaxed whitespace-pre-wrap break-words">
                            {message.content}
                          </p>
                        )}
                      </div>

                      {isLastInGroup(index) && (
                        <div
                          className={`flex items-center space-x-1 mt-1 text-[10px] text-gray-500 ${
                            message.sender === 'admin'
                              ? 'flex-row justify-start pr-1'
                              : 'flex-row justify-end'
                          }`}
                        >
                          <span>{message.timestamp}</span>
                          <span>-</span>
                          <span className="w-[10ch]">{message.senderName}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isClosed && (
              <>
                <div className="flex justify-center mt-6">
                  <div className="px-4 text-sm font-normal text-zinc-700">
                    {currentDate}
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <div className="px-6 text-zinc-600 rounded-lg text-sm">
                    {strings.closedByAdmin}
                  </div>
                </div>
              </>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      {!isClosed && (
        <div className="w-full absolute bottom-0 left-0 right-0 bg-zinc-50 border-t-gray-300 border-t-1 p-4 z-50">
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex items-end gap-3"
            >
              <Button
                type="submit"
                variant="ghost"
                disabled={!messageValue?.trim()}
                className={`flex-shrink-0 w-10 h-10 flex items-center justify-center disabled:cursor-not-allowed text-teal-950 hover:bg-teal-50 transition-colors ${
                  messageValue?.trim() ? 'text-teal-600' : 'text-teal-600'
                }`}
              >
                <SendHorizontal className="size-6 text-teal-700" />
              </Button>
              <div className="flex-1">
                <RHFInput
                  name="message"
                  variant="sm"
                  control={control}
                  placeholder={strings.yourMessage}
                  className="bg-white"
                />
              </div>
              <FileUploader ticketId={ticket.id} />
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
