export interface FileUploaderProps {
  onFileUpload?: (data: {
    file: File;
    fileId: string;
    comment: string;
  }) => void;
  onError?: (error: string) => void;
  ticketId: string;
}
export interface FileWithPreviewProps {
  file: File;
  url: string;
  comment: string;
}
