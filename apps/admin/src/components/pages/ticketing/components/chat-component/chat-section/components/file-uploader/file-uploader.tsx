import { ChangeEvent, FC, useRef, useState } from 'react';
import { FileUploaderProps, FileWithPreviewProps } from './interface';
import { Paperclip, FileText, Send, Loader2 } from 'lucide-react';
import { Button, toast, Modal, AIBInput } from '@aibox/ui';
import { useAnswerTicket } from '@/services/ticketing/ticketing-list';
import { useUploadFile } from '@/services/upload';
import { strings } from '@/constant';

const FileUploader: FC<FileUploaderProps> = ({
  onFileUpload,
  onError,
  ticketId,
}) => {
  const { mutate: answerTicket, isPending: isAnswering } = useAnswerTicket();
  const { mutate: uploadFile, isPending: isUploading } = useUploadFile();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileWithPreviewProps | null>(
    null
  );
  const [comment, setComment] = useState('');

  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  const isProcessing = isUploading || isAnswering;

  const validateFile = (file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return `${strings.allowedFileType}`;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return `${strings.fileLimitation}`;
    }

    return null;
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const error = validateFile(file);

      if (error) {
        toast.error(error);
        if (onError) {
          onError(error);
        }
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      const url = URL.createObjectURL(file);
      setSelectedFile({
        file,
        url,
        comment: '',
      });
      setComment('');
      setIsModalOpen(true);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (selectedFile) {
      URL.revokeObjectURL(selectedFile.url);
      setSelectedFile(null);
    }
    setComment('');
  };

  const handleSendFile = async () => {
    if (!selectedFile || !ticketId) return;

    try {
      const formData = new FormData();
      formData.append('type', 'ticket');
      formData.append('file', selectedFile.file);

      uploadFile(formData, {
        onSuccess: (uploadResponse) => {
          const fileId = uploadResponse.id;
          answerTicket(
            {
              path: { id: ticketId },
              payload: {
                data: {
                  body: comment,
                  attachments: fileId,
                },
              },
            },
            {
              onSuccess: () => {
                if (onFileUpload) {
                  onFileUpload({
                    file: selectedFile.file,
                    fileId: fileId,
                    comment: comment,
                  });
                }

                handleModalClose();
              },
            }
          );
        },
      });
    } catch (error: any) {
      toast.error('خطا در ارسال فایل');
    }
  };

  const handlePaperclipClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        className="hidden"
        accept=".pdf,image/*"
      />

      <Button
        variant="ghost"
        onClick={handlePaperclipClick}
        disabled={isProcessing}
        className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
      >
        {isProcessing ? (
          <Loader2 className="size-6 animate-spin" />
        ) : (
          <Paperclip strokeWidth={1.5} className="size-6" />
        )}
      </Button>

      <Modal
        title={strings.sendFile}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onClose={handleModalClose}
      >
        {selectedFile && (
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              {selectedFile.file.type.startsWith('image/') && (
                <div className="flex justify-center">
                  <img
                    src={selectedFile.url}
                    alt={selectedFile.file.name}
                    className="max-w-full max-h-50 rounded-md object-contain"
                  />
                </div>
              )}

              {selectedFile.file.type === 'application/pdf' && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-md">
                  <FileText className="size-12 text-red-500" />
                  <div className="flex-1">
                    <div className="text-xs text-gray-500">PDF فایل </div>
                    <div className="text-sm font-medium text-gray-800">
                      {selectedFile.file.name}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-3 text-xs text-gray-500 text-center">
                {selectedFile.file.name}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                {strings.optionalDescription}
              </label>
              <div className="w-full relative pt-1">
                <AIBInput
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="توضیحات خود را بنویسید..."
                  variant="sm"
                />
              </div>
            </div>

            <div className="flex justify-center items-center gap-5 pt-4">
              <Button
                size="lg"
                isFilled
                onClick={handleSendFile}
                disabled={isProcessing}
              >
                {strings.send}
                <Send className="w-4 h-4" />
              </Button>
              <Button
                variant="default"
                size="lg"
                onClick={handleModalClose}
                className="px-4 py-2"
                disabled={isProcessing}
              >
                {strings.cancel}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default FileUploader;
