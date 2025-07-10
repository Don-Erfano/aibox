import { FC } from 'react';
import { Expand, SquarePen, Trash } from 'lucide-react';
import { DefaultMessageCardProps } from './interface';
import { DeleteMessageModal } from '@/components/pages/messages/components/delete-message-modal';
import { strings } from '@/constant';

const DefaultMessageCard: FC<DefaultMessageCardProps> = ({
  id,
  title_number,
  category_title,
  message,
  onEdit,
  onDelete,
  onExpand,
  deleteModal,
  onDeleteModalChange,
  onConfirmDelete,
  isDeleting,
}) => {
  const handleDeleteClick = () => onDelete?.(id);
  const handleEditClick = () => onEdit?.(id);
  const handleExpandClick = () => onExpand?.(id);

  const isCurrentCardBeingDeleted = deleteModal?.show && deleteModal?.id === id;

  return (
    <>
      <div className="w-78 flex-shrink-0 flex flex-col space-y-2 p-3 h-63 border border-gray-500 rounded-lg">
        <div className="w-full flex justify-between items-center">
          <span className="w-full text-sm font-normal text-gray-500 whitespace-nowrap">
            {category_title} {strings.num} {title_number}
          </span>

          <div className="flex space-x-2">
            <Expand
              onClick={handleExpandClick}
              strokeWidth={1.5}
              className="size-4 text-zinc-700 cursor-pointer hover:text-teal-600"
            />
            <SquarePen
              onClick={handleEditClick}
              strokeWidth={1.5}
              className="size-4 text-zinc-700 cursor-pointer hover:text-teal-600"
            />
            <Trash
              onClick={handleDeleteClick}
              strokeWidth={1.5}
              className="size-4 text-zinc-700 cursor-pointer hover:text-teal-600"
            />
          </div>
        </div>

        <div className="w-72 h-px bg-zinc-700" />

        <div
          className="relative h-43.5 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#0d948240_transparent]
          [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-teal-300 [&::-webkit-scrollbar-thumb]:rounded-[8px]"
        >
          <p className="p-2 text-xs font-normal text-justify leading-normal text-gray-500">
            {message}
          </p>
        </div>
      </div>

      {isCurrentCardBeingDeleted && (
        <DeleteMessageModal
          isOpen={deleteModal.show}
          messageId={id}
          onOpenChange={onDeleteModalChange}
          onConfirmDelete={onConfirmDelete}
          isDeleting={isDeleting}
        />
      )}
    </>
  );
};

export default DefaultMessageCard;
