'use client';

import { FC, ChangeEvent, DragEvent, useState, useEffect } from 'react';
import clsx from 'clsx';
import { LogoAvatarProps } from './interface';
import { Image, ImagePlus } from 'lucide-react';

const ALLOWED_IMAGE_FORMATS = 'image/png, image/jpeg';

export const LogoAvatarInput: FC<LogoAvatarProps> = ({
  label,
  src = '',
  onChange,
  onClick,
  required = false,
  mode = 'preview',
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [preview, setPreview] = useState<string>(src);

  useEffect(() => {
    setPreview(src);
  }, [src]);

  useEffect(
    () => () => {
      if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview);
    },
    [preview]
  );

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    if (mode !== 'upload') return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    if (mode !== 'upload') return;
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && ALLOWED_IMAGE_FORMATS.split(', ').includes(file.type)) {
      const customEvent = {
        target: { files: [file] },
        currentTarget: { files: [file] },
      } as unknown as ChangeEvent<HTMLInputElement>;
      onChange?.(customEvent);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (mode !== 'upload') return;
    const file = e.target.files?.[0];
    if (file && ALLOWED_IMAGE_FORMATS.split(', ').includes(file.type)) {
      onChange?.(e);
      setPreview(URL.createObjectURL(file));
    } else {
      e.target.value = '';
    }
  };

  return (
    <>
      <div
        className={clsx(
          'relative overflow-hidden rounded-full border border-gray-500 transition-all duration-200',
          { 'cursor-pointer': mode === 'upload' }
        )}
        style={{ width: '70px', height: '70px' }}
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
            <ImagePlus />
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
                <Image />
              </div>
            )}
          </>
        )}
      </div>

      {label && (
        <label className="text-gray-400 mt-2">
          {label}
          {required && <span className="ml-1">*</span>}
        </label>
      )}
    </>
  );
};
