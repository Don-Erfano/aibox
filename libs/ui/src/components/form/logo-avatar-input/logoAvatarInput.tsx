'use client';

import { ChangeEvent, DragEvent, useState, useEffect } from 'react';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';
import { LogoAvatarProps } from './interface';
import { Image, ImagePlus } from 'lucide-react';

const ALLOWED_IMAGE_FORMATS = 'image/png, image/jpeg';

export const LogoAvatarInput = <
  TFieldValues extends Record<string, unknown> = Record<string, unknown>
>(
  props: LogoAvatarProps<TFieldValues>
) => {
  const [preview, setPreview] = useState<string>(props.src || '');
  const [isHovering, setIsHovering] = useState(false);
  const [hasError, setHasError] = useState(false);

  const {
    label,
    src = '',
    onClick,
    required = false,
    mode = 'preview',
    size = 'small',
  } = props;

  const sizeMap = {
    small: { width: '54px', height: '54px' },
    large: { width: '90px', height: '90px' },
  } as const;

  useEffect(() => {
    if (mode === 'preview') {
      setPreview(src);
    }
  }, [src, setPreview, mode]);

  useEffect(() => {
    return () => {
      if (preview?.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFile = (
    file: File | undefined,
    onChange?:
      | ((e: ChangeEvent<HTMLInputElement>) => void)
      | ((value: unknown) => void)
  ) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setHasError(true);
      setPreview('');
      return;
    }

    setHasError(false);
    const blobURL = URL.createObjectURL(file);
    setPreview(blobURL);

    if (onChange) {
      (onChange as (value: unknown) => void)(file);
    }
  };

  const renderAvatar = (
    onChange?:
      | ((e: ChangeEvent<HTMLInputElement>) => void)
      | ((value: unknown) => void),
    error?: unknown
  ) => {
    const isInvalid = hasError || !!error;

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      if (mode !== 'upload') return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      if (mode !== 'upload') return;
      e.preventDefault();
      handleFile(e.dataTransfer.files[0], onChange);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (mode !== 'upload') return;
      handleFile(e.target.files?.[0], onChange);
    };

    return (
      <div className="flex flex-col items-center">
        <div
          className={clsx(
            'relative overflow-hidden rounded-full border transition-all duration-200 bg-gray-100',
            {
              'border-gray-500': !isInvalid,
              'border-red-600': isInvalid,
              'cursor-pointer': mode === 'upload',
            }
          )}
          style={sizeMap[size]}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={onClick}
        >
          {preview && (
            <img
              src={encodeURI(preview)}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          )}
          {isHovering && mode === 'upload' && (
            <div className="absolute inset-0 flex items-center justify-center bg-[rgba(133,133,133,0.44)] pointer-events-none">
              <ImagePlus
                className={clsx({
                  'text-zinc-600': !isInvalid,
                  'text-red-600': isInvalid,
                })}
              />
            </div>
          )}

          {mode === 'upload' && (
            <>
              <input
                id="logoImage"
                type="file"
                accept={ALLOWED_IMAGE_FORMATS}
                name="image"
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                onChange={handleChange}
              />

              {!preview && !isHovering && (
                <div className="absolute inset-0 flex items-center justify-center bg-[rgba(133,133,133,0.44)] pointer-events-none">
                  <Image
                    className={clsx({
                      'text-zinc-600': !isInvalid,
                      'text-red-600': isInvalid,
                    })}
                  />
                </div>
              )}
            </>
          )}
        </div>

        {label && (
          <label
            className={clsx('text-gray-400 mt-2 text-sm', {
              'text-red-600': isInvalid,
            })}
          >
            {label}
            {required && (
              <span className={clsx('ml-1', { 'text-red-600': isInvalid })}>
                *
              </span>
            )}
          </label>
        )}
      </div>
    );
  };

  if (mode === 'upload') {
    const { control, name, ...rest } = props;
    return (
      <Controller
        name={name}
        control={control}
        {...rest}
        render={({ field: { onChange }, fieldState: { error } }) =>
          renderAvatar(onChange, error)
        }
      />
    );
  }

  return renderAvatar();
};
