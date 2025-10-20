'use client';

import Image from 'next/image';
import { FC, useRef, useState, DragEvent, ChangeEvent } from 'react';
import { AibImageUploaderProps } from './interface';
import { cva, type VariantProps } from 'class-variance-authority';
import { X, Upload } from 'lucide-react';
import clsx from 'clsx';
import { cn } from '../../../../lib';

const uploaderVariants = cva(
  'flex w-full items-center justify-center overflow-hidden rounded-sm outline-1 transition-colors outline-dashed',
  {
    variants: {
      status: {
        default:
          'cursor-pointer outline-gray-500 focus-within:outline-teal-500 hover:outline-zinc-600',
        error:
          'cursor-pointer bg-white text-red-600 outline-red-600 hover:outline-red-700',
        disabled: 'cursor-default text-gray-300 outline-gray-300',
        readonly: '',
        uploaded: 'outline-zinc-800',
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
  maxSize,
  ...rest
}) => {
  const isMultipleMode = !!rest.multiple;
  const [filesState, setFilesState] = useState<File[]>([]);
  const [sizeError, setSizeError] = useState<string>('');
  const [formatError, setFormatError] = useState<string>('');

  const [previewUrls, setPreviewUrls] = useState<string[]>(() => {
    if (!initialImageUrl) return [];
    if (typeof initialImageUrl === 'string') {
      return [initialImageUrl];
    }
    return initialImageUrl;
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  // Get file extension from filename
  const getFileExtension = (filename: string): string => {
    return filename.toLowerCase().split('.').pop() || '';
  };

  // Validate file format (both MIME type and extension)
  const validateFileFormat = (file: File): boolean => {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const allowedExtensions = ['jpg', 'jpeg', 'png'];

    const fileExtension = getFileExtension(file.name);

    // Check both MIME type and extension
    const validMimeType = allowedMimeTypes.includes(file.type);
    const validExtension = allowedExtensions.includes(fileExtension);

    if (!validMimeType || !validExtension) {
      setFormatError('فقط فایل‌های JPG، JPEG و PNG قابل قبول هستند.');
      return false;
    }

    setFormatError('');
    return true;
  };

  // Validate file size
  const validateFileSize = (file: File): boolean => {
    if (!maxSize) return true;

    if (file.size > maxSize) {
      const errorMsg = `حجم فایل از حداکثر مجاز \u2066(${formatFileSize(
        maxSize
      )})\u2069 بیشتر است.`;
      setSizeError(errorMsg);
      return false;
    }

    setSizeError('');
    return true;
  };

  const getStatus = (): VariantProps<typeof uploaderVariants>['status'] => {
    if (disabled) return 'disabled';
    if ((error && previewUrls.length === 0) || sizeError || formatError)
      return 'error';
    if (readOnly && previewUrls.length > 0) return 'readonly';
    if (previewUrls.length > 0) return 'uploaded';
    return 'default';
  };

  const status = getStatus();

  const triggerFileDialog = () => {
    if (disabled || readOnly) return;
    inputRef.current?.click();
  };

  const isImageFile = (f: File) => {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const allowedExtensions = ['jpg', 'jpeg', 'png'];

    const fileExtension = getFileExtension(f.name);

    return (
      allowedMimeTypes.includes(f.type) &&
      allowedExtensions.includes(fileExtension)
    );
  };

  const processFiles = (selectedFiles: File[]) => {
    // Clear previous errors
    setFormatError('');
    setSizeError('');

    const imageFiles = selectedFiles.filter(isImageFile);
    if (imageFiles.length === 0) {
      setFormatError('فقط فایل‌های JPG، JPEG و PNG قابل قبول هستند.');
      return;
    }

    const validFormatFiles = imageFiles.filter(validateFileFormat);
    if (validFormatFiles.length === 0) {
      return;
    }

    // Then validate size
    const validFiles = validFormatFiles.filter(validateFileSize);
    if (validFiles.length === 0) {
      return;
    }

    if (isMultipleMode) {
      const newPreviewUrls = validFiles.map((f) => URL.createObjectURL(f));
      setFilesState(validFiles);
      setPreviewUrls(newPreviewUrls);

      if (onFileChange) {
        onFileChange(validFiles.length ? validFiles : null);
      }
    } else {
      const firstImage = validFiles[0];
      const newUrl = URL.createObjectURL(firstImage);
      setFilesState([firstImage]);
      setPreviewUrls([newUrl]);

      if (onFileChange) {
        onFileChange(firstImage);
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled || readOnly) return;

    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) {
      return;
    }

    const selectedFiles = Array.from(fileList);
    processFiles(selectedFiles);

    e.target.value = '';
  };

  const handleRemoveOne = (index: number) => {
    if (disabled || readOnly) return;

    setSizeError('');
    setFormatError('');

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

    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);

    e.dataTransfer.clearData();
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div
      className={clsx(uploaderVariants({ status }), {
        '!cursor-default !outline-gray-500': readOnly,
        '!outline-gray-400': disabled,
      })}
      onClick={triggerFileDialog}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        hidden
        onChange={handleFileChange}
        disabled={disabled || readOnly}
        {...rest}
      />
      {previewUrls.length === 0 && (
        <div className="pointer-events-none flex items-center justify-center space-x-2 py-2.5">
          <Upload
            className={cn(
              disabled ? 'size-5 text-gray-300' : 'size-5 text-gray-500',
              { 'text-red-600': error, '!text-gray-400': readOnly }
            )}
          />
          <p
            className={cn(
              `text-xs font-medium ${
                disabled ? 'text-gray-300' : 'text-gray-500'
              }`,
              { 'text-red-600': error, '!text-gray-400': readOnly }
            )}
          >
            برای انتخاب کلیک کنید و یا تصویر را در اینجا رها کنید.
          </p>
        </div>
      )}

      {previewUrls.length > 0 && (
        <div className="relative flex w-full items-center justify-center p-2">
          {isMultipleMode ? (
            <div className="flex w-full flex-wrap items-center justify-center gap-3 px-46">
              {previewUrls.map((url, idx) => (
                <div key={idx} className="relative">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-sm ${
                      disabled || readOnly
                        ? 'opacity-70 outline-none'
                        : 'outline outline-gray-500'
                    }`}
                  >
                    <Image
                      src={url}
                      alt={`preview-${idx}`}
                      className="rounded-sm object-fill"
                      width={48}
                      height={48}
                    />
                  </div>

                  {!readOnly && !disabled && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveOne(idx);
                      }}
                      className="absolute -top-1.5 -left-2 rounded-full bg-red-600 hover:bg-red-700"
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
                className={`relative flex size-14 items-center justify-center rounded-sm ${
                  disabled || readOnly
                    ? 'opacity-70 outline-none'
                    : 'outline outline-gray-500'
                }`}
              >
                <Image
                  src={previewUrls[0]}
                  alt="thumbnail"
                  className="size-12 rounded-sm object-fill"
                  width={48}
                  height={48}
                />
                {!readOnly && !disabled && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveOne(0);
                    }}
                    className="absolute -top-1.5 -left-2 rounded-full bg-red-600 hover:bg-red-700"
                  >
                    <X className="size-4 text-white" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AibImageUploader;
