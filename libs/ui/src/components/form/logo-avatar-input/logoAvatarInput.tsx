'use client';

import {
  FC,
  ChangeEvent,
  DragEvent,
  MouseEventHandler,
  useState,
  useEffect,
} from 'react';
import clsx from 'clsx';
import { ILogoAvatar } from './interface';

const ALLOWED_IMAGE_FORMATS = 'image/png, image/jpeg';
const CAMERA_ICON = '/src/assets/logoAvatarInput/fluent_camera.svg';

export const LogoAvatarInput: FC<ILogoAvatar> = ({
  label,
  src = '',
  noImageSrc = '/src/assets/logoAvatarInput/new-no-image.svg',
  onChange,
  onClick,
  required = false,
  customStyles,
  isUploadButton = false,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [preview, setPreview] = useState<string>(src || noImageSrc);

  useEffect(() => {
    setPreview(src || noImageSrc);
  }, [src, noImageSrc]);

  useEffect(() => {
    return () => {
      if (preview.startsWith('blob:')) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
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
          'relative overflow-hidden rounded-full border border-gray-500 bg-center bg-no-repeat bg-cover transition-all duration-200',
          { 'cursor-pointer': isUploadButton }
        )}
        style={{
          width: customStyles?.width ?? '70px',
          height: customStyles?.height ?? '70px',
          backgroundImage: `url(${encodeURI(preview)})`,
        }}
        onMouseEnter={() => isUploadButton && setIsHovering(true)}
        onMouseLeave={() => isUploadButton && setIsHovering(false)}
        onDragOver={isUploadButton ? handleDragOver : undefined}
        onDrop={isUploadButton ? handleDrop : undefined}
      >
        {isUploadButton && (
          <>
            <input
              id="logoImage"
              type="file"
              accept={ALLOWED_IMAGE_FORMATS}
              name="image"
              className="opacity-0 w-full h-full cursor-pointer"
              onChange={handleChange}
              onClick={onClick as MouseEventHandler<HTMLInputElement>}
            />
            {isHovering && (
              <div className="absolute inset-0 flex items-center justify-center bg-[rgba(133,133,133,0.44)] pointer-events-none">
                <img src={CAMERA_ICON} alt="Upload" className="w-6 h-6" />
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
