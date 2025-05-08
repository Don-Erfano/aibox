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
          'border-teal-600 border-2',
          'bg-gray-100',
          'flex-shrink-0',
          'flex items-center justify-center'
        )}
      >
        <PersonIcon className="size-10 text-gray-600" />
      </div>
    );

  return (
    <div className="relative inline-block">
      <div
        className={cn(
          'hidden md:flex h-9 min-w-[200px] bg-teal-600 rounded-[28px] transition-all',
          { 'rounded-b-none': isOpen, 'rounded-b-[28px]': !isOpen }
        )}
      >
        <button
          onClick={toggle}
          className="flex w-full items-center justify-start px-4"
        >
          <ChevronIcon
            className={cn('size-6 text-white transition-transform', {
              'rotate-180': !isOpen,
              'rotate-0': isOpen,
            })}
          />
          <span className="text-white text-center pl-3 truncate max-w-[15ch]">
            {username}
          </span>
        </button>
        <div className="absolute left-3 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          {renderAvatar()}
        </div>
      </div>

      {isOpen && (
        <div className="hidden md:block absolute left-0 top-full mt-[-1px] w-full bg-teal-600 rounded-b-[28px] text-white z-10">
          <ul className="flex flex-col">
            {items.map((item, idx) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    'block w-full py-2 text-center hover:bg-teal-500',
                    { 'rounded-b-[28px]': idx === items.length - 1 }
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

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
        <div className="md:hidden fixed inset-0 z-30 flex">
          <div className="w-64 bg-white shadow-lg flex flex-col">
            <div className="flex items-center justify-between p-4">
              <button onClick={toggle} aria-label="Back">
                <ChevronIcon className="size-6 rotate-270 text-black" />
              </button>
              <span className="text-gray-800 text-center p-5 truncate max-w-[25ch]">
                {username}
              </span>
              {renderAvatar()}
            </div>
            <ul className="flex flex-col divide-y divide-teal-600">
              {items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block px-4 text-sm font-normal py-3 text-teal-600 hover:bg-teal-50 text-start"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1" onClick={toggle} aria-hidden="true" />
        </div>
      )}
    </div>
  );
};

export default ProfileBox;
