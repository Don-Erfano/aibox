'use client';

import { FC, useRef, useState, DragEvent, ChangeEvent } from 'react';
import { AibImageUploaderProps } from './interface';
import { cva, type VariantProps } from 'class-variance-authority';
import { X, Upload } from 'lucide-react';

const uploaderVariants = cva(
  'relative w-full min-h-10 border-1 border-dashed flex items-center justify-center transition-colors overflow-hidden rounded-sm',
  {
    variants: {
      status: {
        default:
          'border-gray-400 hover:border-zinc-800 focus-within:border-teal-500 cursor-pointer',
        error:
          'border-red-600 text-red-600 hover:border-red-700 cursor-pointer bg-white',
        disabled: 'border-gray-300 text-gray-300 cursor-not-allowed',
        readonly: 'border-zinc-600 text-gray-300 cursor-default',
        uploaded: 'border-zinc-800',
      },
    },
    defaultVariants: {
      status: 'default',
    },
  }
);

const AibImageUploader: FC<AibImageUploaderProps> = ({
  error = false,
  errorMessage = '',
  initialImageUrl,
  onFileChange,
  disabled = false,
  readOnly = false,
  ...rest
}) => {
  const isMultipleMode = !!rest.multiple;
  const [filesState, setFilesState] = useState<File[]>([]);

  const [previewUrls, setPreviewUrls] = useState<string[]>(() => {
    if (!initialImageUrl) return [];
    if (typeof initialImageUrl === 'string') {
      return [initialImageUrl];
    }
    return initialImageUrl;
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const getStatus = (): VariantProps<typeof uploaderVariants>['status'] => {
    if (disabled) return 'disabled';
    if (error && previewUrls.length === 0) return 'error';
    if (readOnly && previewUrls.length > 0) return 'readonly';
    if (previewUrls.length > 0) return 'uploaded';
    return 'default';
  };
  const status = getStatus();
  const triggerFileDialog = () => {
    if (disabled || readOnly) return;
    inputRef.current?.click();
  };
  const isImageFile = (f: File) => f.type.startsWith('image/');
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled || readOnly) return;

    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) {
      return;
    }
    const selectedFiles = Array.from(fileList).filter(isImageFile);
    if (selectedFiles.length === 0) {
      return;
    }

    if (isMultipleMode) {
      const newPreviewUrls = selectedFiles.map((f) => URL.createObjectURL(f));
      setFilesState(selectedFiles);
      setPreviewUrls(newPreviewUrls);

      if (onFileChange) {
        onFileChange(selectedFiles.length ? selectedFiles : null);
      }
    } else {
      const firstImage = selectedFiles[0];
      const newUrl = URL.createObjectURL(firstImage);
      setFilesState([firstImage]);
      setPreviewUrls([newUrl]);

      if (onFileChange) {
        onFileChange(firstImage);
      }
    }
    e.target.value = '';
  };

  const handleRemoveOne = (index: number) => {
    if (disabled || readOnly) return;

    if (isMultipleMode) {
      const newFiles = filesState.filter((_, i) => i !== index);
      const newUrls = previewUrls.filter((_, i) => i !== index);
      setFilesState(newFiles);
      setPreviewUrls(newUrls);

      if (onFileChange) {
        onFileChange(newFiles.length > 0 ? newFiles : null);
      }
    } else {
      setFilesState([]);
      setPreviewUrls([]);

      if (onFileChange) {
        onFileChange(null);
      }
    }
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled || readOnly) return;

    const droppedFiles = Array.from(e.dataTransfer.files).filter(isImageFile);
    if (droppedFiles.length === 0) {
      return;
    }

    if (isMultipleMode) {
      const newPreviewUrls = droppedFiles.map((f) => URL.createObjectURL(f));
      setFilesState(droppedFiles);
      setPreviewUrls(newPreviewUrls);
      if (onFileChange) {
        onFileChange(droppedFiles);
      }
    } else {
      const firstImage = droppedFiles[0];
      const newUrl = URL.createObjectURL(firstImage);
      setFilesState([firstImage]);
      setPreviewUrls([newUrl]);
      if (onFileChange) {
        onFileChange(firstImage);
      }
    }

    e.dataTransfer.clearData();
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className={uploaderVariants({ status })}
        onClick={triggerFileDialog}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept={rest.accept ?? 'image/*'}
          className="hidden"
          onChange={handleFileChange}
          disabled={disabled || readOnly}
          {...rest}
        />
        {previewUrls.length === 0 && (
          <div className="flex items-center justify-center space-x-2 px-22.5 py-2.5 pointer-events-none">
            <Upload
              className={
                disabled ? 'h-5 w-5 text-gray-300' : 'h-5 w-5 text-gray-500'
              }
            />
            <p
              className={`text-xs font-medium ${
                disabled ? 'text-gray-300' : 'text-gray-500'
              }`}
            >
              برای انتخاب کلیک کنید و یا تصویر را در اینجا رها کنید.
            </p>
          </div>
        )}

        {previewUrls.length > 0 && (
          <div className="relative w-full h-full flex items-center justify-center p-2">
            {isMultipleMode ? (
              <div className="flex flex-wrap gap-3 px-46 justify-center items-center w-full">
                {previewUrls.map((url, idx) => (
                  <div key={idx} className="relative">
                    <div
                      className={`h-14 w-14 rounded-sm flex items-center justify-center ${
                        disabled || readOnly
                          ? 'border-none opacity-70'
                          : 'border border-gray-500'
                      }`}
                    >
                      <img
                        src={url}
                        alt={`preview-${idx}`}
                        className="h-12 w-12 rounded-sm object-fill"
                      />
                    </div>

                    {!readOnly && !disabled && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveOne(idx);
                        }}
                        className="absolute -top-1.5 -left-2 bg-red-600 rounded-full hover:bg-red-700"
                      >
                        <X className="h-4 w-4 text-white" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-46">
                <div
                  className={`h-14 w-14 relative rounded-sm flex items-center justify-center ${
                    disabled || readOnly
                      ? 'border-none opacity-70'
                      : 'border border-gray-500'
                  }`}
                >
                  <img
                    src={previewUrls[0]}
                    alt="thumbnail"
                    className="h-12 w-12 rounded-sm object-fill"
                  />
                  {!readOnly && !disabled && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveOne(0);
                      }}
                      className="absolute -top-1.5 -left-2 bg-red-600 rounded-full hover:bg-red-700"
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {error && previewUrls.length === 0 && (
        <p className="text-xs font-light text-red-600 text-right mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
export default AibImageUploader;
