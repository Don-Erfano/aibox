'use client';
import { FC, useState } from 'react';
import { cn } from '../../lib';
import { ProfileBoxProps } from './interface';
import { PersonIcon, ChevronIcon } from '../icons';

const ProfileBox: FC<ProfileBoxProps> = ({ username, avatarUrl, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  const renderAvatar = () =>
    avatarUrl ? (
      <img
        src={avatarUrl}
        alt={username}
        className={cn('rounded-full object-cover')}
      />
    ) : (
      <div
        className={cn(
          'rounded-full',
          'border-teal-600 border-1',
          'bg-gray-100',
          'flex-shrink-0',
          'flex items-center justify-center'
        )}
      >
        <PersonIcon className="size-10 text-gray-600" />
      </div>
    );

  return (
    <div className="relative inline-block w-full">
      <div className="md:block hidden">
        <div
          className={cn(
            'md:flex h-9 min-w-[200px] bg-teal-600 rounded-[28px] transition-all',
            { 'rounded-b-none': isOpen, 'rounded-b-[28px]': !isOpen }
          )}
        >
          <button
            onClick={toggle}
            className="flex w-full items-center justify-start px-2"
          >
            <ChevronIcon
              className={cn('size-6 text-white transition-transform', {
                'rotate-180': !isOpen,
                'rotate-0': isOpen,
              })}
            />
            <span className="text-white text-start font-normal text-[14px] px-1 z-100 truncate max-w-[20ch]">
              {username}
            </span>
          </button>
          <div className="absolute left-3 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            {renderAvatar()}
          </div>
        </div>
      </div>
      <div className="hidden md:block absolute left-0  top-full mt-[-11.5px] w-full bg-teal-600 rounded-b-[28px] text-white z-10">
        <ul
          className={cn(
            'flex flex-col  overflow-hidden transition-[max-height] duration-300 ease-in-out',
            {
              'max-h-0': !isOpen,
              'min-h-[74px] mb-2 mt-5': isOpen,
            }
          )}
        >
          {items.map((item, idx) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  'block h-auto w-full py-2 text-center hover:bg-teal-500/50 text-[14px]',
                  { 'rounded-b-[16px]': idx === items.length - 1 }
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={toggle}
        className="md:hidden flex items-center space-x-2 px-3 py-2 rounded-full"
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
        <div className="md:hidden fixed justify-end inset-0 z-30 flex">
          <div
            className={cn(
              'w-64 bg-white shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out',
              {
                'translate-x-full': !isOpen,
                'translate-x-0': isOpen,
              }
            )}
          >
            <div className="flex items-center  py-4">
              <div className="pr-4">{renderAvatar()}</div>
              <span className="text-gray-800 text-center pr-2 font-normal text-[14px] truncate max-w-[25ch]">
                {username}
              </span>
              <div className="absolute left-2 top-[25px]">
                <button onClick={toggle} aria-label="Back">
                  <ChevronIcon className="size-6 rotate-270 text-black" />
                </button>
              </div>
            </div>
            <ul className="flex flex-col divide-y divide-teal-600/32">
              {items.map((item) => (
                <li className="h-[56px]" key={item.href}>
                  <a
                    href={item.href}
                    className="block px-4 text-[14px] font-normal py-3 text-teal-600  text-start"
                  >
                    {item.label}
                  </a>
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
