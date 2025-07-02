'use client';

import { FC, ChangeEvent, DragEvent, useState, useEffect } from 'react';
import clsx from 'clsx';
import { Controller, FieldError, FieldValues } from 'react-hook-form';
import { LogoAvatarProps } from './interface';
import { Image, ImagePlus } from 'lucide-react';

const ALLOWED_IMAGE_FORMATS = 'image/png, image/jpeg';

const LogoAvatarBase: FC<
  Omit<LogoAvatarProps<FieldValues>, 'control' | 'name'> & {
    preview: string;
    setPreview: (v: string) => void;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: FieldError;
  }
> = ({
  label,
  src = '',
  onChange,
  onClick,
  required = false,
  mode = 'preview',
  size = 'small',
  preview,
  setPreview,
  error,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [hasError, setHasError] = useState(false); // ✅ internal error state

  const sizeMap = {
    small: { width: '54px', height: '54px' },
    large: { width: '90px', height: '90px' },
  } as const;

  useEffect(() => {
    if (mode === 'preview') {
      setPreview(src);
    }
  }, [src, setPreview, mode]);

  useEffect(
    () => () => {
      if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview);
    },
    [preview]
  );

  const isInvalid = hasError || !!error; // ✅ combined error state

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    if (mode !== 'upload') return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    if (mode !== 'upload') return;
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setHasError(true);
      setPreview('');
      return;
    }

    setHasError(false);
    const customEvent = {
      target: { files: [file] },
      currentTarget: { files: [file] },
    } as unknown as ChangeEvent<HTMLInputElement>;
    onChange?.(customEvent);
    setPreview(URL.createObjectURL(file));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (mode !== 'upload') return;
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      e.target.value = '';
      setHasError(true);
      setPreview('');
      return;
    }

    setHasError(false);
    onChange?.(e);
    setPreview(URL.createObjectURL(file));
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

export const LogoAvatarInput = <
  TFieldValues extends Record<string, unknown> = Record<string, unknown>
>(
  props: LogoAvatarProps<TFieldValues>
) => {
  const [preview, setPreview] = useState<string>(props.src || '');

  if (props.mode === 'upload') {
    const { control, name, ...rest } = props;

    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <LogoAvatarBase
            {...rest}
            onChange={onChange}
            preview={preview}
            setPreview={setPreview}
            src={typeof value === 'string' ? value : ''}
            error={error}
          />
        )}
      />
    );
  }

  return (
    <LogoAvatarBase {...props} preview={preview} setPreview={setPreview} />
  );
};
