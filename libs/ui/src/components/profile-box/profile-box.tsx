'use client';
import Image from 'next/image';
import { FC, useState } from 'react';

import { ProfileBoxProps } from './interface';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { ChevronIcon, ProfileIcon } from '../icons';
import { Popover, PopoverAnchor, PopoverContent } from '../popover';
import { Button } from '../form';
import { cn } from '../../lib';

const ProfileBox: FC<ProfileBoxProps> = ({ username, avatarUrl, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  const renderAvatar = () =>
    avatarUrl ? (
      <Image
        src={avatarUrl}
        alt={username}
        className={cn('rounded-full object-cover')}
        width={48}
        height={48}
      />
    ) : (
      <div
        className={cn(
          'size-12 pt-[9.5px]',
          'rounded-full',
          'border-1 border-teal-600',
          'bg-neutral-200',
          'flex-shrink-0',
          'flex items-center justify-center'
        )}
      >
        <ProfileIcon className="h-10 w-[32px] object-cover" />
      </div>
    );

  return (
    <div className="inline-block w-full">
      <div className="relative hidden md:flex">
        <Popover>
          <PopoverTrigger asChild id="profile-box" accessKey="profile-box">
            <PopoverAnchor className="z-50 flex h-9 w-48 items-center justify-between gap-1 rounded-[16px] bg-teal-600 pr-2 data-[state=open]:!rounded-br-none md:flex data-[state=close]:[&>svg]:rotate-180 data-[state=open]:[&>svg]:rotate-0">
              <div>
                <ChevronIcon className="size-6 rotate-180 text-white transition-transform data-[state=open]:bg-red-500" />
              </div>
              <span
                className="max-w-[20ch] truncate text-start text-[14px] font-normal text-white"
                dir="ltr"
              >
                {username}
              </span>
              <div className="-ml-4">{renderAvatar()}</div>
            </PopoverAnchor>
          </PopoverTrigger>
          <PopoverContent className="cssss relative z-20 hidden w-48 translate-x-[0px] translate-y-[-10px] overflow-hidden rounded-tr-none rounded-b-[20px] border-none bg-teal-600 px-0 py-2 text-slate-200 md:block">
            <div className="flex h-fit flex-col overflow-hidden">
              {items.map((item, idx) => (
                <Button
                  key={idx}
                  onClick={item.onClick}
                  variant="ghost"
                  className="block h-auto w-full rounded-none py-2 text-center text-[14px] text-white outline-stone-50 hover:bg-white/10 hover:text-slate-200 focus:!bg-white/10 focus:!text-slate-200 focus:outline"
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <button
        onClick={toggle}
        className="flex items-center space-x-2 rounded-full px-3 py-2 md:hidden"
      >
        <ChevronIcon
          className={cn('size-6 text-black transition-transform', {
            'rotate-180': !isOpen,
            'rotate-0': isOpen,
          })}
        />
        {renderAvatar()}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-30 flex justify-end md:hidden">
          <div
            className={cn(
              'flex w-full transform flex-col bg-white shadow-lg transition-transform duration-300 ease-in-out',
              {
                'translate-x-full': !isOpen,
                'translate-x-0': isOpen,
              }
            )}
          >
            <div className="flex items-center py-4">
              <div className="pr-12">{renderAvatar()}</div>
              <span className="max-w-[25ch] truncate pr-2 text-center text-[14px] font-normal text-gray-800">
                {username}
              </span>
              <div className="absolute top-[25px] right-4">
                <button onClick={toggle} aria-label="Back">
                  <ChevronIcon className="size-6 rotate-270 text-black" />
                </button>
              </div>
            </div>
            <ul className="flex flex-col divide-y divide-teal-600/32">
              {items.map((item, i) => (
                <li
                  className="h-[56px] justify-center border-b-1 border-b-teal-600/40 hover:bg-gray-100"
                  key={i}
                >
                  <Button
                    variant="ghost"
                    className="runded-0 mx-4 mt-2 block py-3 text-start text-[14px] font-normal text-teal-600 hover:w-full hover:bg-transparent"
                    onClick={item.onClick}
                  >
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileBox;
