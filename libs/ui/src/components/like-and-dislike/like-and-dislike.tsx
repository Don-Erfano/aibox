'use client';
import { FC, useState } from 'react';
import clsx from 'clsx';
import { LikeAndDislikeProps } from './interface';
import { DislikeIcon, LikeIcon } from '../icons';

const LikeAndDislike: FC<LikeAndDislikeProps> = ({
  numOfLikes = 0,
  numOfDislikes = 0,
  isAdmin = false,
  disabled = false,
  onLike,
  onDislike,
  initialIsLiked = false,
  initialIsDisliked = false,
}) => {
  const [likes, setLikes] = useState(numOfLikes);
  const [dislikes, setDislikes] = useState(numOfDislikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isDisliked, setIsDisliked] = useState(initialIsDisliked);

  const handleLikeClick = () => {
    if (disabled || isLiked || isAdmin) return;

    setLikes((prev) => prev + 1);
    setIsLiked(true);

    if (isDisliked) {
      setDislikes((prev) => prev - 1);
      setIsDisliked(false);
    }

    onLike?.();
  };

  const handleDislikeClick = () => {
    if (disabled || isDisliked || isAdmin) return;

    setDislikes((prev) => prev + 1);
    setIsDisliked(true);

    if (isLiked) {
      setLikes((prev) => prev - 1);
      setIsLiked(false);
    }

    onDislike?.();
  };

  return (
    <div className="flex h-[28px] max-w-[140px] items-center justify-between gap-1">
      <div
        className={clsx(
          'flex h-[28px] w-[65px] items-center justify-between rounded-[8px] px-[12px] py-[4px] transition-colors',
          {
            'cursor-pointer bg-gray-50 hover:bg-green-50':
              !disabled && !isLiked && !isAdmin,
            'bg-green-50': isLiked,
            'bg-gray-50': disabled || isAdmin,
          }
        )}
        onClick={handleLikeClick}
      >
        <span
          className={clsx('text-sm', {
            'text-gray-700': !isLiked,
            'text-green-600': isLiked,
          })}
        >
          {likes}
        </span>
        <LikeIcon
          strokeColor={isLiked ? '#16a34a' : '#374151'}
          fillColor={isLiked ? '#86efac' : 'none'}
          size={20}
        />
      </div>

      <div
        className={clsx(
          'flex h-[28px] w-[65px] items-center justify-between rounded-[8px] px-[12px] py-[4px] transition-colors',
          {
            'cursor-pointer bg-gray-50 hover:bg-red-50':
              !disabled && !isDisliked && !isAdmin,
            'bg-red-50': isDisliked,
            'bg-gray-50': disabled || isAdmin,
          }
        )}
        onClick={handleDislikeClick}
      >
        <span
          className={clsx('text-sm', {
            'text-gray-700': !isDisliked,
            'text-red-600': isDisliked,
          })}
        >
          {dislikes}
        </span>
        <div className="flex items-center justify-center pt-[5px]">
          <DislikeIcon
            strokeColor={isDisliked ? '#dc2626' : '#374151'}
            fillColor={isDisliked ? '#fecaca' : 'none'}
            size={20}
          />
        </div>
      </div>
    </div>
  );
};

export default LikeAndDislike;
