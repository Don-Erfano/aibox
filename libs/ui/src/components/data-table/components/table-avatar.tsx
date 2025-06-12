'use client';

import Image from 'next/image';
import { useState } from 'react';

type TableAvatarProps = {
  src?: string;
  alt: string;
};

export function TableAvatar({ src, alt }: TableAvatarProps) {
  const [imgSrc, setImgSrc] = useState(src || '/images/default-avatar.svg');

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={32}
      height={32}
      onError={() => setImgSrc('/images/default-avatar.svg')}
      className="object-cover border-1 border-teal-600 rounded-full"
    />
  );
}
